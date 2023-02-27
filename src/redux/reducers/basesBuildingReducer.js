import {
    GET_DATA_BY_SEARCH_PARAMS_BASES_BUILDING,
    SET_SEARCH_PARAMS_BASES_BUILDING
} from "../types";

const initialState = {
    data:[],
    searchParams :{
        ownerCommonName:'',
        location:'',
        statusName:'',
        startDate:'',
        endDate:''
    }
}

export const basesBuildingReducer = (state=initialState,action)=>{
        switch (action.type) {
            case SET_SEARCH_PARAMS_BASES_BUILDING:{
                return (() => ({
                    ...state,
                    searchParams: Object.assign(state.searchParams, action.data)
                }))();
                break;
            }
            case GET_DATA_BY_SEARCH_PARAMS_BASES_BUILDING:
                return (() => ({
                    ...state,
                    data: [
                        ...action.data
                    ],
                }))();

            default: return state;
        }
}