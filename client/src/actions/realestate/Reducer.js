import {
    REALESTATE_ACTIONS
} from './Actions';

// INITIALIZE STATE

const initialState = {
    realestateCreated: null,
    shouldRedirect: false,
    uploadedFileNumber: 0,
    fileUploadException: false,
    realestates: [],
    realestateCount: 0,
    realestateDepositAmount: 0,
    realestatesAll: [],
    realestatesStarted: [],
    realestatesLatest: [],
    realestate: null,
    favoritedBuyers: []
};


export const RealestateReducer = (state = initialState, action) => {
    if ((action.type).startsWith("REALESTATE") && (action.type).endsWith("_REJECTED")) {
        switch (action.type) {
            case REALESTATE_ACTIONS.REALESTATE_UPLOAD_PHOTO + "_REJECTED":
                return {
                    ...state,
                    fileUploadException: true,
                    shouldRedirect: true
                };
            case REALESTATE_ACTIONS.REALESTATE_DELETE_PHOTO + "_REJECTED":
                return {
                    ...state,
                    fileUploadException: true,
                    shouldRedirect: true
                };
            default:
                return state;
        }
    } else {
        switch (action.type) {
            case REALESTATE_ACTIONS.REALESTATE_SET_REDIRECT_FLAG:
                return {
                    ...state,
                    shouldRedirect: action.payload
                };
            case REALESTATE_ACTIONS.REALESTATE_GET_REALESTATE + "_FULFILLED":
                return {
                    ...state,
                    realestateCreated: action.payload.data.value
                };

            case REALESTATE_ACTIONS.REALESTATE_UPLOAD_PHOTO + "_FULFILLED":
                let uploadedFileNumber = state.uploadedFileNumber;
                uploadedFileNumber = uploadedFileNumber + 1;
                return {
                    ...state,
                    uploadedFileNumber: uploadedFileNumber,
                    shouldRedirect: true
                };
            case REALESTATE_ACTIONS.REALESTATE_DELETE_PHOTO + "_FULFILLED":
                let deletedFileNumber = state.uploadedFileNumber;
                deletedFileNumber = deletedFileNumber + 1;
                return {
                    ...state,
                    uploadedFileNumber: deletedFileNumber,
                    shouldRedirect: true
                };
            case REALESTATE_ACTIONS.REALESTATE_UPLOAD_PHOTO_START:
                return {
                    ...state,
                    uploadedFileNumber: 0,
                    fileUploadException: false
                };
            case REALESTATE_ACTIONS.REALESTATE_SEARCH_REALESTATE + "_FULFILLED":
                return {
                    ...state,
                    realestates: action.payload.data.value,
                    realestateCount: action.payload.data.total
                };
            case REALESTATE_ACTIONS.REALESTATE_SEARCH_REALESTATE_ALL + "_FULFILLED":
                return {
                    ...state,
                    realestatesAll: action.payload.data.value
                };
            case REALESTATE_ACTIONS.REALESTATE_SEARCH_REALESTATE_STARTED + "_FULFILLED":
                return {
                    ...state,
                    realestatesStarted: action.payload.data.value
                };
            case REALESTATE_ACTIONS.REALESTATE_SEARCH_REALESTATE_LATEST + "_FULFILLED":
                return {
                    ...state,
                    realestatesLatest: action.payload.data.value
                };
            case REALESTATE_ACTIONS.REALESTATE_GET_REALESTATE_PUBLIC + "_FULFILLED":
                return {
                    ...state,
                    realestate: action.payload.data.value
                };

            case REALESTATE_ACTIONS.REALESTATE_GET_FAVORITED_BUYERS + "_FULFILLED":
                return {
                    ...state,
                    favoritedBuyers: action.payload.data.value
                };

            case REALESTATE_ACTIONS.REALESTATE_GET_REALESTATE_DEPOSIT_AMOUNT + "_FULFILLED":
                return {
                    ...state,
                    realestateDepositAmount: action.payload.data.value
                };

            case REALESTATE_ACTIONS.REALESTATE_GET_REALESTATE_CURRENT_BID_AMOUNT + "_FULFILLED":
                if ((action.payload.data.value) && (state.realestate) && (action.payload.data.value.code === state.realestate.code)) {
                    let realEstateWithCurrentBidAmount = state.realestate;
                    realEstateWithCurrentBidAmount.currentBidAmount = action.payload.data.value.currentBidAmount;
                    realEstateWithCurrentBidAmount.realEstateStatus = action.payload.data.value.realEstateStatus;
                    return {
                        ...state,
                        realestate: realEstateWithCurrentBidAmount
                    };
                } else {
                    return state;
                }
            default:
                return state;
        }
    }
};
