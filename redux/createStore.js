// External Components
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export default function createStore(pe = {}) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: pe,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
    devTools: process.env.NODE_ENV !== "production",
  });

  return store;
}
