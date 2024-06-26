import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

import addTochartReducer from "./redux/reducers/addToChart.reducer";
import { thunk } from "redux-thunk";
import fetchProducts from "./redux/reducers/getProducts.reducer";
import fetchCustomer from "./redux/reducers/getCustomer.reducer";

export const store = configureStore({
  reducer: {
    addTochart: addTochartReducer,
    fetchProduct: fetchProducts,
    fetchCustomer: fetchCustomer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(thunk)
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
