// IMPORT SERVICES
import BuyerApi from './Services';


export const BUYER_ACTIONS = {
  BUYER_GET_BUYER: 'BUYER_GET_BUYER',
  BUYER_CREATE_BUYER: 'BUYER_CREATE_BUYER',
  BUYER_UPDATE_BUYER: 'BUYER_UPDATE_BUYER',
  BUYER_SEARCH_BUYER: 'BUYER_SEARCH_BUYER',
  BUYER_SET_REDIRECT_FLAG: 'BUYER_SET_REDIRECT_FLAG',
  BUYER_GET_WARRANTED_BUYERS_OF_REALESTATE: 'BUYER_GET_WARRANTED_BUYERS_OF_REALESTATE',
  BUYER_UPDATE_WARRANTED_BUYERS_OF_REALESTATE: 'BUYER_UPDATE_WARRANTED_BUYERS_OF_REALESTATE',
  BUYER_UPDATE_WARRANTED_REALESTATES_OF_BUYER: 'BUYER_UPDATE_WARRANTED_REALESTATES_OF_BUYER',
  BUYER_GET_WARRANTED_REALESTATES_OF_BUYER: 'BUYER_GET_WARRANTED_REALESTATES_OF_BUYER',
  BUYER_DELETE_BUYER: 'BUYER_DELETE_BUYER'
};

export const buyerRedirect = (value) => ({
  type: BUYER_ACTIONS.BUYER_SET_REDIRECT_FLAG,
  payload: value
});


export const createBuyer = (buyer) => {
  return (dispatch) => {
    const response = dispatch({
      type: BUYER_ACTIONS.BUYER_CREATE_BUYER,
      payload: BuyerApi.createBuyer(buyer)
    })
    response.then((result) => {
      dispatch(getBuyer(result.value.data.value))
    }).then(() => {
      dispatch(buyerRedirect(true))
    })
  }
}

export const updateBuyer = (code, buyer) => {
  return (dispatch) => {
    const response = dispatch({
      type: BUYER_ACTIONS.BUYER_UPDATE_BUYER,
      payload: BuyerApi.updateBuyer(code, buyer)
    })
    response.then((result) => {
      dispatch(getBuyer(code))
    }).then(() => {
      dispatch(buyerRedirect(true))
    })
  }
}

export const getBuyer = (code) => ({
  type: BUYER_ACTIONS.BUYER_GET_BUYER,
  payload: BuyerApi.getBuyer(code)
});


export const searchBuyer = (searchCriterias) => ({
  type: BUYER_ACTIONS.BUYER_SEARCH_BUYER,
  payload: BuyerApi.searchBuyer(searchCriterias)
});


export const getWarrantedBuyersOfRealestate = (realestateCode) => ({
  type: BUYER_ACTIONS.BUYER_GET_WARRANTED_BUYERS_OF_REALESTATE,
  payload: BuyerApi.getWarrantedBuyersOfRealestate(realestateCode)
});


export const updateWarrantedBuyersOfRealestate = (code, buyers) => {
  return (dispatch) => {
    const response = dispatch({
      type: BUYER_ACTIONS.BUYER_UPDATE_WARRANTED_BUYERS_OF_REALESTATE,
      payload: BuyerApi.updateWarrantedBuyersOfRealestate(code, buyers)
    })
    response.then((result) => {
      dispatch(buyerRedirect(true))
    })
  }
}

export const updateRealEstateWarrantsOfBuyer = (code, realestates) => {
  return (dispatch) => {
    const response = dispatch({
      type: BUYER_ACTIONS.BUYER_UPDATE_WARRANTED_REALESTATES_OF_BUYER,
      payload: BuyerApi.updateRealEstateWarrantsOfBuyer(code, realestates)
    })
    response.then((result) => {
      dispatch(buyerRedirect(true))
    })
  }
}

export const getWarrantedRealestatesOfBuyer = (buyerCode) => ({
  type: BUYER_ACTIONS.BUYER_GET_WARRANTED_REALESTATES_OF_BUYER,
  payload: BuyerApi.getWarrantedRealestatesOfBuyer(buyerCode)
});

export const getWarrantedRealestatesOfCurrentBuyer = () => ({
  type: BUYER_ACTIONS.BUYER_GET_WARRANTED_REALESTATES_OF_BUYER,
  payload: BuyerApi.getWarrantedRealestatesOfCurrentBuyer()
});


export const deleteBuyer = (code) => {
  return (dispatch) => {
    const response = dispatch({
      type: BUYER_ACTIONS.BUYER_DELETE_BUYER,
      payload: BuyerApi.deleteBuyer(code)
    })
    response.then((result) => {
      dispatch(buyerRedirect(true))
    })
  }
}