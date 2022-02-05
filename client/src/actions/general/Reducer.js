import {
    GENERAL_ACTIONS
} from './Actions';

// INITIALIZE STATE

const initialState = {
    shouldRedirect: false
};

// REDUCER

export const GeneralReducer = (state = initialState, action) => {
    if ((action.type).startsWith("GENERAL") && (action.type).endsWith("_REJECTED")) {
        return state;
    } else {
        switch (action.type) {
            case GENERAL_ACTIONS.GENERAL_SET_REDIRECT_FLAG:
                return {
                    ...state,
                    shouldRedirect: action.payload
                };
            default:
                return state;
        }
    }
};