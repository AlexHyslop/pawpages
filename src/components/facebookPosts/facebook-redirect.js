import React, { useEffect } from 'react';
import axios from 'axios';
import { db } from '../../store/firebase.config'; // Assuming db is already imported correctly
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore v9+ modular imports

const RedirectHandler = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      console.log('Authorization code:', code);

      const fetchAccessTokenAndStorePosts = async () => {
        try {
          const tokenExchangeUrl = `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent('https://pawpages-b4034.web.app/redirect')}&client_secret=${process.env.REACT_APP_FACEBOOK_APP_SECRET}&code=${code}`;
          console.log('Token exchange URL:', tokenExchangeUrl);
      
          const tokenResponse = await axios.get(tokenExchangeUrl);
          const { access_token: userAccessToken } = tokenResponse.data;
      
          if (!userAccessToken) {
            console.error('Failed to obtain user access token.');
            return;
          }
      
          console.log('User Access Token:', userAccessToken);
      
          const pageResponse = await axios.get(
            `https://graph.facebook.com/v12.0/me/accounts?access_token=${encodeURIComponent(userAccessToken)}`
          );
      
          const pages = pageResponse.data.data;
          if (!pages || pages.length === 0) {
            console.error('No pages found for this user.');
            return;
          }
      
          const pageAccessToken = pages[0].access_token;
          const pageId = pages[0].id;
      
          if (!pageAccessToken || !pageId) {
            console.error('Failed to fetch page access token or page ID.');
            return;
          }
      
          console.log('Page Access Token:', pageAccessToken);
          console.log('Page ID:', pageId);
      
          const postsResponse = await axios.get(
            `https://graph.facebook.com/${encodeURIComponent(pageId)}/posts?fields=id&access_token=${encodeURIComponent(pageAccessToken)}`
          );
      
          const posts = postsResponse.data.data;
          if (!posts || posts.length === 0) {
            console.log('No posts found for the page.');
            return;
          }
      
          console.log('Fetched posts:', posts);
      
          for (const post of posts) {
            try {
              console.log(`Fetching full details for post ID: ${post.id}`);
              
              // Log the URL used to fetch full post details (for shared content as well)
              const fullPostUrl = `https://graph.facebook.com/${post.id}?fields=message,created_time,id,attachments{media}&access_token=${encodeURIComponent(pageAccessToken)}`;
              console.log('URL for fetching full post data:', fullPostUrl);
      
              const fullPostResponse = await axios.get(fullPostUrl);
              const fullPost = fullPostResponse.data;
      
              console.log('Full Post Data:', fullPost);
      
              // Handle posts with images
              const hasImage = fullPost.attachments?.data?.some(att => att.media?.image?.src) || false;
              if (!hasImage) {
                console.log(`Skipping post ${post.id} as it has no images.`);
                continue;
              }
      
              const tags = extractTagsFromDescription(fullPost.message || '');
              const age = extractAgeFromDescription(fullPost.message || ''); // Extract age as number
              const postWithTags = {
                ...fullPost,
                tags,
                age, // Store the age as a number
              };
      
              try {
                const postRef = doc(db, 'facebookPosts', post.id);
                const existingDoc = await getDoc(postRef);
      
                if (existingDoc.exists()) {
                  const existingData = existingDoc.data();
                  const hasChanged =
                    existingData.message !== fullPost.message ||
                    existingData.created_time !== fullPost.created_time ||
                    JSON.stringify(existingData.tags) !== JSON.stringify(postWithTags.tags) ||
                    existingData.image !== fullPost.attachments.data[0]?.media?.image?.src ||
                    existingData.age !== postWithTags.age; // Check if age has changed
      
                  if (hasChanged) {
                    await setDoc(postRef, postWithTags, { merge: true });
                    console.log(`Post ${post.id} updated successfully.`);
                  } else {
                    console.log(`Post ${post.id} has not changed.`);
                  }
                } else {
                  await setDoc(postRef, postWithTags);
                  console.log(`Post ${post.id} stored successfully.`);
                }
              } catch (error) {
                console.error(`Error storing or updating post ${post.id}:`, error.message || error);
              }
            } catch (error) {
              console.error(`Error fetching full details for post ${post.id}:`, error.response?.data || error.message);
            }
          }
      
          console.log('All posts processed successfully.');
        } catch (error) {
          console.error('Error during token exchange or fetching posts:', error.response?.data || error.message);
        }
      };

      fetchAccessTokenAndStorePosts();
    } else {
      console.error('No authorization code found in the URL');
    }
  }, []);

  return <div>Processing Facebook login...</div>;
};

// Function to extract tags from description (same as before)
const extractTagsFromDescription = (message) => {
  const tags = [];

  // Define the keywords for tagging
  const temperamentKeywords = ['nervous', 'friendly', 'shy', 'playful', 'calm', 'aggressive'];
  const sizeKeywords = ['small', 'medium', 'large'];
  const specialNeedsKeywords = ['blind', 'deaf', 'special diet', 'medication'];

  // Check for temperament keywords
  temperamentKeywords.forEach(keyword => {
    if (message.toLowerCase().includes(keyword)) {
      tags.push(keyword);
    }
  });

  // Check for size keywords
  sizeKeywords.forEach(keyword => {
    if (message.toLowerCase().includes(keyword)) {
      tags.push(keyword);
    }
  });

  // Check for special needs keywords
  specialNeedsKeywords.forEach(keyword => {
    if (message.toLowerCase().includes(keyword)) {
      tags.push(keyword);
    }
  });

  return tags;
};

// Function to extract the age from the message as a number
const extractAgeFromDescription = (message) => {
  const ageRegex = /\b(\d+)\s*(year|yr|years?)\b/i;
  const ageMatch = message.match(ageRegex);
  if (ageMatch) {
    return parseInt(ageMatch[1], 10); // Return age as a number
  }
  return null; // Return null if no age is found
};

export default RedirectHandler;
