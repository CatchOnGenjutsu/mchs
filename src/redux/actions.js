import store from "./store";
import {
  GET_LOGIN_TOKEN,
  GET_DATA_BY_SEARCH_PARAMS_LICENSE,
  GET_DATA_BY_SEARCH_PARAMS_BOAT,
  GET_DATA_BY_SEARCH_PARAMS_BASES_BUILDING,
  SET_SEARCH_PARAMS_BASES_BUILDING,
  SET_SEARCH_PARAMS_BOATS,
  SET_SEARCH_PARAMS_LICENSE,
  SET_SEARCH_PARAMS_BOATS_REG,
  SET_SEARCH_PARAMS_REG_INFORM_CHANGES,
  SET_SEARCH_PARAMS_BOATS_ADMIN_PROC,
  GET_DICTIONARY_GIMS_SECTIONS,
  GET_DICTIONARY_OWNER_TYPE,
  GET_USERS_LIBRARY,
  GET_DICTIONARY_NSI_CHECK_STATUS,
  GET_ATE_LIBRARY,
  GET_APP_REG_STATUS_LIBRARY,
  SET_SORT_STATE_TABLE,
  GET_DATA_BY_SEARCH_PARAMS_BOATS_REG,
  GET_DICTIONARY_RAYON_FOR_OBL,
  SET_SEARCH_PARAMS_DUP_SHIP_TICKET,
  SET_SEARCH_PARAMS_BOATS_DUP_SHIP_TICKET,
  SET_SEARCH_PARAMS_PROVISION_INFORMATION,
  SET_SEARCH_PARAMS_SHIPS_TICKET,
  SET_SEARCH_PARAMS_TRANSPORT_ACCIDENTS,
  GET_DATA_BY_SEARCH_PARAMS_TRANSPORT_ACCIDENTS,
  SET_SEARCH_PARAMS_TECH_EXAM,
  SET_SEARCH_PARAMS_BOATS_TECH_EXAM,
} from "./types";
import {
  MAIN_URL,
  PORT,
  PORT_FOR_REPORT,
  API_LOGIN,
  API_GET_BOATS_LIST_SEARCH,
  API_GET_LICENSE_LIST_SEARCH,
  API_GET_BASES_BUILDING_LIST_SEARCH,
  API_GET_GIMS_SECTIONS,
  API_GET_OWNER_TYPE,
  API_GET_USERS_LIBRARY,
  API_GET_ATE_LIBRARY,
  API_GET_APP_REG_STATUS_LIBRARY,
  API_GET_BOATS_REG_LIST_SEARCH,
  API_REG_INFORM_CHANGE,
  API_GET_DICTIONARY_RAYON_FOR_OBL,
  API_GET_TRANSPORT_ACCIDENT_LIST_SEARCH,
} from "../constants/constants";

export function getLoginToken(data) {
  return async (dispatch) => {
    const request = await fetch("http://192.168.70.81:8081/api/v1/auth/authenticate", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    });
    const token = await request.json();
    console.log(token);
    if (!!token) {
      document.cookie = `token=${token.token}`;
      sessionStorage.setItem("token", JSON.stringify(token.token));
      dispatch({
        type: GET_LOGIN_TOKEN,
        data: token,
      });
    }
    // else {

    // }
  };
}

