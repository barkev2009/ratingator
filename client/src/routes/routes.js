import { AUTH_ROUTE, MAIN_ROUTE, REGISTER_ROUTE, COLLECTIONS_ROUTE, COLLECTION_ROUTE } from "../constants"
import Auth from "./Auth"
import Main from "./Main"

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
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