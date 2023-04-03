import{SET_SORT_STATE_TABLE} from '../types'
const initialState = {
    sortState :[{desc:null, id: null}]
}

export const  tableReducer=(state=initialState,action)=>{
    switch (action.type) {
        case SET_SORT_STATE_TABLE:
            return{
                ...state,
                sortState:action.data
            }
    }
    return state
}