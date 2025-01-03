import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { configs } from '../config';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${configs.baseUrl}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      return data.payLoad.data; // Return the user data
    } catch (error) {
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
    isLoggedIn: "idle",

  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = "idle"
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoggedIn = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isLoggedIn = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isLoggedIn = "failed";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
