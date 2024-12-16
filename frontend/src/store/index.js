import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workoutReducer from './slices/workoutSlice';
import nutritionReducer from './slices/nutritionSlice';
import appointmentReducer from './slices/appointmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
    nutrition: nutritionReducer,
    appointment: appointmentReducer,
  },
});

export default store;

