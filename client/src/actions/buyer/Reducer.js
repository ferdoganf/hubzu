import {
    BUYER_ACTIONS
} from './Actions';

// INITIALIZE STATE

const initialState = {
    buyerCreated: null,
    shouldRedirect: false,
    buyers: [],
    buyerCount: 0,
    warrantedBuyers: null,
    warrantedRealestates: null,
    buyerFavorites: null
};


export const BuyerReducer = (state = initialState, action) => {
    if ((action.type).startsWith("BUYER") && (action.type).endsWith("_REJECTED")) {
        return state;
    } else {
        switch (action.type) {
            case BUYER_ACTIONS.BUYER_SET_REDIRECT_FLAG:
                return {
                    ...state,
                    shouldRedirect: action.payload
                };
            case BUYER_ACTIONS.BUYER_GET_BUYER + "_FULFILLED":
                return {
                    ...state,
                    buyerCreated: action.payload.data.value
                };
            case BUYER_ACTIONS.BUYER_SEARCH_BUYER + "_FULFILLED":
                return {
                    ...state,
                    buyers: action.payload.data.value,
                    buyerCount: action.payload.data.total
                };

            case BUYER_ACTIONS.BUYER_GET_WARRANTED_BUYERS_OF_REALESTATE + "_FULFILLED":
                return {
                    ...state,
                    warrantedBuyers: action.payload.data.value,
                };

            case BUYER_ACTIONS.BUYER_GET_WARRANTED_REALESTATES_OF_BUYER + "_FULFILLED":
                return {
                    ...state,
                    warrantedRealestates: action.payload.data.value,
                };
            default:
                return state;
        }
    }
};
