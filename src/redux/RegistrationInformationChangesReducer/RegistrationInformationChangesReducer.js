import {
    GET_REG_INFORM_CHANGES,
    SET_SEARCH_PARAMS_REG_INFORM_CHANGES
} from "../types"

const initialState = {
    data:[],
    searchParams: {
        surname: '',
        name: '',
        midname: '',
        regNum: '',
        unp: '',
        nameLe: '',
        rayonId: 0,
        status: 0
    }
}

export const registrationInformationChangesReducer = (state=initialState,action)=>{
    switch (action.type) {
        case SET_SEARCH_PARAMS_REG_INFORM_CHANGES:
            return(()=>({
                ...state,
                searchParams: Object.assign(state.searchParams, action.data)
            }))()
        case GET_REG_INFORM_CHANGES:
            return (()=>({
                ...state,
                data: action.data
            }))()
        default: return state;
    }
}