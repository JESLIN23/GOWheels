import { createSlice } from '@reduxjs/toolkit';

const initialState = { filterData: null };

const carFilterSlice = createSlice({
  name: 'findCar',
  initialState,
  reducers: {
    setFilterToFindCar(state, { payload }) {
      console.log(payload);
      state.filterData = payload;
    },
    clearFilterToFindCar(state) {
      state.filterData = null;
    },
  },
});

export const carFilterActions = carFilterSlice.actions;
export default carFilterSlice;
