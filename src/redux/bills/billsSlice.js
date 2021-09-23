import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [
    {
      "id": 1,
      "description": "Dominoes",
      "category": "FoodNDining",
      "amount": "430",
      "date": "01-02-2020"
    },
    {
      "id": 2,
      "description": "Car wash",
      "category": "utility",
      "amount": "500",
      "date": "12-06-2020"
    },
    {
      "id": 3,
      "description": "Amazon",
      "category": "shopping",
      "amount": "2030",
      "date": "01-07-2020"
    },
    {
      "id": 4,
      "description": "House rent",
      "category": "Food & Dining",
      "amount": "35900",
      "date": "01-03-2020"
    },
    {
      "id": 5,
      "description": "Tuition", "category": "education", "amount": "2200",
      "date": "01-12-2020"
    },
    {
      "id": 6,
      "description": "Laundry", "category": "Personal Care", "amount": "320",
      "date": "01-10-2020"
    },
    {
      "id": 7,
      "description": "Vacation", "category": "Travel",
      "amount": "3430",
      "date": "01-06-2020"
    }
  ]
};

export const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.value.push(action.payload)
    },
    updateBills: (state, action) => {
      if (action.payload.id && action.payload.updatedBill) {
        state.value = state.value.map((elem) => {
          if (action.payload.id && elem.id == action.payload.id) {
            const { description, category, amount, date } = action.payload.updatedBill
            return {
              id: elem.id,
              description,
              category,
              amount,
              date
            }
          } else return elem
        })
      }
    },
    deleteBills: (state, action) => {
      state.value = state.value.filter((elem) => elem.id != action.payload)
    }
  },
});

export const { addBill, updateBills, deleteBills } = billsSlice.actions;

export const selectBills = (state) => state.bills.value;

export default billsSlice.reducer;
