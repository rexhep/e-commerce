import {
    PRODUCT_BY_CATEGORY_FAIL,
    PRODUCT_BY_CATEGORY_REQUEST,
    PRODUCT_BY_CATEGORY_SUCCESS,
    PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_REGISTER_FAIL, PRODUCT_REGISTER_REQUEST, PRODUCT_REGISTER_SUCCESS
} from "../constants/productContants";

export const productListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
};

export const productDetailsReducer = (state = { loading: true, product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productRegisterReducer = (state = { loading: true, item: {} }, action) => {
    switch (action.type) {
        case PRODUCT_REGISTER_REQUEST:
            return { loading: true };
        case PRODUCT_REGISTER_SUCCESS:
            return { loading: false, item: action.payload }
        case PRODUCT_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productByCategoryrReducer = (state = { loading: true, item: {}, action } => {
    switch (action.type) {
        case PRODUCT_BY_CATEGORY_REQUEST:
            return { loading: true };
        case PRODUCT_BY_CATEGORY_SUCCESS:
            return { loading: false, item: action.payload }
        case PRODUCT_BY_CATEGORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
});