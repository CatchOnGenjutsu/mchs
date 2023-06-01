import {
    GET_DATA_BY_PARAMS_PROVISION_INFORMATION,
    SET_SEARCH_PARAMS_BOATS_REG
} from "../types";


const initialState = {
    data:[],
    searchParams: {
        surname: "",
        name: "",
        midname: "",
        regNum: "",
        unp: "",
        nameLe: "",
        section: 0,
        status: 0,
    },
}

export const provisionInformationReducer = (state = initialState,action)=>{
    switch (action.type) {
        case SET_SEARCH_PARAMS_BOATS_REG:
            return (() => ({
                ...state,
                searchParams: Object.assign(state.searchParams, action.data),
            }))();
        case GET_DATA_BY_PARAMS_PROVISION_INFORMATION:
            return (() => ({
                ...state,
                data: [...action.data],
            }))();
        default:
            return state;
    }
}