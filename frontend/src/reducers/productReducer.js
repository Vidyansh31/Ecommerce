import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productReducer = (state = {products:[]},action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading : true,
                products:[]
            };
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading : false,
                products:action.payload.products,
                productsCount: action.payload.productsCount,
                resultperPage: action.payload.resultperPage,
                filteredProductsCount: action.payload.filteredProductsCount,
            };
        case ALL_PRODUCTS_FAIL:
            return {
                loading : false,
                products: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };
        default:
            return state;

    }
}

//PRODUCT DETAIL
export const productDetailReducer = (state = {product: {}},action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading : true,
                ...state,
            };
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading : false,
                product:action.payload,
                productsCount: action.payload.productsCount,
                resultperPage: action.payload.resultperPage,
                filteredProductsCount : action.payload.filteredProductsCount
            };
        case PRODUCT_DETAIL_FAIL:
            return {
                loading : false,
                product: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };
        default:
            return state;

    }
}