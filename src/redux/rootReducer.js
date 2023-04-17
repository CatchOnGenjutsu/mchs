import { combineReducers } from "redux";
import { loginReducer } from "./globalReducers/loginReducer";
import { smallBoatsReducer } from "./smallBoatsReducer/smallBoatsReducer"
import { certificateReducer } from "./certificateReducer/certificateReducer";
import { basesBuildingReducer } from "./baseBuildingReducer/basesBuildingReducer";
import { dictionaryReducer } from "./globalReducers/dictionaryReducer";
import { smallBoatsRegReducer } from "./SmallBoatsRegReducer/SmallBoatsRegReducer";
import {registrationInformationChangesReducer} from "./RegistrationInformationChangesReducer/RegistrationInformationChangesReducer"
import {tableReducer} from"./globalReducers/tableReducer";
import { boatRegReducer } from "./boatRegReducer/boatRegReducer";


export const rootReducer = combineReducers({
  loginReducer,
  smallBoatsReducer,
  certificateReducer,
  dictionaryReducer,
  basesBuildingReducer,
  smallBoatsRegReducer,
  tableReducer,
  registrationInformationChangesReducer,
  boatRegReducer
})