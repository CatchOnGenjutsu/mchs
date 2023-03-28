import { combineReducers } from "redux";
import { smallBoatsReducer } from "./smallBoatsReducer/smallBoatsReducer"
import { certificateReducer } from "./certificateReducer/certificateReducer";
import { basesBuildingReducer } from "./baseBuildingReducer/basesBuildingReducer";
import { dictionaryReducer } from "./globalReducers/dictionaryReducer";
import { smallBoatsRegReducer } from "./SmallBoatsRegReducer/SmallBoatsRegReducer";

export const rootReducer = combineReducers({
  smallBoatsReducer,
  certificateReducer,
  dictionaryReducer,
  basesBuildingReducer,
  smallBoatsRegReducer
})