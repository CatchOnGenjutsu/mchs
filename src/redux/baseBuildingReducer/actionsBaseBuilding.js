import {
  EDIT_BASES,
  ADD_NEW_BASES,
} from '../types';
import {
  MAIN_URL,
  PORT,
  API_EDIT_BASES_BUILDING,
  API_ADD_BASES_BUILDING,
} from "../../constants/constants";

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
  console.log(building)
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

