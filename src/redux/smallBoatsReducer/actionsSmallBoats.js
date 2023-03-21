import {
  GET_BOAT_CARD_INFO,
  CLEAR_BOAT_CARD_INFO,
  GET_DATA_BY_SEARCH_PARAMS_BOAT,
  ADD_NEW_BOAT_INFO,
  EDIT_BOAT_INFO

} from '../types';
import {
  MAIN_URL,
  PORT,
  API_GET_BOATS_LIST_SEARCH,
  API_GET_BOAT_INFO_CARD,
  API_GET_BOAT_INFO_SPEC_MARKS,
  API_ADD_NEW_BOAT_DEAL,
  API_ADD_NEW_BOAT_SPEC_MARK,
  API_EDIT_BOAT_SPEC_MARK,
  API_GET_BOAT_INFO_ARRESTS,
  API_ADD_BOAT_INFO_ARRESTS,
  API_ADD_BOAT_INFO_DOCS,
  API_DELETE_BOAT_INFO_DOCS,
} from "../../constants/constants";

export function getBoatCardInfo(id) {
  return async dispatch => {
  let jsonData = {};
  if (id !== "") {
    const response = await fetch(MAIN_URL + PORT + API_GET_BOAT_INFO_CARD + String(id));
    jsonData = await response.json();
    const specMarksReq = await fetch(MAIN_URL + PORT + API_GET_BOAT_INFO_SPEC_MARKS + String(id));
    const specMarks = await specMarksReq.json();
    const boatArrestsReq = await fetch(MAIN_URL + PORT + API_GET_BOAT_INFO_ARRESTS + String(id));
    const boatArrests = await boatArrestsReq.json();
    jsonData.specMarks = specMarks;
    jsonData.boatArrests = boatArrests.reverse();
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

export function addNewBoatInfo(data, boatId, tableType, fileType) {
  switch (tableType) {
  case "dealsHistoryTableColumns":
    return async dispatch => {
      const response = await fetch(MAIN_URL + PORT + API_ADD_NEW_BOAT_DEAL + boatId, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const dealId = await response.json();
      data.dealId = dealId
      const newData = { newInfo: data, tableType: tableType }
      if (response.status === 200) {
        dispatch({
        type: ADD_NEW_BOAT_INFO,
        data: newData
        })
      }
    }
  case "specialMarksTableColumns":
    // Тестовое значение, поменять при добавлении логики логирования и введения разделения на пользователей
    const userId = 2;
    // Тестовое значение, поменять при добавлении логики логирования и введения разделения на пользователей
    return async dispatch => {
      const response = await fetch(MAIN_URL + PORT + API_ADD_NEW_BOAT_SPEC_MARK + boatId + "/" + userId, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const bsmId = await response.json();
      data.bsmId = bsmId;
      const newData = { newInfo: data, tableType: tableType }
      if (response.status === 200) {
        dispatch({
        type: ADD_NEW_BOAT_INFO,
        data: newData
        })
      }
    }

  case "boatArrestsTableColumns":
    return async dispatch => {
      const response = await fetch(MAIN_URL + PORT + API_ADD_BOAT_INFO_ARRESTS + boatId, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const arrId = await response.json();
      data.arrId = arrId
      const newData = { newInfo: data, tableType: tableType }
      if (response.status === 200) {
        dispatch({
        type: ADD_NEW_BOAT_INFO,
        data: newData
        })
      }
    }
  case "documentsTableColumns":
    return async dispatch => {
      const response = await fetch(MAIN_URL + PORT + API_ADD_BOAT_INFO_DOCS + `?cardid=${boatId}&signature=${fileType}`, {
        method: "POST",
        body: data
      })
      const newFile = await response.json();
      const newData = { newInfo: newFile, tableType: tableType, fileType: fileType }
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

export function editBoatInfo(data, boatId, tableType) {
  switch (tableType) {
    case "dealsHistoryTableColumns":
      return async dispatch => {
        const response = await fetch(MAIN_URL + PORT + API_ADD_NEW_BOAT_DEAL + boatId, {
          method: "POST",
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const newData = { newInfo: data, tableType: tableType }
        if (response.status === 200) {
          dispatch({
            type: EDIT_BOAT_INFO,
            data: newData,
          })
        }
      }
    case "specialMarksTableColumns":
      // Тестовое значение, поменять при добавлении логики логирования и введения разделения на пользователей
      const userId = 2;
      const bsmId = data.bsmId
      delete data.bsmId
      delete data.cardid
      delete data.editor
      // Тестовое значение, поменять при добавлении логики логирования и введения разделения на пользователей
      return async dispatch => {
      const response = await fetch(MAIN_URL + PORT + API_EDIT_BOAT_SPEC_MARK + bsmId + "/" + boatId + "/" + userId, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const newData = { newInfo: await response.json(), tableType: tableType }
      console.log("newData action >!>!>", newData)
      if (response.status === 200) {
        dispatch({
        type: EDIT_BOAT_INFO,
        data: newData,
        })
      }
    }
    case "boatArrestsTableColumns":
      return async dispatch => {
        const response = await fetch(MAIN_URL + PORT + API_ADD_BOAT_INFO_ARRESTS + boatId, {
          method: "POST",
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const newData = { newInfo: data, tableType: tableType }
        if (response.status === 200) {
          dispatch({
            type: EDIT_BOAT_INFO,
            data: newData,
          })
        }
      }
    
    default:
      break;
  }

}

export function deleteBoatInfo(cardid, signature, fileName, tableType){
  return async dispatch => {
    const response = await fetch(MAIN_URL + PORT + API_DELETE_BOAT_INFO_DOCS + cardid + `/${signature}/${fileName}`);
    const newData = {newInfo: await response.json(), tableType: tableType}
      dispatch({
        type: EDIT_BOAT_INFO,
        data: newData
      })
    
  }
}