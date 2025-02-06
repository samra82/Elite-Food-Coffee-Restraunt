// lib/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "@/components/storage/page";
import cartsReducer from "./features/carts/cartsSlice";

const persistConfig = {
  key: "root",
  storage, // Use the custom storage
  version: 1,
  whitelist: ["carts"], // Only persist the 'carts' slice
};

const rootReducer = combineReducers({
  carts: cartsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check for redux-persist
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

// Infer the type of the store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["store"]["getState"]>;
export type AppDispatch = AppStore["store"]["dispatch"];