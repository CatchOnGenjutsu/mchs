import {
  GET_BOATS_CARDS_LIST
} from "./types";

const initialState = {
  data: []
}


export const smallBoatsReducer = (state = initialState, action) => {
  console.log("smallBoatsReducer >>", action.data)
  switch (action.type) {
    case GET_BOATS_CARDS_LIST:
      return (() => ({
        ...state,
        data: [
          ...action.data
        ],
      }))();
    default:
      return state;
  }
};