// IMPORT SERVICES
import UserApi from './Services';


export const USER_ACTIONS = {
  USER_GET_USER: 'USER_GET_USER',
  USER_UPDATE_PASSWORD: 'USER_UPDATE_PASSWORD',
  USER_ACTIVATE_USER: 'USER_ACTIVATE_USER',
  USER_PASSIVATE_USER: 'USER_PASSIVATE_USER',
  USER_SEARCH_USER: 'USER_SEARCH_USER',
  USER_SET_REDIRECT_FLAG: 'USER_SET_REDIRECT_FLAG',
  USER_ADD_FAVORITES: 'USER_ADD_FAVORITES',
  USER_REMOVE_FAVORITES: 'USER_REMOVE_FAVORITES',
  USER_GET_FAVORITES: 'USER_GET_FAVORITES',
  USER_UPDATE_MY_PASSWORD: 'USER_UPDATE_MY_PASSWORD'
};

export const userRedirect = (value) => ({
  type: USER_ACTIONS.USER_SET_REDIRECT_FLAG,
  payload: value
});


export const updatePassword = (id, passwordRequest) => {
  return (dispatch) => {
    const response = dispatch({
      type: USER_ACTIONS.USER_UPDATE_PASSWORD,
      payload: UserApi.updatePassword(id, passwordRequest)
    })
    response.then((result) => {
      dispatch(getUser(id))
    }).then(() => {
      dispatch(userRedirect(true))
    })
  }
}

export const getUser = (code) => ({
  type: USER_ACTIONS.USER_GET_USER,
  payload: UserApi.getUser(code)
});


export const searchUser = (searchCriterias) => ({
  type: USER_ACTIONS.USER_SEARCH_USER,
  payload: UserApi.searchUser(searchCriterias)
});


export const activateUser = (code) => {
  return (dispatch) => {
    const response = dispatch({
      type: USER_ACTIONS.USER_ACTIVATE_USER,
      payload: UserApi.activateUser(code)
    })
    response.then((result) => {
      dispatch(userRedirect(true))
    })
  }
}

export const passivateUser = (code) => {
  return (dispatch) => {
    const response = dispatch({
      type: USER_ACTIONS.USER_PASSIVATE_USER,
      payload: UserApi.passivateUser(code)
    })
    response.then((result) => {
      dispatch(userRedirect(true))
    })
  }
}

export const addToFavorites = (realestateCode) => {
  return (dispatch) => {
    const response = dispatch({
      type: USER_ACTIONS.USER_ADD_FAVORITES,
      payload: UserApi.addToFavorites(realestateCode)
    })
    response.then((result) => {
      dispatch(getFavoritesOfUser())
    })
  }
}

export const removeFromFavorites = (realestateCode) => {
  return (dispatch) => {
    const response = dispatch({
      type: USER_ACTIONS.USER_REMOVE_FAVORITES,
      payload: UserApi.removeFromFavorites(realestateCode)
    })
    response.then((result) => {
      dispatch(getFavoritesOfUser())
    })
  }
}

export const getFavoritesOfUser = () => ({
  type: USER_ACTIONS.USER_GET_FAVORITES,
  payload: UserApi.getFavoritesOfUser()
});

export const updateMyPassword = (newPasswordRequest) => {
  return (dispatch) => {
    const response = dispatch({
      type: USER_ACTIONS.USER_UPDATE_MY_PASSWORD,
      payload: UserApi.updateMyPassword(newPasswordRequest)
    })
    response.then((result) => {
      dispatch(userRedirect(true))
    })
  }
}
