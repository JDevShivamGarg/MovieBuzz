import { configureStore } from '@reduxjs/toolkit';
import showReducer from './slice/showSlice'; 

const store = configureStore({
  reducer: {
    shows: showReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
