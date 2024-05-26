import { types } from "../../../../constans/fetchProduct.constan";
import axios from "axios";

// Fungsi untuk mengambil semua data produk dari database
export const fetchProducts = () => {
  return async (dispatch: any) => {
    dispatch({ type: types.FETCH_PRODUCTS_REQUEST });
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      dispatch({
        type: types.FETCH_PRODUCTS_SUCCESS,
        payload: response.data // Mengirim data produk ke reducer
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_PRODUCTS_FAILURE,
        payload: error.message // Mengirim pesan kesalahan ke reducer
      });
    }
  };
};
