import {
    GET_DATA_BY_SEARCH_PARAMS_LICENSE,
    GET_LICENSE_BY_ID,
    SET_SEARCH_PARAMS_LICENSE,
    APP_NEW_SPEC_MARK,
    ADD_NEW_CONF_MARK,
    GET_USERS_LIBRARY
} from "../types";

const initialState = {
    usersLibrary: [],
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
    console.log("licenseSpecmarksList state >>>", state.licenseSpecmarksList)
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
        case APP_NEW_SPEC_MARK:
            return (() => ({
                ...state,
                licenseSpecmarksList: [
                    ...state.licenseSpecmarksList, action.data
                ],
            }))();
        case ADD_NEW_CONF_MARK:
            return (() => ({
                ...state,
                licenseConfList: [
                    ...state.licenseConfList, action.data
                ],
            }))();
        case GET_USERS_LIBRARY:
            return (() => ({
                ...state,
                usersLibrary: [
                    ...action.data
                ],
            }))();
        default:
            return state;
    }
}