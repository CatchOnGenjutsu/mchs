import {
  GET_BOAT_CARD_INFO,
  CLEAR_BOAT_CARD_INFO,
  GET_DATA_BY_SEARCH_PARAMS_LICENSE,
  GET_DATA_BY_SEARCH_PARAMS_BOAT,
  GET_LICENSE_BY_ID,
  GET_DATA_BY_SEARCH_PARAMS_BASES_BUILDING,
  SET_SEARCH_PARAMS_BASES_BUILDING,
  SET_SEARCH_PARAMS_BOATS,
  SET_SEARCH_PARAMS_LICENSE,
  GET_DICTIONARY_GIMS_SECTIONS,
  GET_DICTIONARY_OWNER_TYPE,
  DELETE_BASES,
  EDIT_BASES,
  ADD_NEW_BASES,
  ADD_NEW_SPEC_MARK,
  GET_USERS_LIBRARY,
  GET_DICTIONARY_NSI_CHECK_STATUS,
  ADD_NEW_CONF_MARK,
  ADD_NEW_BOAT_INFO,
  EDIT_BOAT_INFO

} from './types';
import {
  MAIN_URL,
  PORT,
  API_GET_BOATS_LIST_SEARCH,
  API_GET_BOAT_INFO_CARD,
  API_GET_BOAT_INFO_SPEC_MARKS,
  API_GET_LICENSE_LIST_SEARCH,
  API_GET_LICENSE_INFO_CARD,

  API_GET_BASES_BUILDING_LIST_SEARCH,
  API_EDIT_BASES_BUILDING,
  API_ADD_BASES_BUILDING,
  API_GET_GIMS_SECTIONS,
  API_GET_OWNER_TYPE,
  API_DELETE_BASES_BUILDING,

  API_GET_LICENSE_ADD_INFO_CARD,
  API_GET_LICENSE_INFO_FROM_LIBS_OBLAST,
  API_GET_LICENSE_INFO_FROM_LIBS_RAYON,
  API_GET_LICENSE_INFO_FROM_LIBS_GOROD,

  API_ADD_NEW_SPECIAL_MARK,
  API_ADD_NEW_CONF_MARK,

  API_GET_USERS_LIBRARY,
  API_GET_NSI_CHECK_STATUS,
  API_ADD_NEW_BOAT_DEAL
} from "../constants/constants";

export function getBoatCardInfo(id) {
  return async dispatch => {
    let jsonData = {};
    if (id !== "") {
      const response = await fetch(MAIN_URL + PORT + API_GET_BOAT_INFO_CARD + String(id));
      jsonData = await response.json();
      const specMarksReq = await fetch(MAIN_URL + PORT + API_GET_BOAT_INFO_SPEC_MARKS + String(id));
      const specMarks = await specMarksReq.json();
      jsonData.specMarks = specMarks;
    }
    dispatch({
      type: GET_BOAT_CARD_INFO,
      data: jsonData
    })
  };
}

export function clearBoatCardInfo() {
  return (
    {
      type: CLEAR_BOAT_CARD_INFO,
      data: {}
    }
  )
}
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
      const owner = `${item.ownerSurname} ${item.ownerName} ${item.ownerMidname}`;
      item["owner"] = owner;
    }
    const jsonData = data;

    dispatch({
      type: GET_DATA_BY_SEARCH_PARAMS_BOAT,
      data: jsonData
    })
  };
}

export function getDataCerticatesBySearchParams(params) {
  console.log("params", params)
  return async dispatch => {
    console.log(dispatch)
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
      console.log(jsonData)
      dispatch({
        type: GET_DATA_BY_SEARCH_PARAMS_LICENSE,
        data: jsonData
      })
    }
  }
}

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

export function editDataBasesBuildings(building) {
  return async dispatch => {
    const response = await fetch(MAIN_URL + PORT + API_EDIT_BASES_BUILDING + `${building.parkId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(building)
    })
    if (response.ok) {
      dispatch({
        type: EDIT_BASES,
        data: building,
      })
    }
  }
}

export function addDataBasesBuildings(building) {
  return async dispatch => {
    const response = await fetch(MAIN_URL + PORT + API_ADD_BASES_BUILDING, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(building)
    })
    if (response.ok) {
      building.parkId = await response.json()
      dispatch({
        type: ADD_NEW_BASES,
        data: building,
      })
    }
  }
}

export function deleteDataBasesBuildings(building) {
  return async dispatch => {
    const response = await fetch(MAIN_URL + PORT + API_DELETE_BASES_BUILDING + `${building.parkId}`, {
      method: "POST"
    })
    if (response.ok) {
      dispatch({
        type: DELETE_BASES,
        data: building.parkId,
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

export function addNewBoatInfo(newMark, boatId, tableType) {
  switch (tableType) {
    case "dealsHistoryTableColumns":
      return async dispatch => {
        const response = await fetch(MAIN_URL + PORT + API_ADD_NEW_BOAT_DEAL + boatId, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newMark)
        })
        const dealId = await response.json();
        newMark.dealId = dealId
        const newData = { newInfo: newMark, tableType: tableType }
        if (response.status === 200) {
          dispatch({
            type: ADD_NEW_BOAT_INFO,
            data: newData
          })
        }
      }
    default:
      break;
  }

}

export function editBoatInfo(newMark, boatId, tableType) {
  switch (tableType) {
    case "dealsHistoryTableColumns":
      return async dispatch => {
        const response = await fetch(MAIN_URL + PORT + API_ADD_NEW_BOAT_DEAL + boatId, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newMark)
        })
        if (response.status === 200) {
          dispatch({
            type: EDIT_BOAT_INFO,
            data: newMark,
          })
        }
      }
    default:
      break;
  }

}

