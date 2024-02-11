import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createItemAPI, deleteItemAPI, editItemAPI, getItemsAPI } from '../api/items';
import { getCookie, setCookie } from '../utils/cookies';
import { setTagAPI, unsetTagAPI } from '../api/tags';

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
export const editItem = createAsyncThunk(
    'items/editItem',
    editItemAPI
)
export const setTag = createAsyncThunk(
    'items/setTag',
    setTagAPI
)
export const unsetTag = createAsyncThunk(
    'items/unsetTag',
    unsetTagAPI
)

const initialState = {
    data: [],
    ratingSort: getCookie('itemsRatingSort') || 'false'
};

export const itemSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        sortByRating(state, action) {
            setCookie('itemsRatingSort', String(action.payload));
            state.ratingSort = action.payload;
            if (action.payload === 'true') {
                state.data = state.data.sort((a, b) => b.rating - a.rating);
            } else {
                state.data = state.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getItems.fulfilled, (state, action) => {
                    state.data = action.payload;
                    if (state.ratingSort === 'true') {
                        state.data = state.data.sort((a, b) => b.rating - a.rating);
                    } else {
                        state.data = state.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    }
                }
            )
            .addCase(
                createItem.fulfilled, (state, action) => {
                    state.data.push(action.payload);
                    if (state.ratingSort === 'true') {
                        state.data = state.data.sort((a, b) => b.rating - a.rating);
                    } else {
                        state.data = state.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    }
                }
            )
            .addCase(
                editItem.fulfilled, (state, action) => {
                    state.data = state.data.filter(item => item.id !== action.payload.item.id);
                    state.data.push(action.payload.item);
                    if (state.ratingSort === 'true') {
                        state.data = state.data.sort((a, b) => b.rating - a.rating);
                    } else {
                        state.data = state.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    }
                }
            )
            .addCase(
                deleteItem.fulfilled, (state, action) => {
                    if (action.payload.result === 1) {
                        state.data = state.data.filter(item => item.id !== action.payload.item.id);
                    }
                    if (state.ratingSort === 'true') {
                        state.data = state.data.sort((a, b) => b.rating - a.rating);
                    } else {
                        state.data = state.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    }
                }
            )
            .addCase(
                setTag.fulfilled, (state, action) => {
                    state.data = state.data.filter(item => item.id !== action.payload.id);
                    state.data.push(action.payload);
                    if (state.ratingSort === 'true') {
                        state.data = state.data.sort((a, b) => b.rating - a.rating);
                    } else {
                        state.data = state.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    }      
                }
            )
            .addCase(
                unsetTag.fulfilled, (state, action) => {
                    state.data = state.data.filter(item => item.id !== action.payload.item.id);
                    state.data.push(action.payload.item);
                    if (state.ratingSort === 'true') {
                        state.data = state.data.sort((a, b) => b.rating - a.rating);
                    } else {
                        state.data = state.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    }   
                }
            )
    }
});

const { reducer } = itemSlice;
export const { sortByRating } = itemSlice.actions;
export default reducer;
