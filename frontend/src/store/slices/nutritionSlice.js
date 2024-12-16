import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meals: [],
};

const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {
    addMeal: (state, action) => {
      state.meals.push(action.payload);
    },
    removeMeal: (state, action) => {
      state.meals = state.meals.filter(meal => meal.id !== action.payload);
    },
  },
});

export const { addMeal, removeMeal } = nutritionSlice.actions;
export default nutritionSlice.reducer;
