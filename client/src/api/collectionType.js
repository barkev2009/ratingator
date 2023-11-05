import { $authHost } from '../web';

export const getAllCollectionTypesAPI = async () => {
    const { data } = await $authHost.get('api/collectionType/');
    return data;
}