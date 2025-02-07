import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './fileSlice';

export const store = configureStore({
  reducer: {
    files: filesReducer,
  },
});
