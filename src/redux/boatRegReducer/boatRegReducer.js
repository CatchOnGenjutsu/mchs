import { ADD_NEW_ENGINE_CHECK } from "../types"

const initialState = {
  boatCardAppEngList: [
    {
      engname: "Test",
      engvin: "Test",
      engtype: "Test",
      engpwr: "Test",
      engProdYear: "Test",
    }
  ],
}

export const boatRegReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_NEW_ENGINE_CHECK:
      return (() => ({
        ...state,
        boatCardAppEngList: [action.data, ...state.boatCardAppEngList]
      }))();
    default:
      return state
  }
}