import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { createAttachmentAPI, deleteAttachmentAPI, getAttachmentsAPI } from '../api/attachments';

export const getAttachments = createAsyncThunk(
    'attachments/getAttachments',
    getAttachmentsAPI
)
export const createAttachment = createAsyncThunk(
    'attachments/createAttachment',
    createAttachmentAPI
)
export const deleteAttachment = createAsyncThunk(
    'attachments/deleteAttachment',
    deleteAttachmentAPI
)

const initialState = {
    data: [],
    error: null
};

export const attachmentSlice = createSlice({
    name: 'attachments',
    initialState,
    reducers: {
        clearError(state, action) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getAttachments.fulfilled, (state, action) => {
                    state.data = action.payload
                }
            )
            .addCase(
                createAttachment.fulfilled, (state, action) => {
                    if (action.payload.success) {
                        action.payload.data.collectionId = state.curCollection;
                        state.data.push(action.payload.data);
                    } else {
                        state.error = JSON.stringify(action.payload.error, null, 2);
                    }
                }
            )
            .addCase(
                deleteAttachment.fulfilled, (state, action) => {
                    if (action.payload.result === 1) {
                        state.data = state.data.filter(item => item.id !== action.payload.attachment.id);
                    }
                }
            )
    }
});

export const getAttachmentsSelector = createSelector(
    [
        state => state.attachments.data,
        (state, itemId) => itemId
    ],
    (attachments, itemId) => attachments.filter(i => i.itemId === itemId)
);

const { reducer } = attachmentSlice;
export const { clearError } = attachmentSlice.actions;
export default reducer;
