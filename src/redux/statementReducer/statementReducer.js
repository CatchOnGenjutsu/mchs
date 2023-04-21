import { ADD_NEW_ENGINE_CHECK, ADD_NEW_SPEC_MARK_APP, DELETE_NEW_NOTE_APP,ADD_NEW_STATEMENT_DATA } from "../types";
import { v4 as uuidv4 } from 'uuid';


const initialState = {
  boatCardAppEngList: [],
  boatCardAppSpecMarkList: [],
  newStatement: {}
};

export const statementReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case DELETE_NEW_NOTE_APP: 
      switch (action.data.type) {
        case "boatCardAppEngDtoList":
          return (() => ({
            ...state,
            boatCardAppEngList: [...state.boatCardAppEngList.filter(item => item.innerId !== action.data.id)],
          }))();
        case "boatCardAppSmDtoList":
          return (() => ({
            ...state,
            boatCardAppSpecMarkList: [...state.boatCardAppSpecMarkList.filter(item => item.innerId !== action.data.id)],
          }))();
        default:
          return state;
      }
    case ADD_NEW_STATEMENT_DATA: 
      const newKey = Object.keys(action.data)[0];
      const value = Object.values(action.data)[0];
      return (() => ({
        ...state,
        newStatement: {...state.newStatement, [newKey]: value},
      }))()
      
    default:
      return state;
  }
};
