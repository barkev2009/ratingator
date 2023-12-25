import { $authHost } from '../web';

export const getItemsAPI = async ({ collectionId }) => {
    const { data } = await $authHost.get('api/item/collection/' + collectionId);
    return data;
}

export const createItemAPI = async ({ name, collectionId }) => {
    const { data } = await $authHost.post('api/item', { name, collectionId });
    return data;
}

export const editItemAPI = async ({ id, name, collectionId, avatar_path, rating, order_number }) => {
    const { data } = await $authHost.put(`api/item/${id}`, { name, collectionId, avatar_path, rating, order_number });
    return data;
}

export const deleteItemAPI = async ({ id }) => {
    const { data } = await $authHost.delete(`api/item/${id}`);
    return data;
}