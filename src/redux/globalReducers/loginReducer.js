import {
  GET_LOGIN_TOKEN
} from "../types";

const initialState = {
  token: ''
}

export const loginReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_LOGIN_TOKEN:
      return {
        ...state, 
        token: action.data
      }
    default:
      return state
  }
}