import { combineReducers } from "redux";
import { loginReducer } from "./globalReducers/loginReducer";
import { smallBoatsReducer } from "./smallBoatsReducer/smallBoatsReducer";
import { certificateReducer } from "./certificateReducer/certificateReducer";
import { basesBuildingReducer } from "./baseBuildingReducer/basesBuildingReducer";
import { dictionaryReducer } from "./globalReducers/dictionaryReducer";
import { smallBoatsRegReducer } from "./SmallBoatsRegReducer/SmallBoatsRegReducer";
import { registrationInformationChangesReducer } from "./RegistrationInformationChangesReducer/RegistrationInformationChangesReducer";
import { tableReducer } from "./globalReducers/tableReducer";
import { statementReducer } from "./statementReducer/statementReducer";
import { DuplicateShipsTicketReducer } from "./DuplicateShipsTicketReducer/DuplicateShipsTicketReducer";
import { ShipsTicketReducer } from "./ShipsTicketReducer/ShipsTicketReducer";
import { provisionInformationReducer } from "./provisionInformationReducer/provisionInformationReducer";
import { TransportAccidentsReportReducer } from "./TransportAccidentsReportReducer/TransportAccidentsReportReducer";
import { TechnicalExaminationReducer } from "./TechnicalExaminationReducer/TechnicalExaminationReducer";

export const rootReducer = combineReducers({
  loginReducer,
  smallBoatsReducer,
  certificateReducer,
  dictionaryReducer,
  basesBuildingReducer,
  smallBoatsRegReducer,
  tableReducer,
  registrationInformationChangesReducer,
  statementReducer,
  DuplicateShipsTicketReducer,
  ShipsTicketReducer,
  provisionInformationReducer,
  TransportAccidentsReportReducer,
  TechnicalExaminationReducer,
});
