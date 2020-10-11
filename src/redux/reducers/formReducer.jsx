import {
    SET_ADDITIONAL_INFO,
    SET_MAIN_INFO,
    SET_CREATE_PRODUCT_ERRORS,
    SET_LOADING_CREATE_PRODUCT,
    RESET_FORM
} from "../types";

const initialState = {
    photos: [],
    errors: {},
    loading: false
};

export default (state=initialState, action) => {

    switch (action.type) {
        case SET_MAIN_INFO:
            const { name, link, description, photos} = action.payload;
            return {
                ...state,
                name,
                link,
                photos,
                description
            }
        case SET_ADDITIONAL_INFO:
            const { price, linkDisplay, cat} = action.payload
            return {
                ...state,
                price,
                linkDisplay, 
                cat
            }

        case SET_CREATE_PRODUCT_ERRORS:
            return {
                ...state,
                errors: action.payload,
                loading: false
            }
        case RESET_FORM:
            return initialState
        case SET_LOADING_CREATE_PRODUCT:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}