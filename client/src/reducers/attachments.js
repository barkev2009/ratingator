import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    data: []
};

export const attachmentSlice = createSlice({
    name: 'attachments',
    initialState,
    reducers: {
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
                    action.payload.collectionId = state.curCollection;
                    state.data.push(action.payload);
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

const { reducer } = attachmentSlice;
// export const { setCurCollection } = attachmentSlice.actions
export default reducer;
