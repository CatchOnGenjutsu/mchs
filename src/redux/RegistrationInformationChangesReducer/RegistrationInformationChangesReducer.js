import {
    GET_REG_INFORM_CHANGES,
    SET_SEARCH_PARAMS_REG_INFORM_CHANGES,
    SET_SEARCH_PARAMS_BOATS_ADMIN_PROC,
    GET_REG_INFORM_CHANGES_BOAT_CARDS
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
    },
    searchParamsBoatCards:{
        surname: '',
        name: '',
        midname: '',
        name_le:'',
        reg_num: '',
        boatVin:'',
        persNum:'',
        tiketNum:'',
        leUnp:''
    },
    dataBoatCards:[]
}

export const registrationInformationChangesReducer = (state=initialState,action)=>{
    switch (action.type) {
        case SET_SEARCH_PARAMS_REG_INFORM_CHANGES:
            return(()=>({
                ...state,
                searchParams: Object.assign(state.searchParams, action.data)
            }))()
        case SET_SEARCH_PARAMS_BOATS_ADMIN_PROC:
            return(()=>({
                ...state,
                searchParamsBoatCards: Object.assign(state.searchParamsBoatCard, action.data)
            }))()
        case GET_REG_INFORM_CHANGES:
            return (()=>({
                ...state,
                data: action.data
            }))()
        case GET_REG_INFORM_CHANGES_BOAT_CARDS:
            return (()=>({
                ...state,
                dataBoatCards:action.data
            }))()
        default: return state;
    }
}