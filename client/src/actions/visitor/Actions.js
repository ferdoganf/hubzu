// IMPORT SERVICES
import VisitorApi from './Services';


export const VISITOR_ACTIONS = {
  VISITOR_CREATE_VISITOR_VERIFY: 'VISITOR_CREATE_VISITOR_VERIFY',
  VISITOR_GET_VISITOR: 'VISITOR_GET_VISITOR',
  VISITOR_CREATE_VISITOR: 'VISITOR_CREATE_VISITOR',
  VISITOR_UPDATE_VISITOR: 'VISITOR_UPDATE_VISITOR',
  VISITOR_SEARCH_VISITOR: 'VISITOR_SEARCH_VISITOR',
  VISITOR_SET_REDIRECT_FLAG: 'VISITOR_SET_REDIRECT_FLAG'
};

export const visitorRedirect = (value) => ({
  type: VISITOR_ACTIONS.VISITOR_SET_REDIRECT_FLAG,
  payload: value
});


export const createVisitor = (visitor) => {
  return (dispatch) => {
    const response = dispatch({
      type: VISITOR_ACTIONS.VISITOR_CREATE_VISITOR,
      payload: VisitorApi.createVisitor(visitor)
    })
    response.then(() => {
      dispatch(visitorRedirect(true))
    });
  }
}

export const createVisitorVerify = (code) => {
  return (dispatch) => {
    const response = dispatch({
      type: VISITOR_ACTIONS.VISITOR_CREATE_VISITOR_VERIFY,
      payload: VisitorApi.createVisitorVerify(code)
    })
    response.then(() => {
      dispatch(visitorRedirect(true))
    });
  }
}


export const updateVisitor = (code, visitor) => {
  return (dispatch) => {
    const response = dispatch({
      type: VISITOR_ACTIONS.VISITOR_UPDATE_VISITOR,
      payload: VisitorApi.updateVisitor(code, visitor)
    })
    response.then((result) => {
      dispatch(getVisitor(code))
    }).then(() => {
      dispatch(visitorRedirect(true))
    })
  }
}

export const getVisitor = (code) => ({
  type: VISITOR_ACTIONS.VISITOR_GET_VISITOR,
  payload: VisitorApi.getVisitor(code)
});


export const searchVisitor = (searchCriterias) => ({
  type: VISITOR_ACTIONS.VISITOR_SEARCH_VISITOR,
  payload: VisitorApi.searchVisitor(searchCriterias)
});