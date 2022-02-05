export const PAGE_ACTIONS = {
	PAGE_SET_ACTIVE_MENU_ITEM: 'PAGE_SET_ACTIVE_MENU_ITEM',
	PAGE_SET_PAGE_HEADER: 'PAGE_SET_PAGE_HEADER',
	PAGE_SHOW_ERROR_MODAL: 'PAGE_SHOW_ERROR_MODAL',
	PAGE_SHOW_ERROR_LIST_MODAL: 'PAGE_SHOW_ERROR_LIST_MODAL',
	PAGE_CONFIRM_SHOW_MODAL: 'PAGE_CONFIRM_SHOW_MODAL',
	PAGE_SHOW_MODAL: 'PAGE_SHOW_MODAL',
	PAGE_HIDE_MODAL: 'PAGE_HIDE_MODAL',
	PAGE_SHOW_LOADING: 'PAGE_SHOW_LOADING',
	PAGE_HIDE_LOADING: 'PAGE_HIDE_LOADING'
};

export const setActiveMenuItem = activeMenuItem => ({
	type: PAGE_ACTIONS.PAGE_SET_ACTIVE_MENU_ITEM,
	payload: { activeMenuItem }
});

export const setPageHeader = pageHeader => ({
	type: PAGE_ACTIONS.PAGE_SET_PAGE_HEADER,
	payload: { pageHeader }
});

export const showErrorListModal = errorList => ({
	type: PAGE_ACTIONS.PAGE_SHOW_ERROR_LIST_MODAL,
	payload: { errorList }
});

export const showErrorModal = (error, modalOnCloseRedirect) => ({
	type: PAGE_ACTIONS.PAGE_SHOW_ERROR_MODAL,
	payload: { error: error, modalOnCloseRedirect: modalOnCloseRedirect }
});

export const showModal = (modalTitle, modalDesc, modalOnCloseRedirect) => ({
	type: PAGE_ACTIONS.PAGE_SHOW_MODAL,
	payload: { modalTitle: modalTitle, modalDesc: modalDesc, modalOnCloseRedirect: modalOnCloseRedirect }
});

export const showConfirmModal = (modalTitle, modalDesc, modalOnCloseRedirect, modalOnCloseAction, modalOnCloseActionArgs) => ({
	type: PAGE_ACTIONS.PAGE_CONFIRM_SHOW_MODAL,
	payload: { modalTitle: modalTitle, modalDesc: modalDesc, modalOnCloseRedirect: modalOnCloseRedirect, modalOnCloseAction: modalOnCloseAction, modalOnCloseActionArgs: modalOnCloseActionArgs }
});

export const hideModal = () => ({
	type: PAGE_ACTIONS.PAGE_HIDE_MODAL
});

export const showLoading = () => ({
	type: PAGE_ACTIONS.PAGE_SHOW_LOADING,
});

export const hideLoading = () => ({
	type: PAGE_ACTIONS.PAGE_HIDE_LOADING,
});