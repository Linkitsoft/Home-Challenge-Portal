import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: localStorage.getItem('roleId') ? localStorage.getItem('roleId') : null
};

const roles = createSlice({
    name: "roles",
    initialState,
    reducers: {
        setRole: (state, { payload }) =>
        {
            state.role = payload;
        },
    },
});

export const {
    setRole,

} = roles.actions;

export default roles.reducer;