export function setSortState(data) {
  return {
    type: SET_SORT_STATE_TABLE,
    data: data,
  };
}
export function setSearchParams(id, value, url) {
  url = new URL(url).pathname.slice(1);
  // console.log(url);
  let object = { [`${id}`]: value };
  switch (true) {
    case url.includes("smallboatsreg"): {
      return {
        type: SET_SEARCH_PARAMS_BOATS_REG,
        data: object,
      };
    }
    case url === "reginformationchanges": {
      return {
        type: SET_SEARCH_PARAMS_REG_INFORM_CHANGES,
        data: object,
      };
    }
    case url === "reginformationchanges/searchboatcard" || url === "dupshipsticket/searchboatcard": {
      return {
        type: SET_SEARCH_PARAMS_BOATS_ADMIN_PROC,
        data: object,
      };
    }
    case url === "provisioninformation": {
      return {
        type: SET_SEARCH_PARAMS_PROVISION_INFORMATION,
        data: object,
      };
    }
    case url === "dupshipsticket": {
      return {
        type: SET_SEARCH_PARAMS_DUP_SHIP_TICKET,
        data: object,
      };
    }
    case url === "shipsticket": {
      return {
        type: SET_SEARCH_PARAMS_SHIPS_TICKET,
        data: object,
      };
    }
    case url === "transportaccidents": {
      return {
        type: SET_SEARCH_PARAMS_TRANSPORT_ACCIDENTS,
        data: object,
      };
    }
    // case url === "dupshipsticket/searchboatcard": {
    //   console.log(2);
    //   return {
    //     type: SET_SEARCH_PARAMS_BOATS_DUP_SHIP_TICKET,
    //     data: object,
    //   };
    // }
    case url.includes("smallboats"): {
      return {
        type: SET_SEARCH_PARAMS_BOATS,
        data: object,
      };
    }
    case url.includes("certificates"): {
      return {
        type: SET_SEARCH_PARAMS_LICENSE,
        data: object,
      };
    }
    case url.includes("basesbuilding"): {
      return {
        type: SET_SEARCH_PARAMS_BASES_BUILDING,
        data: object,
      };
    }
    case url === "techexamination": {
      return {
        type: SET_SEARCH_PARAMS_TECH_EXAM,
        data: object,
      };
    }
    case url === "techexamination/searchboatcard": {
      return {
        type: SET_SEARCH_PARAMS_BOATS_TECH_EXAM,
        data: object,
      };
    }

    default:
  }
}

export function getDataBoatsBySearchParams(params) {
  console.log("params", params);
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_GET_BOATS_LIST_SEARCH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await response.json();
    for (let item of data) {
      if (item.ownerSurname && item.ownerName && item.ownerMidname) {
        const owner = `${item.ownerSurname} ${item.ownerName} ${item.ownerMidname}`;
        item["owner"] = owner;
      }
    }
    const jsonData = data;

    dispatch({
      type: GET_DATA_BY_SEARCH_PARAMS_BOAT,
      data: jsonData,
    });
  };
}

export function getDataCertificatesBySearchParams(params) {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_GET_LICENSE_LIST_SEARCH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).catch((err) => console.log(err));
    if (response.ok) {
      const data = await response.json();
      for (let item of data) {
        const fio = `${item.surname} ${item.name} ${item.midname}`;
        item["fio"] = fio;
        item.birthDate = !!item.birthDate ? new Date(item.birthDate).toLocaleDateString() : "";
        item.licenseDate = !!item.licenseDate ? new Date(item.licenseDate).toLocaleDateString() : "";
        item.licenseDateEnd = !!item.licenseDateEnd ? new Date(item.licenseDateEnd).toLocaleDateString() : "";
      }
      const jsonData = data;
      dispatch({
        type: GET_DATA_BY_SEARCH_PARAMS_LICENSE,
        data: jsonData,
      });
    }
  };
}

export function getDataBasesBuildingBySearchParams(params) {
  return async (dispatch) => {
    let queryParams = "";
    switch (true) {
      case Boolean(params.startDate) && Boolean(params.endDate):
        queryParams = `?startDate=${params.startDate}&endDate=${params.endDate}`;
        break;
      case Boolean(params.startDate):
        queryParams = `?startDate=${params.startDate}`;
        break;
      case Boolean(params.endDate):
        queryParams = `?endDate=${params.endDate}`;
        break;
      default:
        queryParams = "";
    }
    const response = await fetch(MAIN_URL + PORT + API_GET_BASES_BUILDING_LIST_SEARCH + queryParams, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).catch((err) => console.log(err));
    if (response.ok) {
      const data = await response.json();
      const jsonData = data;
      dispatch({
        type: GET_DATA_BY_SEARCH_PARAMS_BASES_BUILDING,
        data: jsonData,
      });
    }
  };
}

