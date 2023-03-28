import {
  GET_DICTIONARY_GIMS_SECTIONS,
  GET_DICTIONARY_NSI_CHECK_STATUS,
  GET_DICTIONARY_OWNER_TYPE,
  GET_USERS_LIBRARY,
  GET_ATE_LIBRARY,
  GET_APP_REG_STATUS_LIBRARY
} from "../types";

const initialState = {
  gimsSections: [],
  ownerType: [],
  nsiCheckStatus: [],
  usersLibrary: [],
  ateLibrary: [],
  appRegStatusLibrary: []
}


export const dictionaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DICTIONARY_GIMS_SECTIONS:
      return (() => ({
        ...state,
        gimsSections: action.data.map(section => {
          return {
            id: section.sctId,
            value: section.sctName
          }
        })
      }))();
    case GET_DICTIONARY_OWNER_TYPE:
      return (() => ({
        ...state,
        ownerType: action.data.map(owner => {
          return {
            id: owner.ptcode,
            value: owner.ptName
          }
        })
      }))();
    case GET_DICTIONARY_NSI_CHECK_STATUS:
      return (()=>({
        ...state,
        nsiCheckStatus: action.data.map(status=>{
          return {
            id:status.statusId,
            value:status.statusName
          }
        })
      }))();
    case GET_USERS_LIBRARY:
      return (() => ({
        ...state,
        usersLibrary: [
          ...action.data
        ],
      }))();
    case GET_ATE_LIBRARY:
      return (() => ({
        ...state,
        ateLibrary: [
          ...action.data
        ],
      }))();
    case GET_APP_REG_STATUS_LIBRARY:
      return (() => ({
        ...state,
        appRegStatusLibrary: [
          ...action.data
        ],
      }))();
  }
  return state
}