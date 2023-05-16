// import {
//   ADD_NEW_ENGINE_CHECK,
//   ADD_NEW_DEAL,
//   ADD_NEW_SPEC_MARK_APP,
//   DELETE_NEW_NOTE_APP,
//   ADD_NEW_STATEMENT_DATA,
//   SET_DATA_FOR_STATEMENT_TABLES,
//   GET_BOATS_REG_INFO,
//   CLEAR_NEW_STATEMENT,
//   GET_BOATS_DECISION_INFO,
//   CLEAR_DECISION_DATA,
// } from "../types";
// import { v4 as uuidv4 } from "uuid";

// const initialState = {
//   personType: null,
//   boatCardAppEngList: [],
//   boatCardAppSpecMarkList: [],
//   boatCardAppDealsList: [],
//   appRegData: {},
//   appDecisionData: {},
//   newStatement: {},
// };

// export const nsiReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_BOATS_REG_INFO:
//       return (() => ({
//         ...state,
//         newStatement: Object.assign({}, action.data.dataApp),
//         personType: action.data.dataApp.personType.ptcode,
//         boatCardAppEngList: [...action.data.dataAppEng],
//         boatCardAppDealsList: [...action.data.dataAppDeals],
//         boatCardAppSpecMarkList: [...action.data.dataAppSpecMarks],
//       }))();
//     case GET_BOATS_DECISION_INFO:
//       return (() => ({
//         ...state,
//         appDecisionData: action.data.data,
//         boatCardAppEngList: [...action.data.dataAppEng],
//         boatCardAppDealsList: [...action.data.dataAppDeals],
//         boatCardAppSpecMarkList: [...action.data.dataAppSpecMarks],
//       }))();
//     case ADD_NEW_ENGINE_CHECK:
//       return (() => ({
//         ...state,
//         boatCardAppEngList: [action.data, ...state.boatCardAppEngList],
//       }))();
//     default:
//       return state;
//   }
// };