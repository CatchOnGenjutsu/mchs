import {
  GET_DATA_BY_SEARCH_PARAMS_LICENSE,
  GET_DATA_BY_SEARCH_PARAMS_BOAT,
  GET_DATA_BY_SEARCH_PARAMS_BASES_BUILDING,
  SET_SEARCH_PARAMS_BASES_BUILDING,
  SET_SEARCH_PARAMS_BOATS,
  SET_SEARCH_PARAMS_LICENSE,
  GET_DICTIONARY_GIMS_SECTIONS,
  GET_DICTIONARY_OWNER_TYPE,
  GET_USERS_LIBRARY,
  GET_DICTIONARY_NSI_CHECK_STATUS,
} from './types';
import {
  MAIN_URL,
  PORT,
  API_GET_BOATS_LIST_SEARCH,
  API_GET_LICENSE_LIST_SEARCH,
  API_GET_BASES_BUILDING_LIST_SEARCH,
  API_GET_GIMS_SECTIONS,
  API_GET_OWNER_TYPE,
  API_GET_USERS_LIBRARY,
  API_GET_NSI_CHECK_STATUS,
} from "../constants/constants";

export function setSearchParams(id, value, url) {
  let object = { [`${id}`]: value }
  switch (true) {
  case url.includes('smallboats'): {
    return (
    {
      type: SET_SEARCH_PARAMS_BOATS,
      data: object
    }
    )
  }
  case url.includes('certificates'): {
    return (
    {
      type: SET_SEARCH_PARAMS_LICENSE,
      data: object
    }
    )
  }
  case url.includes('basesbuilding'): {
    return (
    {
      type: SET_SEARCH_PARAMS_BASES_BUILDING,
      data: object
    }
    )
  }
  default: ;
  }

}

export function getDataBoatsBySearchParams(params) {
  console.log("params", params)
  return async dispatch => {
  const response = await fetch(MAIN_URL + PORT + API_GET_BOATS_LIST_SEARCH, {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
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
    data: jsonData
  })
  };
}

export function getDataCertificatesBySearchParams(params) {
  return async dispatch => {
    const response = await fetch(MAIN_URL + PORT + API_GET_LICENSE_LIST_SEARCH, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).catch(err => console.log(err));
    if (response.ok) {
      const data = await response.json();
      for (let item of data) {
      const fio = `${item.surname} ${item.name} ${item.midname}`;
      item["fio"] = fio;
      }
      const jsonData = data;
      dispatch({
      type: GET_DATA_BY_SEARCH_PARAMS_LICENSE,
      data: jsonData
      })
    }
  }
}

export function getDataBasesBuildingBySearchParams(params) {
  return async dispatch => {
  let queryParams = ''
  switch (true) {
    case Boolean(params.startDate) && Boolean(params.endDate):
    queryParams = `?startDate=${params.startDate}&endDate=${params.endDate}`
    break;
    case Boolean(params.startDate):
    queryParams = `?startDate=${params.startDate}`
    break;
    case Boolean(params.endDate):
    queryParams = `?endDate=${params.endDate}`
    break;
    default: queryParams = ''
  }
  const response = await fetch(MAIN_URL + PORT + API_GET_BASES_BUILDING_LIST_SEARCH + queryParams, {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).catch(err => console.log(err));
  if (response.ok) {
    const data = await response.json();
    const jsonData = data;
    dispatch({
    type: GET_DATA_BY_SEARCH_PARAMS_BASES_BUILDING,
    data: jsonData
    })
  }
  }
}

export function getDictionaryGimsSections() {
  return async dispatch => {
  const response = await fetch(MAIN_URL + PORT + API_GET_GIMS_SECTIONS)
  if (response.ok) {
    dispatch({
      type: GET_DICTIONARY_GIMS_SECTIONS,
      data: await response.json()
    })
  }
  }
}

export function getDictionaryOwnerType() {
  return async dispatch => {
  const response = await fetch(MAIN_URL + PORT + API_GET_OWNER_TYPE)
  if (response.ok) {
    dispatch({
      type: GET_DICTIONARY_OWNER_TYPE,
      data: await response.json()
    })
  }
  }
}
export function getDictionaryNsiCheckStatus() {
  return async dispatch => {
    const response = await fetch(MAIN_URL + PORT + API_GET_NSI_CHECK_STATUS)
      if (response.ok) {
        dispatch({
          type: GET_DICTIONARY_NSI_CHECK_STATUS,
          data: await response.json()
        })
    }
  }
}

export function getUsersLibrary() {
  return async dispatch => {
  const response = await fetch(MAIN_URL + PORT + API_GET_USERS_LIBRARY)
  const data = await response.json()
  dispatch({
    type: GET_USERS_LIBRARY,
    data: data,
  })
  }
}


