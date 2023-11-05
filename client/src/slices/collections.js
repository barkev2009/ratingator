import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCollectionAPI, deleteCollectionAPI, getCollectionsAPI } from '../api/collections';
import { getCookie, setCookie } from '../utils/cookies';

export const getCollections = createAsyncThunk(
    'collections/getCollections',
    getCollectionsAPI
)
export const createCollection = createAsyncThunk(
    'collections/createCollection',
    createCollectionAPI
)
export const deleteCollection = createAsyncThunk(
    'collections/deleteCollection',
    deleteCollectionAPI
)

const initialState = {
    data: [],
    curType: getCookie('curType')
};

export const collectionSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        setCurType: (state, action) => {
            state.curType = action.payload;
            setCookie('curType', action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getCollections.fulfilled, (state, action) => {
                    state.data = action.payload
                }
            )
            .addCase(
                createCollection.fulfilled, (state, action) => {
                    state.data.push(action.payload);
                    state.data = state.data.sort((a, b) => b.createdAt - a.createdAt);
                }
            )
            .addCase(
                deleteCollection.fulfilled, (state, action) => {
                    if (action.payload.result === 1) {
                        state.data = state.data.filter(item => item.id !== action.payload.collection.id);
                    }
                    state.data = state.data.sort((a, b) => b.createdAt - a.createdAt);
                }
            )
    }
});

const { reducer } = collectionSlice;
export const { setCurType } = collectionSlice.actions
export default reducer;
