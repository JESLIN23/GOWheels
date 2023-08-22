import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCar: null
}

const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        setSelectedCar(state, { payload }) {
            state.selectedCar = payload.car;
        },
        clearSelectedCar(state) {
            state.selectedCar = null;
        }
    }
})

export const carActions = carSlice.actions;
export default carSlice;