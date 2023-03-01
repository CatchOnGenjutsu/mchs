import {
    GET_DATA_BY_SEARCH_PARAMS_LICENSE,
    GET_LICENSE_BY_ID,
    SET_SEARCH_PARAMS_LICENSE
} from "../types";

const initialState = {
    data: [],
    licenseInfo: {},
    licenseSpecmarksList: [],
    licenseConfList: [],
    searchParams: {
        name: '',
        surname: '',
        midname: '',
        birthDate: '',
        licenseNum: '',
        persNum: '',
        statusCard: 'Активная'
    }
}

export const certificateReducer = (state = initialState, action) => {
    console.log("action data >>>", action.data)
    switch (action.type) {
        case SET_SEARCH_PARAMS_LICENSE:
            return (() => ({
                ...state,
                searchParams: Object.assign(state.searchParams, action.data)
            }))()
        case GET_DATA_BY_SEARCH_PARAMS_LICENSE:
            return (() => ({
                ...state,
                data: [
                    ...action.data
                ],
            }))();
        case GET_LICENSE_BY_ID:
            return (() => ({
                ...state,
                licenseInfo: Object.assign({}, action.data.data),
                licenseSpecmarksList: [...action.data.licenseAdd.boatDrivingLicenseSpecmarksList],
                licenseConfList: [...action.data.licenseAdd.boatDrivingLicenseConfList]
            }))()
        default:
            return state;
    }
}