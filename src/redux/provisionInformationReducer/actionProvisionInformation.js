import {GET_DATA_BY_PARAMS_PROVISION_INFORMATION} from "../types"
import {
    API_GET_DATA_PROVISION_INFORMATION,
    MAIN_URL,
    PORT,
} from "../../constants/constants";


export const getDataProvisionInformationBySearchParams = (params)=>{
    return async  (dispatch) =>{
        const response = await fetch(MAIN_URL + PORT + API_GET_DATA_PROVISION_INFORMATION, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        }).catch((err) => console.log(err));
        if (response.ok) {
            const data = await response.json();
            dispatch({
                type: GET_DATA_BY_PARAMS_PROVISION_INFORMATION,
                data: data,
            });
        }
    }
}