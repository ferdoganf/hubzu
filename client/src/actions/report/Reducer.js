import {
    REPORT_ACTIONS
} from './Actions';

// INITIALIZE STATE

const initialState = {
    realestatesStatusChangesCount: 0,
    realestatesStatusChanges: [],
    shouldRedirect: false
};


export const ReportReducer = (state = initialState, action) => {
    if ((action.type).startsWith("REPORT") && (action.type).endsWith("_REJECTED")) {
        return state;
    } else {
        switch (action.type) {
            case REPORT_ACTIONS.REALESTATE_SET_REDIRECT_FLAG:
                return {
                    ...state,
                    shouldRedirect: action.payload
                };
            case REPORT_ACTIONS.REPORT_GET_REALESTATE_STATUS_CHANGES + "_FULFILLED":
                return {
                    ...state,
                    realestatesStatusChanges: action.payload.data.value,
                    realestatesStatusChangesCount: action.payload.data.total
                };
            default:
                return state;
        }
    }
};
