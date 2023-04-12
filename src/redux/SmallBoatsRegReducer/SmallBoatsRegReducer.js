import {
  SET_SEARCH_PARAMS_BOATS_REG,
  GET_DATA_BY_SEARCH_PARAMS_BOATS_REG,
  GET_BOATS_REG_INFO
} from "../types"

const initialState = {
  data: [],
  appRegData: {},
  searchParams: {
    surname: '',
    name: '',
    midname: '',
    regNum: '',
    unp: '',
    nameLe: '',
    section: 0,
    status: 0
  }
}

export const smallBoatsRegReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_PARAMS_BOATS_REG:
      // sessionStorage.setItem("searchParams", JSON.stringify(Object.assign(state.searchParams, action.data)))
      return (() => ({
        ...state,
        searchParams: Object.assign(state.searchParams, action.data)
      }))()
    case GET_DATA_BY_SEARCH_PARAMS_BOATS_REG:
      return (() => ({
        ...state,
        data: [
          ...action.data
        ],
      }))();
    case GET_BOATS_REG_INFO:
      return (() => ({
        ...state,
        appRegData: Object.assign({}, action.data.data),
      }))()
    // case GET_LICENSE_BY_ID:
    //   return (() => ({
    //     ...state,
    //     licenseInfo: Object.assign({}, action.data.data),
    //     licenseSpecmarksList: [...
    //       action.data.licenseAdd.boatDrivingLicenseSpecmarksList.reverse()],
    //     licenseConfList: [...action.data.licenseAdd.boatDrivingLicenseConfList.sort((a, b) => b.confDate - a.confDate)]
    //   }))()
    // case ADD_NEW_SPEC_MARK:
    //   const markIndex = state.licenseSpecmarksList.findIndex((item) => item.id === action.data.id);
    //   if (markIndex >= 0) {
    //     return (() => ({
    //       ...state,
    //       licenseSpecmarksList: [
    //         ...state.licenseSpecmarksList.map(item => item.id === action.data.id ? action.data : item)
    //       ],
    //     }))();
    //   } else {
    //     return (() => ({
    //       ...state,
    //       licenseSpecmarksList: [
    //         action.data, ...state.licenseSpecmarksList
    //       ],
    //     }))();
    //   }
    // case ADD_NEW_CONF_MARK:
    //   return (() => ({
    //     ...state,
    //     licenseConfList: [
    //       action.data, ...state.licenseConfList
    //     ],
    //   }))();
    default:
      return state;
  }
}