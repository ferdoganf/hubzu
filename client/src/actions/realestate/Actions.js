// IMPORT SERVICES
import RealestateApi from './Services';


export const REALESTATE_ACTIONS = {
  REALESTATE_CREATE_REALESTATE: 'REALESTATE_CREATE_REALESTATE',
  REALESTATE_GET_REALESTATE: 'REALESTATE_GET_REALESTATE',
  REALESTATE_UPDATE_ADDRESS: 'REALESTATE_UPDATE_ADDRESS',
  REALESTATE_UPLOAD_PHOTO: 'REALESTATE_UPLOAD_PHOTO',
  REALESTATE_UPLOAD_PHOTO_START: 'REALESTATE_UPLOAD_PHOTO_START',
  REALESTATE_UPDATE_REALESTATE: 'REALESTATE_UPDATE_REALESTATE',
  REALESTATE_UPDATE_REALESTATE_DETAILS: 'REALESTATE_UPDATE_REALESTATE_DETAILS',
  REALESTATE_SEARCH_REALESTATE: 'REALESTATE_SEARCH_REALESTATE',
  REALESTATE_SET_REDIRECT_FLAG: 'REALESTATE_SET_REDIRECT_FLAG',
  REALESTATE_DELETE_PHOTO: 'REALESTATE_DELETE_PHOTO',
  REALESTATE_SEARCH_REALESTATE_ALL: 'REALESTATE_SEARCH_REALESTATE_ALL',
  REALESTATE_SEARCH_REALESTATE_STARTED: 'REALESTATE_SEARCH_REALESTATE_STARTED',
  REALESTATE_SEARCH_REALESTATE_LATEST: 'REALESTATE_SEARCH_REALESTATE_LATEST',
  REALESTATE_GET_REALESTATE_PUBLIC: 'REALESTATE_GET_REALESTATE_PUBLIC',
  REALESTATE_UPDATE_REALESTATE_STATUS: 'REALESTATE_UPDATE_REALESTATE_STATUS',
  REALESTATE_UPDATE_REALESTATE_ENDDATE: 'REALESTATE_UPDATE_REALESTATE_ENDDATE',
  REALESTATE_GET_FAVORITED_BUYERS: 'REALESTATE_GET_FAVORITED_BUYERS',
  REALESTATE_GET_REALESTATE_DEPOSIT_AMOUNT: 'REALESTATE_GET_REALESTATE_DEPOSIT_AMOUNT',
  REALESTATE_DELETE_REALESTATE: 'REALESTATE_DELETE_REALESTATE',
  REALESTATE_GET_REALESTATE_CURRENT_BID_AMOUNT: 'REALESTATE_GET_REALESTATE_CURRENT_BID_AMOUNT'
};

export const realestateRedirect = (value) => ({
  type: REALESTATE_ACTIONS.REALESTATE_SET_REDIRECT_FLAG,
  payload: value
});


export const createRealestate = (realestate) => {
  return (dispatch) => {
    const response = dispatch({
      type: REALESTATE_ACTIONS.REALESTATE_CREATE_REALESTATE,
      payload: RealestateApi.createRealestate(realestate)
    })
    response.then((result) => {
      dispatch(getRealestate(realestate.code))

    }).then(() => {
      dispatch(realestateRedirect(true))
    })
  }
}

export const updateRealestate = (realestateCode, realestate) => {
  return (dispatch) => {
    const response = dispatch({
      type: REALESTATE_ACTIONS.REALESTATE_UPDATE_REALESTATE,
      payload: RealestateApi.updateRealestate(realestateCode, realestate)
    })
    response.then((result) => {
      dispatch(getRealestate(realestate.code))
    }).then(() => {
      dispatch(realestateRedirect(true))
    })
  }
}

export const deleteRealestate = (realestateCode) => {
  return (dispatch) => {
    const response = dispatch({
      type: REALESTATE_ACTIONS.REALESTATE_DELETE_REALESTATE,
      payload: RealestateApi.deleteRealestate(realestateCode)
    })
    response.then((result) => {
      dispatch(realestateRedirect(true))
    })
  }
}

export const copyRealestate = (realestateCode) => {
  return (dispatch) => {
    const response = dispatch({
      type: REALESTATE_ACTIONS.REALESTATE_COPY_REALESTATE,
      payload: RealestateApi.copyRealestate(realestateCode)
    })
    response.then((result) => {
      dispatch(realestateRedirect(true))
    })
  }
}


export const updateRealestateDetails = (realestateCode, realEstateType, realEstate) => {
  return (dispatch) => {
    const response = dispatch({
      type: REALESTATE_ACTIONS.REALESTATE_UPDATE_REALESTATE_DETAILS,
      payload: RealestateApi.updateRealestateDetails(realestateCode, realEstateType, realEstate)
    })
    response.then((result) => {
      dispatch(getRealestate(realestateCode))
    }).then(() => {
      dispatch(realestateRedirect(true))
    })
  }
}


