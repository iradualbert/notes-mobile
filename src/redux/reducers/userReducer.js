import {
    SET_USER,
    LOADING_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_CONFIRMED_USER
} from "../types";


const initialState = {
    isAuthenticated: false,
    hasAccount: false,
    loading: false,
    token: null,
    isActive: false,
    credentials: {},
    notifications: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
                hasAccount: true,
                loading: false
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                hasAccount: true,
                loading: false,
                credentials: action.payload.user,
                token: `Token ${action.payload.token}`,
                isActive: action.payload.is_active
            }
        case SET_CONFIRMED_USER:
            return {
                ...state,
                credentials: action.payload.user,
                isActive: true,
                loading: false
            }
        default:
            return state;
    }
}