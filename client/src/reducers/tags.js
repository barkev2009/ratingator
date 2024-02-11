import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createTagAPI, getTagsAPI, setTagAPI, unsetTagAPI, deleteTagAPI } from '../api/tags';

export const getTags = createAsyncThunk(
    'tags/getTags',
    getTagsAPI
)
export const createTag = createAsyncThunk(
    'tags/createTag',
    createTagAPI
)
export const deleteTag = createAsyncThunk(
    'tags/deleteTag',
    deleteTagAPI
)
export const setTag = createAsyncThunk(
    'tags/setTag',
    setTagAPI
)
export const unsetTag = createAsyncThunk(
    'tags/unsetTag',
    unsetTagAPI
)

const initialState = {
    data: []
};

export const tagSlice = createSlice({
    name: 'tags',
    initialState,
    // reducers: {
    //     sortByRating(state, action) {
    //         setCookie('itemsRatingSort', String(action.payload));
    //         state.ratingSort = action.payload;
    //         if (action.payload === 'true') {
    //             state.data = state.data.sort((a, b) => b.rating - a.rating);
    //         } else {
    //             state.data = state.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //         }
    //     }
    // },
    extraReducers: (builder) => {
        builder
            .addCase(
                getTags.fulfilled, (state, action) => {
                    state.data = action.payload.sort((a, b) => b.name - a.name);
                }
            )
            .addCase(
                createTag.fulfilled, (state, action) => {
                    state.data.push(action.payload);
                    state.data = state.data.sort((a, b) => b.name - a.name);
                }
            )
            .addCase(
                deleteTag.fulfilled, (state, action) => {
                    if (action.payload.result === 1) {
                        state.data = state.data.filter(item => item.id !== action.payload.item.id);
                    }
                    state.data = state.data.sort((a, b) => b.name - a.name);
                }
            )
    }
});

const { reducer } = tagSlice;
// export const { sortByRating } = tagSlice.actions;
export default reducer;
