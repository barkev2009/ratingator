import { $authHost } from '../web';

export const getItemsAPI = async ({ collectionId, limit, offset, sortByRating, tags }) => {
    const { data } = await $authHost.get('api/item/collection/' + collectionId, { params: { limit, offset, sortByRating, tags } });
    return data;
}

export const getItemAPI = async ({ id }) => {
    const { data } = await $authHost.get('api/item/id/' + id);
    return data;
}

export const createItemAPI = async ({ name, collectionId }) => {
    const { data } = await $authHost.post('api/item', { name, collectionId });
    return data;
}

export const editItemAPI = async ({ id, name, collectionId, avatar_path, rating, order_number }) => {
    try {
        const { data } = await $authHost.put(`api/item/${id}`, { name, collectionId, avatar_path, rating, order_number });
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.response.data.message }
    }

}

export const deleteItemAPI = async ({ id }) => {
    const { data } = await $authHost.delete(`api/item/${id}`);
    return data;
}