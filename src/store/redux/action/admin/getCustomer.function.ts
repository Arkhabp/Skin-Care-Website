import { types } from "../../../../constans/fetchCustomer.constan";
import axios from "axios";

// Fungsi untuk mengambil semua data produk dari database
export const fetchCustomer = () => {
  return async (dispatch: any) => {
    dispatch({ type: types.FETCH_CUSTOMER_REQUEST });
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/customer-data"
      );
      dispatch({
        type: types.FETCH_CUSTOMER_SUCCESS,
        payload: response.data // Mengirim data produk ke reducer
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_CUSTOMER_FAILURE,
        payload: error.message // Mengirim pesan kesalahan ke reducer
      });
    }
  };
};

export const deleteCustomer = (id: string) => async (dispatch: any) => {
  try {
    await axios.delete(`http://localhost:5000/api/admin/delete-customer/${id}`);
    dispatch(fetchCustomer()); // Refresh data setelah delete
  } catch (error) {
    console.error("Error deleting customer:", error);
  }
};
