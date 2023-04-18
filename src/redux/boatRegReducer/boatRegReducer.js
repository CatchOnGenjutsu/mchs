import { ADD_NEW_ENGINE_CHECK, ADD_NEW_SPEC_MARK_APP, DELETE_NEW_NOTE_APP } from "../types";
import { v4 as uuidv4 } from 'uuid';


const initialState = {
  boatCardAppEngList: [
  ],
  boatCardAppSpecMarkList: [
  ],
};

export const boatRegReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};
