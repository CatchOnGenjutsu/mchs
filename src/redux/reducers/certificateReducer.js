import {
    GET_DATA_BY_SEARCH_PARAMS_LICENSE,
    GET_LICENSE_BY_ID,
    SET_SEARCH_PARAMS_LICENSE,
    APP_NEW_SPEC_MARK,
    ADD_NEW_CONF_MARK,
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
        isActive: 1
    }
}

export const certificateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_PARAMS_LICENSE:
            sessionStorage.setItem("searchParams", JSON.stringify(Object.assign(state.searchParams, action.data)))
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
            const markIndex = state.licenseSpecmarksList.findIndex((item) => item.id === action.data.id);
            if (markIndex >= 0) {
                return (() => ({
                    ...state,
                    licenseSpecmarksList: [
                        ...state.licenseSpecmarksList.map(item => item.id === action.data.id ? action.data : item)
                    ],
                }))();
            } else {
                return (() => ({
                    ...state,
                    licenseSpecmarksList: [
                        ...state.licenseSpecmarksList, action.data
                    ],
                }))();
            }
        case ADD_NEW_CONF_MARK:
            return (() => ({
                ...state,
                licenseConfList: [
                    ...state.licenseConfList, action.data
                ],
            }))();
        default:
            return state;
    }
}