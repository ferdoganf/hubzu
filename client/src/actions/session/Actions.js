// IMPORT SERVICES
import sessionApi from './Services';


export const SESSION_ACTIONS = {
  SESSION_SIGN_IN: 'SESSION_SIGN_IN',
  SESSION_SET_OAUTH_COOKIES: 'SESSION_SET_OAUTH_COOKIES',
  SESSION_LOAD_SESSION: 'SESSION_LOAD_SESSION',
  SESSION_SET_SESSION_COOKIES: 'SESSION_SET_SESSION_COOKIES',
  SESSION_GET_USER_DATA: 'SESSION_GET_USER_DATA',
  SESSION_RELOAD_SESSION: 'SESSION_RELOAD_SESSION',
  SESSION_SIGN_OUT: 'SESSION_SIGN_OUT',
};

export const signIn = (email, password) => {
  return (dispatch) => {
    const response = dispatch({
      type: SESSION_ACTIONS.SESSION_SIGN_IN,
      payload: sessionApi.signIn(email, password)
    })
    response.then((result) => {
      dispatch(setOAuthCookies(result.value.data))
    })
  }
}

export const setOAuthCookies = (data) => {
  return (dispatch) => {
    const response = dispatch({
      type: SESSION_ACTIONS.SESSION_SET_OAUTH_COOKIES,
      payload: sessionApi.setOAuthCookies(data)
    })
    response.then((data) => {
      dispatch(loadSession())
    })
  }
}

export const loadSession = () => {
  return (dispatch) => {
    const response = dispatch({
      type: SESSION_ACTIONS.SESSION_LOAD_SESSION,
      payload: sessionApi.loadSession()
    })
    response.then((result) => {
      dispatch(setSessionCookies(result.value.data.value))
    })
  }
}


export const setSessionCookies = (data) => {
  return (dispatch) => {
    const response = dispatch({
      type: SESSION_ACTIONS.SESSION_SET_SESSION_COOKIES,
      payload: sessionApi.setSessionCookies(data)
    })
    response.then((data) => {
      dispatch(getUserDataFromCookies())
    })
  }
}

export const getUserDataFromCookies = () => ({
  type: SESSION_ACTIONS.SESSION_GET_USER_DATA,
  payload: sessionApi.getUserDataFromCookies()
});

export const reloadSession = (type) => {
  return (dispatch) => {
    const response = dispatch({
      type: SESSION_ACTIONS.SESSION_RELOAD_SESSION,
      payload: sessionApi.reloadSession(type)
    })
    response.then((data) => {
      dispatch(setOAuthCookies(data.value.data, type))
    },
      error => {
        dispatch(signOut());
      })
  }
}

export const signOut = () => ({
  type: SESSION_ACTIONS.SESSION_SIGN_OUT,
  payload: sessionApi.signOut()
});