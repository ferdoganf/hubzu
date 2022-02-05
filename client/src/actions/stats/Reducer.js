import {
    STATS_ACTIONS
} from './Actions';

// INITIALIZE STATE

const initialState = {
    realestateBuyersWarrantsStats: {},
    realestateBuyersFavoritesStats: {},
    realestateBidsStats: {},
    realestateUserViewsStats: {},
};


export const StatsReducer = (state = initialState, action) => {
    if ((action.type).startsWith("STATS") && (action.type).endsWith("_REJECTED")) {
        return state;
    } else {
        switch (action.type) {
            case STATS_ACTIONS.STATS_GET_REALESTATE_BUYERS_WARRANTS + "_FULFILLED":
                return {
                    ...state,
                    realestateBuyersWarrantsStats: action.payload.data.value
                };
            case STATS_ACTIONS.STATS_GET_REALESTATE_BUYERS_FAVORITES + "_FULFILLED":
                return {
                    ...state,
                    realestateBuyersFavoritesStats: action.payload.data.value
                };
            case STATS_ACTIONS.STATS_GET_REALESTATE_BIDS + "_FULFILLED":
                return {
                    ...state,
                    realestateBidsStats: action.payload.data.value
                };
            case STATS_ACTIONS.STATS_GET_REALESTATE_USER_VIEWS + "_FULFILLED":
                return {
                    ...state,
                    realestateUserViewsStats: action.payload.data.value
                };
            default:
                return state;
        }
    }
};
