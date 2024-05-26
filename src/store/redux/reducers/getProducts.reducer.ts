import { types } from "../../../constans/fetchProduct.constan";

// Initial state untuk data produk
const initialState = {
  products: [],
  loading: false,
  error: null
};

// Reducer untuk mengelola data produk
const fetchProducts = (state = initialState, action: any) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null
      };
    case types.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchProducts;
