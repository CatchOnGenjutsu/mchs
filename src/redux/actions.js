import {
  SHOW_HIDDEN_MENU,
  COLOR_MENU_ITEM,
  GET_BOATS_CARDS_LIST,
  GET_BOAT_CARD_INFO,
  CLEAR_BOAT_CARD_INFO
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
    // const jsonData = await response.json();
    // const response = await fetch("http://localhost:3000/data")
    const data = await response.json();
    for (let item of data) {
      const owner = `${item.agent.personSurname} ${item.agent.personName} ${item.agent.personMidname}`;
      item["boatType"] = item["boatType"]["btname"]
      item["owner"] = owner;
    }
    const jsonData = data;

    dispatch({
      type: GET_BOATS_CARDS_LIST,
      data: jsonData
    })
  };
}

export function getBoatCardInfo(id) {
  return async dispatch => {
    let jsonData = {};
    if (id !== "") {
      const response = await fetch(`http://192.168.70.81:8080/boats/getBoatCard/${String(id)}`);
      jsonData = await response.json();
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