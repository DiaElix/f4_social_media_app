
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Asynchronous thunk action to fetch posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      // Add image URL to every post
      const postsWithImages = data.map((post) => ({
        ...post,
        imgSrc: `https://picsum.photos/200?random=${post.id}`,
      }));

      return postsWithImages;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().posts;

      return !state.loading && state.posts.length === 0;
    },
  }

);

// Initial Redux state
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // While API request is running
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // When API request succeeds
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      // When API request fails
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default postsSlice.reducer;
