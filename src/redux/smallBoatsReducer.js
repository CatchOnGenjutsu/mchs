import {
  GET_BOATS_CARDS_LIST,
  GET_BOAT_CARD_INFO
} from "./types";

const initialState = {
  data: [],
  boatInfo: {}
}


export const smallBoatsReducer = (state = initialState, action) => {
  // console.log("smallBoatsReducer >>", action.data)
  switch (action.type) {
    case GET_BOATS_CARDS_LIST:
      return (() => ({
        ...state,
        data: [
          ...action.data
        ],
      }))();
    case GET_BOAT_CARD_INFO:
      return (() => ({
        ...state,
        boatInfo: Object.assign({}, action.data)
      }))();
    default:
      return state;
  }
};