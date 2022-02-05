import {
    ADDRESS_ACTIONS
} from './Actions';

// INITIALIZE STATE
const initialState = {
    cities: null,
    districts: [],
    districtsVersion: 0,
    neighborhoods: [],
    neighborhoodsVersion: 0
};


export const AddressReducer = (state = initialState, action) => {
    if ((action.type).startsWith("ADDRESS") && (action.type).endsWith("_REJECTED")) {
        return state;
    } else {
        switch (action.type) {
            case ADDRESS_ACTIONS.ADDRESS_GET_CITIES + "_FULFILLED":
                return {
                    ...state,
                    cities: action.payload.data.value
                };

            case ADDRESS_ACTIONS.ADDRESS_GET_DISTRICTS_OF_CITY:
                let districts = state.districts;
                districts[action.payload.cityCode] = action.payload.districts;
                let districtsVersion = state.districtsVersion;
                districtsVersion = districtsVersion + 1;
                return {
                    ...state,
                    districts: districts,
                    districtsVersion: districtsVersion
                };
            case ADDRESS_ACTIONS.ADDRESS_GET_NEIGHBORHOODS_OF_DISTRICT:
                let neighborhoods = state.neighborhoods;
                neighborhoods[action.payload.districtCode] = action.payload.neighborhoods;
                let neighborhoodsVersion = state.neighborhoodsVersion;
                neighborhoodsVersion = neighborhoodsVersion + 1;
                return {
                    ...state,
                    neighborhoods: neighborhoods,
                    neighborhoodsVersion: neighborhoodsVersion
                };



            default:
                return state;
        }
    }
};
