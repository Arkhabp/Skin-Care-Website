import { types } from "../../../constans/fetchCustomer.constan";

// Initial state untuk data produk
const initialState = {
  customer: [],
  loading: false,
  error: null
};

// Reducer untuk mengelola data produk
const fetchCustomer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.FETCH_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload,
        error: null
      };
    case types.FETCH_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchCustomer;
