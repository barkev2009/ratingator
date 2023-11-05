import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllCollectionTypesAPI } from '../api/collectionType';

export const getAllCollectionTypes = createAsyncThunk(
    'collectionTypes/getAllCollections',
    getAllCollectionTypesAPI
  )

const initialState = {
    data: []
};

export const collectionTypeSlice = createSlice({
    name: 'collectionType',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllCollectionTypes.fulfilled, (state, action) => {
                    state.data = action.payload
                }
            )
    }
});

const { reducer } = collectionTypeSlice;
// export const { getAllCollections } = userSlice.actions
export default reducer;
