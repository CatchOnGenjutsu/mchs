import {
  ADD_NEW_ENGINE_CHECK,
  ADD_NEW_DEAL,
  ADD_NEW_SPEC_MARK_APP,
  DELETE_NEW_NOTE_APP,
  ADD_NEW_STATEMENT_DATA,
  SET_DATA_FOR_STATEMENT_TABLES,
  GET_BOATS_REG_INFO,
  CLEAR_NEW_STATEMENT,
  GET_BOATS_DECISION_INFO,
  CLEAR_DECISION_DATA,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  personType: null,
  boatCardAppEngList: [],
  boatCardAppSpecMarkList: [],
  boatCardAppDealsList: [],
  appRegData: {},
  appDecisionData: {},
  newStatement: {},
};

export const statementReducer = (state = initialState, action) => {
  // console.log(action.data)
  switch (action.type) {
    case GET_BOATS_REG_INFO:
      return (() => ({
        ...state,
        newStatement: Object.assign({}, action.data.dataApp),
        personType: action.data.dataApp.personType.ptcode,
        boatCardAppEngList: [...action.data.dataAppEng],
        boatCardAppDealsList: [...action.data.dataAppDeals],
        boatCardAppSpecMarkList: [...action.data.dataAppSpecMarks],
      }))();
    case GET_BOATS_DECISION_INFO:
      return (() => ({
        ...state,
        appDecisionData: action.data.data,
        boatCardAppEngList: [...action.data.dataAppEng],
        boatCardAppDealsList: [...action.data.dataAppDeals],
        boatCardAppSpecMarkList: [...action.data.dataAppSpecMarks],
      }))();

    case ADD_NEW_ENGINE_CHECK:
      action.data["innerId"] = uuidv4();
      return (() => ({
        ...state,
        boatCardAppEngList: [action.data, ...state.boatCardAppEngList],
      }))();
    case ADD_NEW_SPEC_MARK_APP:
      action.data["innerId"] = uuidv4();
      return (() => ({
        ...state,
        boatCardAppSpecMarkList: [action.data, ...state.boatCardAppSpecMarkList],
      }))();
    case ADD_NEW_DEAL:
      action.data["innerId"] = uuidv4();
      return (() => ({
        ...state,
        boatCardAppDealsList: [action.data, ...state.boatCardAppDealsList],
      }))();
    case DELETE_NEW_NOTE_APP:
      switch (action.data.type) {
        case "boatCardAppEngDtoList":
          return (() => ({
            ...state,
            boatCardAppEngList: [
              ...state.boatCardAppEngList.filter((item) => item.innerId !== action.data.id),
            ],
          }))();
        case "boatCardAppSmDtoList":
          return (() => ({
            ...state,
            boatCardAppSpecMarkList: [
              ...state.boatCardAppSpecMarkList.filter((item) => item.innerId !== action.data.id),
            ],
          }))();
        case "boatCardAppDealsDtoList":
          return (() => ({
            ...state,
            boatCardAppDealsList: [
              ...state.boatCardAppDealsList.filter((item) => item.innerId !== action.data.id),
            ],
          }))();
        default:
          return state;
      }
    case ADD_NEW_STATEMENT_DATA:
      // const newKey = Object.keys(action.data)[0];
      // const value = Object.values(action.data)[0];
      return (() => ({
        ...state,
        newStatement: { ...state.newStatement, ...action.data },
      }))();

    case CLEAR_NEW_STATEMENT:
      return (() => ({
        ...state,
        newStatement: action.data,
        personType: null,
        boatCardAppEngList: [],
        boatCardAppSpecMarkList: [],
        boatCardAppDealsList: [],
      }))();
    case CLEAR_DECISION_DATA:
      return (() => ({
        ...state,
        appDecisionData: action.data,
        personType: null,
        boatCardAppEngList: [],
        boatCardAppSpecMarkList: [],
        boatCardAppDealsList: [],
      }))();
    // if (Object.keys(state.newStatement).includes(key)) {
    //   return (() => ({
    //     ...state,
    //     newStatement: [...state.newStatement.filter(item => Object.keys(item)[0] === key ? action.data : item)],
    //   }))()
    // } else {
    //   return (() => ({
    //     ...state,
    //     newStatement: [...state.newStatement, action.data],
    //   }))()
    // }
    case SET_DATA_FOR_STATEMENT_TABLES:
      console.log(action);
      switch (action.data.key) {
        case "boatCardAppEngDtoList":
          return (() => ({
            ...state,
            boatCardAppEngList: [...action.data.data],
          }))();
        case "boatCardAppSmDtoList":
          return (() => ({
            ...state,
            boatCardAppSpecMarkList: [...action.data.data],
          }))();
        case "boatCardAppDealsDtoList":
          return (() => ({
            ...state,
            boatCardAppDealsList: [...action.data.data],
          }))();
        default:
          return state;
      }
    default:
      return state;
  }
};
