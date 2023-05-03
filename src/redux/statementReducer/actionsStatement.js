import {
  ADD_NEW_ENGINE_CHECK,
  ADD_NEW_SPEC_MARK_APP,
  DELETE_NEW_NOTE_APP,
  ADD_NEW_STATEMENT_DATA,
  ADD_NEW_DEAL,
  SET_DATA_FOR_STATEMENT_TABLES,
  ADD_NEW_STATEMENT,
} from "../types";

import {
  MAIN_URL,
  PORT,
  API_ADD_NEW_ENGINE_CHECK,
  API_ADD_NEW_STATEMENT,
} from "../../constants/constants";

export function addNewEngineCheck(engineVin, newEngine) {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_ADD_NEW_ENGINE_CHECK + engineVin, {
      method: "POST",
    });
    const data = await response.text();
    if (data === "OK") {
      dispatch({
        type: ADD_NEW_ENGINE_CHECK,
        data: newEngine,
      });
    }
  };
}
export function setDataForTable(data) {
  return {
    type: SET_DATA_FOR_STATEMENT_TABLES,
    data: data,
  };
}

export function addNewSpecMarkApp(newMark) {
  return {
    type: ADD_NEW_SPEC_MARK_APP,
    data: newMark,
  };
}

export function deleteNewNote(data) {
  console.log(data);
  return {
    type: DELETE_NEW_NOTE_APP,
    data: data,
  };
}
export function addNewDealApp(newDeal) {
  return {
    type: ADD_NEW_DEAL,
    data: newDeal,
  };
}
export function addNewStatementData(data) {
  return {
    type: ADD_NEW_STATEMENT_DATA,
    data: data,
  };
}

export function addNewStatement(data) {
  console.log("action data", data);
  return async (dispatch) => {
    const request = await fetch(MAIN_URL + PORT + API_ADD_NEW_STATEMENT, {
      method: "POST",
      body: data,
    });
    const response = await request.json();
    dispatch({
      type: ADD_NEW_STATEMENT,
      data: response,
    });
  };
}
