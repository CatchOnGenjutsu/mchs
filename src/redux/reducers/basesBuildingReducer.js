import {
    EDIT_BASES,
    ADD_NEW_BASES,
    GET_DATA_BY_SEARCH_PARAMS_BASES_BUILDING,
    SET_SEARCH_PARAMS_BASES_BUILDING, DELETE_BASES
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
            case EDIT_BASES:
                return (() => ({
                    ...state,
                    data: [
                        ...state.data.map(el=>{
                            if(el.parkId==action.data.parkId){
                                el=action.data
                                return el
                            }else return el
                        })
                    ],
                }))();
            case ADD_NEW_BASES:
                return (() => ({
                    ...state,
                    data: [
                        ...state.data,action.data
                    ],
                }))();
            case DELETE_BASES:
                return (() => {
                        state.data.splice(state.data.findIndex(el=>el.parkId==action.data),1);
                        return {
                            ...state,
                            data: [
                                ...state.data
                            ],
                        }
                })();
            default: return state;
        }
}