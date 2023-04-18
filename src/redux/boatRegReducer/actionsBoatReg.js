import { ADD_NEW_ENGINE_CHECK } from "../types";

import { MAIN_URL, PORT, API_ADD_NEW_ENGINE_CHECK} from "../../constants/constants";

export function addNewEngineCheck(engineVin, newEngine) {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_ADD_NEW_ENGINE_CHECK + engineVin, {
      method: "POST"
    });
    const data = await response.text();
    if (data === "OK") {
      dispatch({
        type: ADD_NEW_ENGINE_CHECK,
        data: newEngine
      })
    }
   }
}