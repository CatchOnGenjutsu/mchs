import {
  DELETE_BASES,
  EDIT_BASES,
  ADD_NEW_BASES,
} from '../types';
import {
  MAIN_URL,
  PORT,
  API_EDIT_BASES_BUILDING,
  API_ADD_BASES_BUILDING,
  API_DELETE_BASES_BUILDING,
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