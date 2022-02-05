import {
    USER_ACTIONS
} from './Actions';

// INITIALIZE STATE

const initialState = {
    userCreated: null,
    shouldRedirect: false,
    users: [],
    userCount: 0,
    userFavorites: null
};


export const UserReducer = (state = initialState, action) => {
    if ((action.type).startsWith("USER") && (action.type).endsWith("_REJECTED")) {
        return state;
    } else {
        switch (action.type) {
            case USER_ACTIONS.USER_SET_REDIRECT_FLAG:
                return {
                    ...state,
                    shouldRedirect: action.payload
                };
            case USER_ACTIONS.USER_GET_USER + "_FULFILLED":
                return {
                    ...state,
                    userCreated: action.payload.data.value
                };
            case USER_ACTIONS.USER_SEARCH_USER + "_FULFILLED":
                return {
                    ...state,
                    users: action.payload.data.value,
                    userCount: action.payload.data.total
                };
            case USER_ACTIONS.USER_GET_FAVORITES + "_FULFILLED":
                return {
                    ...state,
                    userFavorites: action.payload.data.value,
                };
            default:
                return state;
        }
    }
};
