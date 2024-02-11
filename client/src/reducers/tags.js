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


const initialState = {
    data: []
};

export const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        toggleFilterTags(state, action) {
            state.data = state.data.map(obj => {if (obj.id === action.payload) {obj.active = !obj.active;} return obj});
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getTags.fulfilled, (state, action) => {
                    state.data = action.payload.sort((a, b) => b.name - a.name).map(obj => {obj.active = false; return obj});
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
export const { toggleFilterTags } = tagSlice.actions;
export default reducer;
