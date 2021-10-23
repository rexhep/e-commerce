import { PRODUCT_RATINGS_FAIL, PRODUCT_RATINGS_REQUEST, PRODUCT_RATINGS_SUCCESS } from "../constants/ratingsConstants";

export const productRatingsReducer = (state = { loading: true, ratings: [] }, action) => {
    switch (action.type) {
        case PRODUCT_RATINGS_REQUEST:
            return { loading: true };
        case PRODUCT_RATINGS_SUCCESS:
            return { loading: false, item: action.payload }
        case PRODUCT_RATINGS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}