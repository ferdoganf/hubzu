import { PAGE_ACTIONS } from './Actions';

// INITIALIZE STATE

const initialState = {
	lastResponseId: '',
	activeMenuItem: 'home',
	pageHeader: null,
	modalType: null,
	errorList: null,
	error: null,
	modalVisible: false,
	modalTitle: '',
	modalDesc: '',
	modalOnCloseRedirect: null,
	modalOnCloseAction: null,
	modalOnCloseActionArgs: null
};

// REDUCER
export const PageReducer = (state = initialState, action) => {
	switch (action.type) {
		case PAGE_ACTIONS.PAGE_SET_ACTIVE_MENU_ITEM:
			return {
				...state,
				activeMenuItem: action.payload.activeMenuItem
			};
		case PAGE_ACTIONS.PAGE_SET_PAGE_HEADER:
			return {
				...state,
				pageHeader: action.payload.pageHeader
			};
		case PAGE_ACTIONS.PAGE_SHOW_ERROR_LIST_MODAL:
			return {
				...state,
				modalType: 'error',
				modalVisible: true,
				errorList: action.payload.errorList,
				error: null,
				modalTitle: null,
				modalDesc: null,
				modalOnCloseRedirect: action.payload.modalOnCloseRedirect ? action.payload.modalOnCloseRedirect : null
			};
		case PAGE_ACTIONS.PAGE_SHOW_ERROR_MODAL:
			return {
				...state,
				modalType: 'error',
				modalVisible: true,
				errorList: null,
				error: action.payload.error,
				modalTitle: null,
				modalDesc: null,
				modalOnCloseRedirect: action.payload.modalOnCloseRedirect ? action.payload.modalOnCloseRedirect : null
			};
		case PAGE_ACTIONS.PAGE_SHOW_MODAL:
			return {
				...state,
				modalType: 'info',
				modalVisible: true,
				errorList: null,
				error: null,
				modalTitle: action.payload.modalTitle,
				modalDesc: action.payload.modalDesc,
				modalOnCloseRedirect: action.payload.modalOnCloseRedirect
			};
		case PAGE_ACTIONS.PAGE_CONFIRM_SHOW_MODAL:
			return {
				...state,
				modalType: 'confirm',
				modalVisible: true,
				errorList: null,
				error: null,
				modalTitle: action.payload.modalTitle,
				modalDesc: action.payload.modalDesc,
				modalOnCloseRedirect: action.payload.modalOnCloseRedirect,
				modalOnCloseAction: action.payload.modalOnCloseAction,
				modalOnCloseActionArgs: action.payload.modalOnCloseActionArgs
			};
		case PAGE_ACTIONS.PAGE_HIDE_MODAL:
			return {
				...state,
				modalType: null,
				modalVisible: false,
				errorList: null,
				error: null,
				modalTitle: null,
				modalDesc: null,
				modalOnCloseAction: null,
				modalOnCloseActionArgs: null
			};
		case PAGE_ACTIONS.PAGE_SHOW_LOADING:
			return {
				...state,
				loadingVisible: true
			};
		case PAGE_ACTIONS.PAGE_HIDE_LOADING:
			return {
				...state,
				loadingVisible: false
			};
		default:
			if (action.payload && action.payload.data && action.payload.data.id) {
				return {
					...state,
					lastResponseId: action.payload.data.id
				};
			} else {
				return state;
			}
	}
};
