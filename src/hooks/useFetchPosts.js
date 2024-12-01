import axios from 'axios';

const fetchPosts = async () => {
  const response = await axios.get(
    `https://graph.facebook.com/v15.0/{page-id}/posts?access_token={ACCESS_TOKEN}`
  );
  return response.data;
};
