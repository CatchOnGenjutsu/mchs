import {
  GET_BOATS_REG_INFO
} from "../types"

import {
  MAIN_URL,
  PORT,
  API_GET_BOATS_REG_INFO
} from "../../constants/constants"


export function getBoatRegInfo(id) {
  return async dispatch => {
    const response = await fetch(MAIN_URL + PORT + API_GET_BOATS_REG_INFO + id);
    if (response.ok) {
      const data = await response.json();
      const jsonData = { data: data }
      dispatch({
        type: GET_BOATS_REG_INFO,
        data: jsonData
      })
    }
  };
}