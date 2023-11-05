import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createItemAPI, deleteItemAPI, getItemsAPI } from '../api/items';

export const getItems = createAsyncThunk(
    'items/getItems',
    getItemsAPI
)
export const createItem = createAsyncThunk(
    'items/createItem',
    createItemAPI
)
export const deleteItem = createAsyncThunk(
    'items/deleteItem',
    deleteItemAPI
)

const initialState = {
    data: []
};

export const itemSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getItems.fulfilled, (state, action) => {
                    state.data = action.payload
                }
            )
            .addCase(
                createItem.fulfilled, (state, action) => {
                    state.data.push(action.payload);
                    state.data = state.data.sort((a, b) => b.createdAt - a.createdAt);
                }
            )
            .addCase(
                deleteItem.fulfilled, (state, action) => {
                    if (action.payload.result === 1) {
                        state.data = state.data.filter(item => item.id !== action.payload.item.id);
                    }
                    state.data = state.data.sort((a, b) => b.createdAt - a.createdAt);
                }
            )
    }
});

const { reducer } = itemSlice;
// export const { setCurType } = itemSlice.actions
export default reducer;
