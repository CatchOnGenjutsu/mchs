import { combineReducers } from "redux";
import { sidebarReducer } from "./reducers/sidebarReducer";
import { smallBoatsReducer } from "./reducers/smallBoatsReducer"
import {certificateReducer} from "./reducers/certificateReducer";
import {basesBuildingReducer} from "./reducers/basesBuildingReducer";
import {dictionaryReducer} from "./reducers/dictionaryReducer";

export const rootReducer = combineReducers({
  sidebarReducer,
  smallBoatsReducer,
  certificateReducer,
  dictionaryReducer,
  basesBuildingReducer

})