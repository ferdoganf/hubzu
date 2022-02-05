import {
    VISITOR_ACTIONS
} from './Actions';

// INITIALIZE STATE

const initialState = {
    visitorCreated: null,
    shouldRedirect: false,
    visitors: [],
    visitorCount: 0,
    visitorFavorites: null
};


export const VisitorReducer = (state = initialState, action) => {
    if ((action.type).startsWith("VISITOR") && (action.type).endsWith("_REJECTED")) {
        return state;
    } else {
        switch (action.type) {
            case VISITOR_ACTIONS.VISITOR_SET_REDIRECT_FLAG:
                return {
                    ...state,
                    shouldRedirect: action.payload
                };
            case VISITOR_ACTIONS.VISITOR_GET_VISITOR + "_FULFILLED":
                return {
                    ...state,
                    visitorCreated: action.payload.data.value
                };
            case VISITOR_ACTIONS.VISITOR_SEARCH_VISITOR + "_FULFILLED":
                return {
                    ...state,
                    visitors: action.payload.data.value,
                    visitorCount: action.payload.data.total
                };
            default:
                return state;
        }
    }
};
