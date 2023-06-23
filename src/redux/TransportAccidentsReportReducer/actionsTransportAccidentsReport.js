import {
  ADD_NEW_CULPRIT,
  ADD_NEW_INJURED,
  DELETE_NEW_NOTE_ACCIDENT,
  ADD_NEW_ACCIDENT_DATA,
  CLEAR_ACCIDENT_DATA,
} from "../types";

import {
  MAIN_URL,
  PORT_FOR_REPORT,
  API_FIND_BOAT_INFO_BY_REGNUM,
  API_GET_TRANSPORT_ACCIDENT_LIST_SEARCH,
} from "../../constants/constants";

export function addNewCulprit(newCulprit) {
  return {
    type: ADD_NEW_CULPRIT,
    data: newCulprit,
  };
}
export function addNewInjured(newInjured) {
  return {
    type: ADD_NEW_INJURED,
    data: newInjured,
  };
}
export function deleteNewNoteAccident(data) {
  return {
    type: DELETE_NEW_NOTE_ACCIDENT,
    data: data,
  };
}
export function addNewAccidentData(data) {
  return {
    type: ADD_NEW_ACCIDENT_DATA,
    data: data,
  };
}
export function findBoatInfoByRegNum(regNum) {
  return async (dispatch) => {
    const request = await fetch(MAIN_URL + PORT_FOR_REPORT + API_FIND_BOAT_INFO_BY_REGNUM + regNum);
    if (request.status === "200") {
      const response = await request.json();
      console.log(response);
      // dispatch({
      //   type: ADD_NEW_ENGINE_CHECK,
      //   data: newEngine,
      // });
    }
  };
}
export function clearAccidentData() {
  return {
    type: CLEAR_ACCIDENT_DATA,
    data: {},
  };
}

export function getAccidentInfoById(id) {
  return async (dispatch) => {
    const requestMain = await fetch(
      MAIN_URL + PORT_FOR_REPORT + API_GET_TRANSPORT_ACCIDENT_LIST_SEARCH + "/" + id,
    );
    const responseMain = await requestMain.json();
    console.log(responseMain);
    // dispatch({
    //   type: GET_BOATS_REG_INFO,
    //   data: jsonData,
    // });
  };
}
