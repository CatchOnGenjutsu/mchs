import { MAIN_URL, PORT, API_DUP_SHIP_TICKET_DATA } from "../../constants/constants";
import { GET_DUP_SHIP_TICKET_INFO } from "../types";

export function getDataDupShipsTicketBySearchParams(params) {
  return async (dispatch) => {
    const response = await fetch(MAIN_URL + PORT + API_DUP_SHIP_TICKET_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).catch((err) => console.log(err));
    if (response.ok) {
      const data = await response.json();
      // for (let item of data) {
      //   item["fio"] = `${item.ownerMidname ? item.ownerMidname : ""} ${
      //     item.ownerName ? item.ownerName : ""
      //   } ${item.ownerSurname ? item.ownerSurname : ""}`;
      // }
      dispatch({
        type: GET_DUP_SHIP_TICKET_INFO,
        data: data,
      });
    }
  };
}

// export function getDataDupShipsTicketBoatCardsBySearchParams(params) {
//   return async (dispatch) => {
//     const response = await fetch(MAIN_URL + PORT + API_DUP_SHIP_TICKET_BOAT_CARD, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(params),
//     }).catch((err) => console.log(err));
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       // for (let item of data) {
//       //   item["fio"] = `${item.ownerMidname ? item.ownerMidname : ""} ${
//       //     item.ownerName ? item.ownerName : ""
//       //   } ${item.ownerSurname ? item.ownerSurname : ""}`;
//       // }
//       dispatch({
//         type: GET_DUP_SHIP_TICKET_BOAT_CARDS,
//         data: data,
//       });
//     }
//   };
// }
