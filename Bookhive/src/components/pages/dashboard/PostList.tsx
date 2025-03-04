import React, { useEffect, useState } from 'react';
import { Box, Text, Spinner, Flex } from '@chakra-ui/react';
import { axiosInstance } from '@/utils/axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/posts');
        console.log('Fetched posts:', response.data);
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box>
      {posts.map((post) => (
        <Box key={post._id} borderWidth="1px" borderRadius="lg" p="4" mb="4">
          <Flex justify="space-between" align="center">
            <Box display="flex" alignItems="center">
              <Text fontWeight="bold" color="blue.500" mb={2}>{post.user}</Text>
            </Box>
            <Text fontSize="sm" color="gray.500">{new Date(post.time).toLocaleString()}</Text>
          </Flex>
          <Text fontSize="xl" fontWeight="bold">{post.title}</Text>
          <Text>{post.content}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default PostList;
