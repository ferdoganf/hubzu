import {
    METADATA_ACTIONS
} from './Actions';

// INITIALIZE STATE

const initialState = {
    realestateMetadata: null,
    userMetadata: null,
    systemDate: null,
    bankCreated: null,
    shouldRedirect: false,
    banks: [],
    bankCount: 0,
    selectedBank: null,
    contract: null,
    smsList: [],
    sms: null,
    realestateSubTypeCreated: null
};


export const MetadataReducer = (state = initialState, action) => {
    if ((action.type).startsWith("METADATA") && (action.type).endsWith("_REJECTED")) {
        return {
            ...state,
            contract: null
        };
    } else {
        switch (action.type) {
            case METADATA_ACTIONS.METADATA_SET_REDIRECT_FLAG:
                return {
                    ...state,
                    shouldRedirect: action.payload
                };
            case METADATA_ACTIONS.METADATA_GET_REALESTATE_METADATA + "_FULFILLED":
                return {
                    ...state,
                    realestateMetadata: action.payload.data.value
                };
            case METADATA_ACTIONS.METADATA_GET_USER_METADATA + "_FULFILLED":
                return {
                    ...state,
                    userMetadata: action.payload.data.value
                };
            case METADATA_ACTIONS.METADATA_GET_SYSTEM_DATE + "_FULFILLED":
                return {
                    ...state,
                    systemDate: action.payload.data.value
                };
            case METADATA_ACTIONS.METADATA_GET_BANK + "_FULFILLED":
                return {
                    ...state,
                    bankCreated: action.payload.data.value
                };
            case METADATA_ACTIONS.METADATA_SEARCH_BANK + "_FULFILLED":
                return {
                    ...state,
                    banks: action.payload.data.value,
                    bankCount: action.payload.data.total
                };
            case METADATA_ACTIONS.METADATA_GET_SELECTED_BANK + "_FULFILLED":
                return {
                    ...state,
                    selectedBank: action.payload.data.value
                };
            case METADATA_ACTIONS.METADATA_GET_ALL_BANKS + "_FULFILLED":
                return {
                    ...state,
                    banks: action.payload.data.value
                };
            case METADATA_ACTIONS.METADATA_GET_CONTRACT + "_FULFILLED":
                return {
                    ...state,
                    contract: action.payload.data.value
                };
            case METADATA_ACTIONS.METADATA_GET_SMS_LIST + "_FULFILLED":
                return {
                    ...state,
                    smsList: action.payload.data.value
                };
            case METADATA_ACTIONS.METADATA_GET_SMS + "_FULFILLED":
                return {
                    ...state,
                    sms: action.payload.data.value
                };
            case METADATA_ACTIONS.METADATA_GET_REALESTATE_SUB_TYPE + "_FULFILLED":
                return {
                    ...state,
                    realestateSubTypeCreated: action.payload.data.value
                };
            default:
                return state;
        }
    }
};
