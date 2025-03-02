"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createPost } from "../../redux/slice/posts.ts";
import { Box, Container, FormControl, FormLabel, Input, Textarea, Button, Heading } from "@chakra-ui/react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();  
  const user = "currentUser"; // Replace with actual user data
  const time = new Date().toISOString(); // Get current time

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/posts', { title, content, user, time });
    dispatch(createPost(response.data));
    window.location.href = '/dashboard'; // Redirect to dashboard after successful submission
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Create a New Post
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl mb={6}>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            focusBorderColor="green.400"
          />
        </FormControl>
        <FormControl mb={6}>
          <FormLabel>Content</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            focusBorderColor="green.400"
            minH="200px"
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="green"
          size="lg"
          width="full"
        >
          Submit
        </Button>
      </Box>
    </Container>

  );
};

export default CreatePost;
