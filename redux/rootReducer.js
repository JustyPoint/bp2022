// External Components
import { combineReducers } from "@reduxjs/toolkit";
// Internal Components
import appSlice from "./app";

/**Se combinan los slices en un "root" reducer.*/
export default combineReducers({
  app: appSlice,
});
