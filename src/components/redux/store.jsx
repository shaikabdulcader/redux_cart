import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CardSlicer";
import TotalReducer from "./TotalSlicer";


export default configureStore({
  reducer: {
    product: counterReducer,
    total: TotalReducer,
  },
})