export function getDataBoatsRegBySearchParams(params) {
  const state = store.getState();
  const ateLibrary = state.dictionaryReducer.ateLibrary;
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_GET_BOATS_REG_LIST_SEARCH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).catch((err) => console.log(err));
    if (response.ok) {
      const data = await response.json();

      for (let item of data) {
        item["fio"] = `${item.surname ? item.surname : ""} ${item.name ? item.name : ""} ${
          item.midname ? item.midname : ""
        }`;
        if (item.rayonId) {
          item["rayonName"] = ateLibrary.find((elem) => elem.uiddistrict === item.rayonId).namedistrictRu;
        } else {
          item["rayonName"] = "";
        }
        if (item.operDate) {
          item.operDate = item.operDate.split("-").reverse().join(".");
        }
      }
      dispatch({
        type: GET_DATA_BY_SEARCH_PARAMS_BOATS_REG,
        data: data,
      });
    }
  };
}

export function getDictionaryGimsSections() {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_GET_GIMS_SECTIONS);
    if (response.ok) {
      dispatch({
        type: GET_DICTIONARY_GIMS_SECTIONS,
        data: await response.json(),
      });
    }
  };
}

export function getDictionaryOwnerType() {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_GET_OWNER_TYPE);
    if (response.ok) {
      dispatch({
        type: GET_DICTIONARY_OWNER_TYPE,
        data: await response.json(),
      });
    }
  };
}
export function getDictionaryNsiCheckStatus() {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_GET_APP_REG_STATUS_LIBRARY);
    if (response.ok) {
      dispatch({
        type: GET_DICTIONARY_NSI_CHECK_STATUS,
        data: await response.json(),
      });
    }
  };
}

export function getUsersLibrary() {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_GET_USERS_LIBRARY);
    const data = await response.json();
    dispatch({
      type: GET_USERS_LIBRARY,
      data: data,
    });
  };
}

export function getAteLibrary() {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_GET_ATE_LIBRARY);
    const data = await response.json();
    dispatch({
      type: GET_ATE_LIBRARY,
      data: data,
    });
  };
}

export function getApplicationRegLibrary() {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_GET_APP_REG_STATUS_LIBRARY);
    const data = await response.json();
    dispatch({
      type: GET_APP_REG_STATUS_LIBRARY,
      data: data,
    });
  };
}

// export function getDictionaryRayonForObl() {
//   return async dispatch => {
//     const response = awa
//   }
// }

export function getDataTransportAccidentBySearchParams(params) {
  const queryParams = Object.entries(params)
    .map((item) => {
      if (item[1] !== "" && item[1] !== 0) {
        return `${item[0]}=${item[1]}`;
      }
    })
    .filter((item) => item !== undefined)
    .join("&");
  return async (dispatch) => {
    const request = await fetch(
      MAIN_URL + PORT_FOR_REPORT + API_GET_TRANSPORT_ACCIDENT_LIST_SEARCH + "?" + queryParams,
    );
    const response = await request.json();
    for (let item of response) {
      if (!!item.section && item.section !== null) {
        item["sctName"] = item.section.sctName;
      }
      if (!!item.incidentDate && item.incidentDate !== null) {
        item["incidentDate"] = item.incidentDate.slice(0, 10).split("-").reverse().join(".");
      }

      if (item.ownerSurname && item.ownerName && item.ownerMidname) {
        const owner = `${item.ownerSurname} ${item.ownerName} ${item.ownerMidname}`;
        item["owner"] = owner;
      }
      if (!!item.incidentType && item.incidentType !== null) {
        item["incidentType"] = item.incidentType === 1 ? "Авария" : "Инцидент";
      }
      item["deadTotal"] = item.deadAdult + item.deadChildren;
    }
    dispatch({
      type: GET_DATA_BY_SEARCH_PARAMS_TRANSPORT_ACCIDENTS,
      data: response,
    });
  };
}
