import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    createPost: (state, action) => {
      state.push(action.payload);
    },
    // Additional reducers can be added here
  },
});

export const { createPost } = postsSlice.actions;
export default postsSlice.reducer;
