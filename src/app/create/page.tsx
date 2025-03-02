import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions/postActions';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState('');
  const [time, setTime] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => { // Updated to async
    e.preventDefault();
    const response = await axios.post('/api/posts', { title, content, user, time });
    dispatch(createPost(response.data));
    // Optionally redirect or show a success message
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="User" required />
      <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" required />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
