/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const {onRequest} = require("firebase-functions/v2/https");
const { db } = require('./firebase.config');
require('dotenv').config();
const cors = require('cors');

const corsHandler = cors({ origin: 'https://pawpages-b4034.web.app' });

exports.storeFacebookPost = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const post = req.body;

      if (!post || !post.id) {
        return res.status(400).send('Post data missing or invalid.');
      }

      // Check if the post is shared from another post
      const postRef = db.collection('facebookPosts').doc(post.id);
      const existingDoc = await postRef.get();

      // Log and return if the post already exists
      if (existingDoc.exists) {
        console.log(`Post ${post.id} already exists in Firestore.`);
        return res.status(200).send('Post already exists.');
      }

      // Initialize postData
      const postData = {
        message: post.message || 'No message provided',
        created_time: post.created_time || new Date().toISOString(),
        id: post.id,
        link: `https://www.facebook.com/${post.id}`,
        image: null, // Default to null in case no image is found
      };

      // Check if the post is shared and handle accordingly
      if (post.shared_from) {
        console.log(`Post ${post.id} is shared from another post. Fetching original media...`);
        // If shared, use the shared media from the original post
        if (post.shared_from.attachments && post.shared_from.attachments.data) {
          postData.image = post.shared_from.attachments.data[0]?.media?.image?.src || null;
        }
      } else if (post.attachments && post.attachments.data) {
        // If not shared, use the media from this post
        postData.image = post.attachments.data[0]?.media?.image?.src || null;
      }

      // Store the post in Firestore
      await postRef.set(postData);

      console.log(`Post ${post.id} stored successfully.`);
      return res.status(200).send('Post stored successfully.');

    } catch (error) {
      console.error('Error storing post:', error);
      return res.status(500).send(`Error storing post: ${error.message}`);
    }
  });
});
