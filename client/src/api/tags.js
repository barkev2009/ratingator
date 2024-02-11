import { $authHost } from '../web';

export const getTagsAPI = async ({ collectionId }) => {
    const { data } = await $authHost.get('api/tag/' + collectionId);
    return data;
}

export const createTagAPI = async ({ name, collectionId }) => {
    const { data } = await $authHost.post('api/tag', { name, collectionId });
    return data;
}

export const setTagAPI = async ({ tagId, itemId }) => {
    const { data } = await $authHost.post(`api/tag/set`, { tagId, itemId });
    return data;
}

export const unsetTagAPI = async ({ id }) => {
    const { data } = await $authHost.post(`api/tag/unset`, { id });
    return data;
}

export const deleteTagAPI = async ({ id }) => {
    const { data } = await $authHost.delete(`api/tag/${id}`);
    return data;
}