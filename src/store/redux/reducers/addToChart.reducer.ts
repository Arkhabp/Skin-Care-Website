import { types } from "../../../constans/addChart.constan";
import { productData } from "./types";

// Definisikan tipe state
interface ProductDataState {
  product: {
    data: productData[];
    error: string | null;
    isLoading: boolean;
  };
}

// Inisialisasi state awal
const initialState: ProductDataState = {
  product: {
    data: [
      // { id: 1002, productName: "Produk A", quantity: 2, price: 100000 },
      // { id: 1003, productName: "Produk B", quantity: 1, price: 200000 },
      // { id: 1004, productName: "Produk C", quantity: 3, price: 150000 }
    ],
    error: null,
    isLoading: false
  }
};

// Reducer untuk mengelola state keranjang
const addTochartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        product: {
          ...state.product,
          isLoading: true,
          error: null,
          data: state.product.data
        }
      };
    case types.ADD_PRODUCT_SUCCESS:
      const newData = action.payload.data;
      const existingProduct = state.product.data.find(
        product => product.productName === newData.productName
      );

      if (existingProduct) {
        // Produk sudah ada, tingkatkan jumlahnya
        const updatedData = state.product.data.map(
          product =>
            product.productName === newData.productName
              ? { ...product, quantity: product.quantity + newData.quantity }
              : product
        );
        return {
          ...state,
          product: {
            data: updatedData,
            error: null,
            isLoading: false
          }
        };
      } else {
        // Produk belum ada, tambahkan produk baru
        return {
          ...state,
          product: {
            data: [...state.product.data, newData],
            error: null,
            isLoading: false
          }
        };
      }
    case types.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        product: {
          ...state.product,
          error: action.payload,
          isLoading: false
        }
      };
    default:
      return state;
  }
};

export default addTochartReducer;
