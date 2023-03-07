import {GET_DICTIONARY_GIMS_SECTIONS, GET_DICTIONARY_OWNER_TYPE} from "../types";

const initialState ={
    gimsSections:[],
    ownerType:[]
}


export const dictionaryReducer = (state=initialState,action)=>{
    switch (action.type) {
        case GET_DICTIONARY_GIMS_SECTIONS:
            return (()=>({
                ...state,
                gimsSections:action.data.map(section=>{
                    return{
                        id:section.sctId,
                        value:section.sctName
                    }
                })
            }))()
        case GET_DICTIONARY_OWNER_TYPE:
            return (()=>({
                ...state,
                ownerType:action.data.map(owner=>{
                    return{
                        id:owner.ptcode,
                        value:owner.ptName
                    }
                })
            }))()


    }
    return state
}