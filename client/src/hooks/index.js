import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setCookie } from "../utils/cookies";
import { CUR_PAGE_COOKIE } from "../constants";

// Хук для установления текущей страницы, удобен при рефреше
export const useSetCookie = () => {
    const location = useLocation();
    useEffect(
        () => {
            setCookie(CUR_PAGE_COOKIE, location.pathname);
        }, []
    );
}
