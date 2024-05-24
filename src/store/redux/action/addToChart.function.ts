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
