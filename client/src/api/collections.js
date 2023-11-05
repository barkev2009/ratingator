import { $authHost } from '../web';

export const getCollectionsAPI = async ({ collectionTypeId, userId }) => {
    const { data } = await $authHost.get('api/collection/by_user_type', { params: { collectionTypeId, userId } });
    return data;
}

export const createCollectionAPI = async ({ name, collectionTypeId, userId }) => {
    const { data } = await $authHost.post('api/collection', { name, collectionTypeId, userId });
    return data;
}

export const deleteCollectionAPI = async ({ id }) => {
    const { data } = await $authHost.delete(`api/collection/${id}`);
    return data;
}