export const updateAddress = (realestateCode, addressRequest) => {
  return (dispatch) => {
    const response = dispatch({
      type: REALESTATE_ACTIONS.REALESTATE_UPDATE_ADDRESS,
      payload: RealestateApi.updateAddress(realestateCode, addressRequest)
    })
    response.then((result) => {
      dispatch(getRealestate(realestateCode))
    }).then(() => {
      dispatch(realestateRedirect(true))
    })
  }
}

export const getRealestate = (code) => ({
  type: REALESTATE_ACTIONS.REALESTATE_GET_REALESTATE,
  payload: RealestateApi.getRealestate(code)
});

export const uploadPhotoStart = () => ({
  type: REALESTATE_ACTIONS.REALESTATE_UPLOAD_PHOTO_START,
  payload: {}
});

export const uploadPhoto = (realestateCode, photo) => ({
  type: REALESTATE_ACTIONS.REALESTATE_UPLOAD_PHOTO,
  payload: RealestateApi.uploadPhoto(realestateCode, photo)
});


export const deletePhoto = (realestateCode, photoCode) => ({
  type: REALESTATE_ACTIONS.REALESTATE_DELETE_PHOTO,
  payload: RealestateApi.deletePhoto(realestateCode, photoCode)
});

export const searchRealestate = (searchCriterias) => ({
  type: REALESTATE_ACTIONS.REALESTATE_SEARCH_REALESTATE,
  payload: RealestateApi.searchRealestate(searchCriterias)
});

export const searchRealestatePublic = (searchCriterias, hideLoading) => ({
  type: REALESTATE_ACTIONS.REALESTATE_SEARCH_REALESTATE,
  payload: RealestateApi.searchRealestatePublic(searchCriterias, hideLoading)
});

export const searchRealestatePublicAll = (resultNum) => ({
  type: REALESTATE_ACTIONS.REALESTATE_SEARCH_REALESTATE_ALL,
  payload: RealestateApi.searchRealestatePublic({
    pageNo: 1,
    pageSize: resultNum,
    orderBy: 'id',
    orderType: 'desc'
  })
});

export const searchRealestatePublicStarted = (resultNum) => ({
  type: REALESTATE_ACTIONS.REALESTATE_SEARCH_REALESTATE_STARTED,
  payload: RealestateApi.searchRealestatePublic({
    realEstateStatus: ['STARTED'],
    pageNo: 1,
    pageSize: resultNum,
    orderBy: 'id',
    orderType: 'desc'
  })
});

export const searchRealestatePublicLatest = (resultNum) => ({
  type: REALESTATE_ACTIONS.REALESTATE_SEARCH_REALESTATE_LATEST,
  payload: RealestateApi.searchRealestatePublic({
    realEstateStatus: ['ACTIVE'],
    pageNo: 1,
    pageSize: resultNum,
    orderBy: 'id',
    orderType: 'desc'
  })
});


export const getRealestatePublic = (code, hideLoading) => ({
  type: REALESTATE_ACTIONS.REALESTATE_GET_REALESTATE_PUBLIC,
  payload: RealestateApi.getRealestatePublic(code, hideLoading)
});


export const updateRealestateStatus = (code, status) => {
  return (dispatch) => {
    const response = dispatch({
      type: REALESTATE_ACTIONS.REALESTATE_UPDATE_REALESTATE_STATUS,
      payload: RealestateApi.updateRealestateStatus(code, status)
    })
    response.then((result) => {
      dispatch(realestateRedirect(true))
    })
  }
}

export const updateRealestateEndDate = (code, endDate) => {
  return (dispatch) => {
    const response = dispatch({
      type: REALESTATE_ACTIONS.REALESTATE_UPDATE_REALESTATE_ENDDATE,
      payload: RealestateApi.updateRealestateEndDate(code, endDate)
    })
    response.then((result) => {
      dispatch(realestateRedirect(true))
    })
  }
}


export const getFavoritedBuyers = (code) => ({
  type: REALESTATE_ACTIONS.REALESTATE_GET_FAVORITED_BUYERS,
  payload: RealestateApi.getFavoritedBuyers(code)
});


export const getRealestateDepositAmount = (code, hideLoading) => ({
  type: REALESTATE_ACTIONS.REALESTATE_GET_REALESTATE_DEPOSIT_AMOUNT,
  payload: RealestateApi.getRealestateDepositAmount(code, hideLoading)
});

export const getRealestateCurrentBidAmount = (code, hideLoading) => ({
  type: REALESTATE_ACTIONS.REALESTATE_GET_REALESTATE_CURRENT_BID_AMOUNT,
  payload: RealestateApi.getRealestateCurrentBidAmount(code, hideLoading)
});