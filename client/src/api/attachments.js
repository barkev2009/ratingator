import { $authHost } from '../web';

export const getAttachmentsAPI = async ({ collectionId }) => {
    const { data } = await $authHost.get(`api/attachment/collection/${collectionId}`);
    return data;
}

export const createAttachmentAPI = async ({ path, itemId }) => {
    try {
        const { data } = await $authHost.post(`api/attachment`, { path, itemId });
        return {data, success: true};
    } catch (error) {
        return {success: false, error: error.response.data.message}
    }
    
}

export const deleteAttachmentAPI = async ({ id }) => {
    const { data } = await $authHost.delete(`api/attachment/${id}`);
    return data;
}