import {
    SESSION_ACTIONS
} from './Actions';

// INITIALIZE STATE

const initialState = {
    user: null
};


export const SessionReducer = (state = initialState, action) => {
    if ((action.type).startsWith("SESSION") && (action.type).endsWith("_REJECTED")) {
        return state;
    } else {
        switch (action.type) {
            case SESSION_ACTIONS.SESSION_SIGN_IN + "_PENDING":
                return {
                    ...state,
                    user: null
                };
            case SESSION_ACTIONS.SESSION_LOAD_SESSION + "_FULFILLED":
                return {
                    ...state,
                    user: action.payload.data.value
                };
            case SESSION_ACTIONS.SESSION_SIGN_OUT + "_FULFILLED":
                return {
                    ...state,
                    user: null
                };
            case SESSION_ACTIONS.SESSION_RELOAD_SESSION + "_FULFILLED":
                return {
                    ...state,
                    user: action.payload.data.value
                };
            default:
                return state;
        }
    }
};
