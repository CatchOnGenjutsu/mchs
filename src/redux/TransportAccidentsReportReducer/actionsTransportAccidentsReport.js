import { ADD_NEW_CULPRIT, ADD_NEW_INJURED, DELETE_NEW_NOTE_ACCIDENT } from "../types";

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
