import { types } from "../../../constans/addChart.constan";
import { dataProduct } from "./types";

export function addTochart(data: dataProduct) {
  return async (dispatch: any) => {
    dispatch({ type: types.ADD_PRODUCT_REQUEST });
    try {
      console.log("DATA: ", data);
      dispatch({
        type: types.ADD_PRODUCT_SUCCESS,
        payload: { data }
      });
      // alert(`Berhasil menambahkan ke keranjang: ${data.productName}`);
    } catch (error) {
      alert(error);
    }
  };
}

export const deleteProduct = (id: number) => {
  return (dispatch: any) => {
    dispatch({ type: types.DELETE_PRODUCT_REQUEST });
    try {
      // Simulasi penghapusan produk

      dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: { id } });
    } catch (error) {
      dispatch({
        type: types.DELETE_PRODUCT_FAILURE,
        payload: "error menghapus produk"
      });
    }
  };
};

export const increaseQuantity = (id: number) => ({
  type: types.INCREASE_QUANTITY,
  payload: id
});

export const decreaseQuantity = (id: number) => ({
  type: types.DECREASE_QUANTITY,
  payload: id
});

export const clearCart = () => ({
  type: types.CLEAR_CART
});
