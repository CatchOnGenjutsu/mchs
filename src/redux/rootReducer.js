import { combineReducers } from "redux";
import { sidebarReducer } from "./sidebarReducer";
import { smallBoatsReducer } from "./smallBoatsReducer";

export const rootReducer = combineReducers({
  sidebarReducer,
  smallBoatsReducer
})