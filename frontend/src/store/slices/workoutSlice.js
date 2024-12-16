import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchExercises = createAsyncThunk('workout/fetchExercises', async () => {
  const response = await api.get('/exercises');
  return response.data;
});

const workoutSlice = createSlice({
  name: 'workout',
  initialState: {
    exercises: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchExercises.pending, state => { state.loading = true; })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export default workoutSlice.reducer;
