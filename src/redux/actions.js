import {
  SHOW_HIDDEN_MENU,
  COLOR_MENU_ITEM,
  GET_BOATS_CARDS_LIST
} from './types';


export function showHiddenMenu(id) {
  return {
    type: SHOW_HIDDEN_MENU,
    data: { id },
  };
}

export function colorMenuItem(id) {
  return {
    type: COLOR_MENU_ITEM,
    data: { id },
  };
}

export function getBoatsCardsList() {
  return async dispatch => {
    const response = await fetch("http://192.168.70.81:8080/boats/boatCards");
    const jsonData = await response.json();
    dispatch({
      type: GET_BOATS_CARDS_LIST,
      data: jsonData
    })
  };
}