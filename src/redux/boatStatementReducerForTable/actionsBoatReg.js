import { ADD_NEW_ENGINE_CHECK, ADD_NEW_SPEC_MARK_APP,ADD_NEW_DEAL, DELETE_NEW_NOTE_APP ,SET_DATA_FOR_STATEMENT_TABLES} from "../types";

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

export function setDataForTable(data) {
    return {
        type: SET_DATA_FOR_STATEMENT_TABLES,
        data: data
    }
}

export function addNewSpecMarkApp(newMark) {
   return {
    type: ADD_NEW_SPEC_MARK_APP,
    data: newMark
  }
}
export function addNewDealApp(newDeal) {
    return {
        type: ADD_NEW_DEAL,
        data: newDeal
    }
}

export function deleteNewNote(data) {
  return {
    type: DELETE_NEW_NOTE_APP,
    data: data
  }
}