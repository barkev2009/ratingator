import { AUTH_ROUTE, MAIN_ROUTE, REGISTER_ROUTE, COLLECTIONS_ROUTE, COLLECTION_ROUTE, CARD_ROUTE } from "../constants";
import Auth from "./Auth";
import Card from "./Card";
import CollectionTypes from "./CollectionTypes";
import Collections from "./Collections";
import Items from "./Items";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: CollectionTypes
    },
    {
        path: COLLECTIONS_ROUTE,
        Component: Collections
    },
    {
        path: COLLECTION_ROUTE,
        Component: Items
    },
    {
        path: CARD_ROUTE,
        Component: Card
    }
]

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: REGISTER_ROUTE,
        Component: Auth
    }
]