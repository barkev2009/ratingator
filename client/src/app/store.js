import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../slices/user';
import collectionTypeReducer from '../slices/collectionType';
import collectionReducer from '../slices/collections';
import itemReducer from '../slices/items';

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
            collectionType: collectionTypeReducer,
            collections: collectionReducer,
            items: itemReducer
        }
    }
)