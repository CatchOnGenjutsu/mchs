import {
  SET_SEARCH_PARAMS_BOATS_REG,
  GET_DATA_BY_SEARCH_PARAMS_BOATS_REG,
} from "../types"

const initialState = {
  data: [],
  searchParams: {
    surname: '',
    name: '',
    midname: '',
    regNum: '',
    unp: '',
    nameLe: '',
    section: 0,
    status: 0
  }
}

export const smallBoatsRegReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAMS_BOATS_REG:
      // sessionStorage.setItem("searchParams", JSON.stringify(Object.assign(state.searchParams, action.data)))
      return (() => ({
        ...state,
        searchParams: Object.assign(state.searchParams, action.data)
      }))()
    case GET_DATA_BY_SEARCH_PARAMS_BOATS_REG:
      return (() => ({
        ...state,
        data: [
          ...action.data
        ],
      }))();
    default:
      return state;
  }
}