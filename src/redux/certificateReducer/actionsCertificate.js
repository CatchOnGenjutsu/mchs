import {
  GET_LICENSE_BY_ID,
  ADD_NEW_SPEC_MARK,
  ADD_NEW_CONF_MARK,
} from '../types';
import {
  MAIN_URL,
  PORT,
  API_GET_LICENSE_INFO_CARD,
  API_GET_LICENSE_ADD_INFO_CARD,
  API_GET_LICENSE_INFO_FROM_LIBS_OBLAST,
  API_GET_LICENSE_INFO_FROM_LIBS_RAYON,
  API_GET_LICENSE_INFO_FROM_LIBS_GOROD,
  API_ADD_NEW_SPECIAL_MARK,
  API_ADD_NEW_CONF_MARK,
} from "../../constants/constants";

export function getLicenseById(id) {
  return async dispatch => {
  const response = await fetch(MAIN_URL + PORT + API_GET_LICENSE_INFO_CARD + id);
  if (response.ok) {
    const data = await response.json();
    data["docType"] = data["docType"]["dtname"]
    data["licenseType"] = data["licenseType"]["name"]
    data["docSeries"] = data["docNum"].slice(2);
    data["docNum"] = data["docNum"].slice(0, 2);
    const oblast = await fetch(MAIN_URL + PORT + API_GET_LICENSE_INFO_FROM_LIBS_OBLAST + data.oblId);
    const rayon = await fetch(MAIN_URL + PORT + API_GET_LICENSE_INFO_FROM_LIBS_RAYON + data.rayonId);
    const gorod = await fetch(MAIN_URL + PORT + API_GET_LICENSE_INFO_FROM_LIBS_GOROD + data.gorodId);
    const oblastName = await oblast.json();
    const rayonName = await rayon.json();
    const gorodName = await gorod.json();
    data["oblId"] = oblastName["name"];
    data["rayonId"] = rayonName["name"];
    data["gorodId"] = gorodName["name2"];
    const licenseAddReq = await fetch(MAIN_URL + PORT + API_GET_LICENSE_ADD_INFO_CARD + id);
    const licenseAdd = await licenseAddReq.json();
    const jsonData = { data: data, licenseAdd: licenseAdd }
    dispatch({
    type: GET_LICENSE_BY_ID,
    data: jsonData
    })
  }
  };
}

export function addNewSpecialMark(newMark) {
  return async dispatch => {
  const response = await fetch(MAIN_URL + PORT + API_ADD_NEW_SPECIAL_MARK + newMark.licenseId, {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMark)
  })
  delete newMark.licenseId;
  newMark.id = await response.json()
  if (response.status === 200) {
    dispatch({
    type: ADD_NEW_SPEC_MARK,
    data: newMark,
    })
  }
  }
}

export function addNewConfMark(newMark, licenseId) {
  return async dispatch => {
  const response = await fetch(MAIN_URL + PORT + API_ADD_NEW_CONF_MARK + licenseId, {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMark)
  })
  newMark.confid = await response.json();
  if (response.status === 200) {
    dispatch({
    type: ADD_NEW_CONF_MARK,
    data: newMark,
    })
  }
  }
}