import {
    BID_ACTIONS
} from './Actions';

const initialState = {
    buyerBids: null,
    realestateBids: null,
    buyerAutoBids: null,
    buyerAutoBid: null,
    shouldRedirect: false
};

export const BidReducer = (state = initialState, action) => {
    if ((action.type).startsWith("BID") && (action.type).endsWith("_REJECTED")) {
        return state;
    } else {
        switch (action.type) {
            case BID_ACTIONS.BID_SET_REDIRECT_FLAG:
                return {
                    ...state,
                    shouldRedirect: action.payload
                };
            case BID_ACTIONS.BID_GET_BIDS + "_FULFILLED":
                return {
                    ...state,
                    buyerBids: action.payload.data.value,
                };

            case BID_ACTIONS.BID_GET_BIDS_OF_REALESTATE + "_FULFILLED":
                return {
                    ...state,
                    realestateBids: action.payload.data.value,
                };

            case BID_ACTIONS.BID_GET_AUTO_BIDS + "_FULFILLED":
                return {
                    ...state,
                    buyerAutoBids: action.payload.data.value,
                };

            case BID_ACTIONS.BID_GET_AUTO_BID + "_FULFILLED":
                return {
                    ...state,
                    buyerAutoBid: action.payload.data.value,
                };
            case BID_ACTIONS.BID_GET_DIRECT_BIDS_OF_REALESTATE + "_FULFILLED":
                return {
                    ...state,
                    realestateBids: action.payload.data.value,
                };
            default:
                return state;
        }
    }
};
