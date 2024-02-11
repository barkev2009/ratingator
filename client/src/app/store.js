import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../reducers/user';
import collectionTypeReducer from '../reducers/collectionType';
import collectionReducer from '../reducers/collections';
import itemReducer from '../reducers/items';
import attachmentReducer from '../reducers/attachments';
import tagReducer from '../reducers/tags';

export const store = configureStore(
    {
        reducer: {
            user: userReducer,
            collectionType: collectionTypeReducer,
            collections: collectionReducer,
            items: itemReducer,
            attachments: attachmentReducer,
            tags: tagReducer
        }
    }
)