import { configureStore } from '@reduxjs/toolkit';
import billsReducer from '../redux/bills/billsSlice';

export const store = configureStore({
  reducer: {
    bills: billsReducer,
  },
});
