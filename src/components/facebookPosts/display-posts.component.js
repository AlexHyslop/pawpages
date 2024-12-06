import React, { useEffect, useState } from 'react';
import { db } from '../../store/firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

const FacebookPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [selectedTemperament, setSelectedTemperament] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSpecialNeeds, setSelectedSpecialNeeds] = useState('');
  const [selectedAge, setSelectedAge] = useState('');

  const temperamentKeywords = ['nervous', 'friendly', 'shy', 'playful', 'calm', 'aggressive'];
  const sizeKeywords = ['small', 'medium', 'large'];
  const specialNeedsKeywords = ['blind', 'deaf', 'special diet', 'medication'];
  const ageRegex = /\b(\d+)\s*(year|yr|years?)\b/i;

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('Fetching posts from Firebase');
      setLoading(true);
      const firebasePosts = await getPostsFromFirebase();
      console.log('Fetched posts from Firebase: ', firebasePosts);

      setPosts(firebasePosts);
      setFilteredPosts(firebasePosts); // Initially show all posts
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const getPostsFromFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'facebookPosts'));
      const posts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const attachments = data.attachments?.data || [];
        const imageSrc = attachments.length > 0 ? attachments[0]?.media?.image?.src : null;

        return {
          id: data.id,
          message: data.message,
          link: `https://www.facebook.com/${data.id.split('_')[0]}/posts/${data.id.split('_')[1]}`,
          image: imageSrc,
          tags: data.tags || [],
          created_time: data.created_time,
        };
      });

      console.log('Fetched posts from Firebase:', posts);
      return posts;
    } catch (error) {
      console.error('Error fetching posts from Firebase:', error);
      return [];
    }
  };

  // Filter the posts based on selected filters
  const applyFilters = () => {
    let filtered = posts;

    if (selectedTemperament) {
      filtered = filtered.filter(post =>
        post.tags.includes(selectedTemperament)
      );
    }

    if (selectedSize) {
      filtered = filtered.filter(post =>
        post.tags.includes(selectedSize)
      );
    }

    if (selectedSpecialNeeds) {
      filtered = filtered.filter(post =>
        post.tags.includes(selectedSpecialNeeds)
      );
    }

    if (selectedAge) {
      filtered = filtered.filter(post =>
        ageRegex.test(post.message) && post.message.match(ageRegex)[1] === selectedAge
      );
    }

    setFilteredPosts(filtered);
  };

  return (
    <div className="container">
      {/* Filter Section */}
      <div className="flex gap-2">
        <FormControl className='grow'>
          <InputLabel id="temperament-select-label">Temperament</InputLabel>
          <Select
            labelId="temperament-select-label"
            value={selectedTemperament}
            onChange={(e) => setSelectedTemperament(e.target.value)}
            label="Temperament"
          >
            <MenuItem value="">None</MenuItem>
            {temperamentKeywords.map((keyword) => (
              <MenuItem className='capitalize' key={keyword} value={keyword}>
                {keyword}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className='grow'>
          <InputLabel id="size-select-label">Size</InputLabel>
          <Select
            labelId="size-select-label"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            label="Size"
          >
            <MenuItem value="">None</MenuItem>
            {sizeKeywords.map((keyword) => (
              <MenuItem className='capitalize' key={keyword} value={keyword}>
                {keyword}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className='grow'>
          <InputLabel id="special-needs-select-label">Special Needs</InputLabel>
          <Select
            labelId="special-needs-select-label"
            value={selectedSpecialNeeds}
            onChange={(e) => setSelectedSpecialNeeds(e.target.value)}
            label="Special Needs"
          >
            <MenuItem value="">None</MenuItem>
            {specialNeedsKeywords.map((keyword) => (
              <MenuItem key={keyword} value={keyword}>
                {keyword}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className='grow'>
          <InputLabel id="age-select-label">Age</InputLabel>
          <Select
            labelId="age-select-label"
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            label="Age"
          >
            <MenuItem value="">None</MenuItem>
            {/* Assuming you know the range of age options, for example 1 to 15 years */}
            {[...Array(15)].map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1} years
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className='w-full'>
        <Button className='' onClick={applyFilters} variant="contained" color="primary" sx={{ marginTop: '16px' }}>
          Apply Filters
        </Button>
        </div>

      {/* Posts Section */}
      <ul className="flex flex-wrap gap-4 pt-5">
        {filteredPosts.map((post) => (
          <a href={post.link} target="_blank" rel="noopener noreferrer" key={post.id}>
            <li className="shadow-2xl rounded-md w-72 relative">
              <div
                className="flex flex-col w-full rounded-t"
                style={{
                  height: '300px',
                  backgroundImage: `url(${post.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  overflow: 'hidden',
                }}
              ></div>
              <div className="flex flex-col w-full absolute bottom-0">
                <div className="p-2 bg-white block w-full">
                  <p className="mb-0 text-md text-black">{post.message.slice(0, 30)}{post.message.length > 30 && '...'}</p>
                </div>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default FacebookPosts;
