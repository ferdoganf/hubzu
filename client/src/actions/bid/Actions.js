// IMPORT SERVICES
import BidApi from './Services';
import { getRealestatePublic } from '../../actions/realestate/Actions';


export const BID_ACTIONS = {
  BID_SET_REDIRECT_FLAG: 'BID_SET_REDIRECT_FLAG',
  BID_CREATE_BID: 'BID_CREATE_BID',
  BID_GET_BIDS: 'BID_GET_BIDS',
  BID_GET_BIDS_OF_REALESTATE: 'BID_GET_BIDS_OF_REALESTATE',
  BID_CREATE_AUTO_BID: 'BID_CREATE_AUTO_BID',
  BID_UPDATE_AUTO_BID: 'BID_UPDATE_AUTO_BID',
  BID_DELETE_AUTO_BID: 'BID_DELETE_AUTO_BID',
  BID_GET_AUTO_BID: 'BID_GET_AUTO_BID',
  BID_GET_AUTO_BIDS: 'BID_GET_AUTO_BIDS',
  BID_GET_DIRECT_BIDS_OF_REALESTATE: 'BID_GET_DIRECT_BIDS_OF_REALESTATE',
  BID_CREATE_DIRECT_BID: 'BID_CREATE_DIRECT_BID'
};

export const bidRedirect = (value) => ({
  type: BID_ACTIONS.BID_SET_REDIRECT_FLAG,
  payload: value
});




export const buyInAdvance = (realestate) => {
  return (dispatch) => {
    const response = dispatch({
      type: BID_ACTIONS.BID_CREATE_BID,
      payload: BidApi.buyInAdvance(realestate)
    })
    response.then((result) => {
      dispatch(getRealestatePublic(realestate.realestateCode))
    })
  }
}

export const createBid = (bid) => {
  return (dispatch) => {
    const response = dispatch({
      type: BID_ACTIONS.BID_CREATE_BID,
      payload: BidApi.createBid(bid)
    })
    response.then((result) => {
      dispatch(getRealestatePublic(bid.realestateCode))
    })
  }
}

export const getBidsOfBuyer = () => ({
  type: BID_ACTIONS.BID_GET_BIDS,
  payload: BidApi.getBidsOfBuyer()
});

export const getBidsOfRealestate = (code) => ({
  type: BID_ACTIONS.BID_GET_BIDS_OF_REALESTATE,
  payload: BidApi.getBidsOfRealestate(code)
});


export const createAutoBid = (autoBid) => {
  return (dispatch) => {
    const response = dispatch({
      type: BID_ACTIONS.BID_CREATE_AUTO_BID,
      payload: BidApi.createAutoBid(autoBid)
    })
    response.then((result) => {
      dispatch(getRealestatePublic(autoBid.realestateCode))
    })
  }
}

export const updateAutoBid = (autoBid) => {
  return (dispatch) => {
    const response = dispatch({
      type: BID_ACTIONS.BID_UPDATE_AUTO_BID,
      payload: BidApi.updateAutoBid(autoBid)
    })
    response.then((result) => {
      dispatch(getAutoBid(autoBid.realestateCode))
    }).then(() => {
      dispatch(bidRedirect(true))
    })
  }
}

export const deleteAutoBid = (code) => {
  return (dispatch) => {
    const response = dispatch({
      type: BID_ACTIONS.BID_DELETE_AUTO_BID,
      payload: BidApi.deleteAutoBid(code)
    })
    response.then((result) => {
      dispatch(bidRedirect(true))
    })
  }
}

export const getAutoBid = (code) => ({
  type: BID_ACTIONS.BID_GET_AUTO_BID,
  payload: BidApi.getAutoBid(code)
});

export const getAutoBidsOfBuyer = () => ({
  type: BID_ACTIONS.BID_GET_AUTO_BIDS,
  payload: BidApi.getAutoBidsOfBuyer()
});


export const getDirectBidsOfRealestate = (code) => ({
  type: BID_ACTIONS.BID_GET_DIRECT_BIDS_OF_REALESTATE,
  payload: BidApi.getDirectBidsOfRealestate(code)
});

export const createDirectBid = (bid) => {
  return (dispatch) => {
    const response = dispatch({
      type: BID_ACTIONS.BID_CREATE_DIRECT_BID,
      payload: BidApi.createDirectBid(bid)
    })
    response.then((result) => {
      dispatch(getDirectBidsOfRealestate(bid.bid.realestateCode))
    })
  }
}