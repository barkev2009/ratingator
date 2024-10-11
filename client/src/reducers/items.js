import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createItemAPI, deleteItemAPI, editItemAPI, getItemAPI, getItemsAPI } from '../api/items';
import { getCookie, setCookie } from '../utils/cookies';
import { setTagAPI, unsetTagAPI } from '../api/tags';

export const getItems = createAsyncThunk(
    'items/getItems',
    getItemsAPI
)
export const getAllItems = createAsyncThunk(
    'items/getAllItems',
    getItemsAPI
)
export const getItem = createAsyncThunk(
    'items/getItem',
    getItemAPI
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
    total: 0,
    ratingSort: getCookie('itemsRatingSort') || 'false'
};

export const itemSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        sortByRating(state, action) {
            setCookie('itemsRatingSort', String(action.payload));
            // state.ratingSort = action.payload;
            // if (action.payload === 'true') {
            //     state.data = state.data.sort((a, b) => b.rating - a.rating);
            // } else {
            //     state.data = state.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            // }
        },
        clearItems(state, action) {
            state.data = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getItems.fulfilled, (state, action) => {
                    if (state.data.length === 1) {
                        state.data = action.payload;
                    } else {
                        const ids = state.data.map(i => i.id);
                        action.payload.forEach(
                            item => {
                                if (!ids.includes(item.id)) {
                                    state.data.push(item);
                                    ids.push(item.id);
                                }
                            }
                        );
                    }
                }
            )
            .addCase(
                getAllItems.fulfilled, (state, action) => {
                    state.total = action.payload.length;
                }
            )
            .addCase(
                getItem.fulfilled, (state, action) => {
                    if (!state.data.map(i => i.id).includes(action.payload.id)) {
                        state.data.push(action.payload);
                    }
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
                    state.data[state.data.map(i => i.id).indexOf(action.payload.item.id)] = action.payload.item;
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
                    state.data[state.data.map(i => i.id).indexOf(action.payload.id)] = action.payload;
                    if (state.ratingSort === 'true') {
                        state.data = state.data.sort((a, b) => b.rating - a.rating);
                    } else {
                        state.data = state.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    }
                }
            )
            .addCase(
                unsetTag.fulfilled, (state, action) => {
                    state.data[state.data.map(i => i.id).indexOf(action.payload.item.id)] = action.payload.item;
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
export const { sortByRating, clearItems } = itemSlice.actions;
export default reducer;
