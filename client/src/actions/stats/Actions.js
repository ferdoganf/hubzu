// IMPORT SERVICES
import StatsApi from './Services';


export const STATS_ACTIONS = {
  STATS_GET_REALESTATE_BUYERS_WARRANTS: 'STATS_GET_REALESTATE_BUYERS_WARRANTS',
  STATS_GET_REALESTATE_BUYERS_FAVORITES: 'STATS_GET_REALESTATE_BUYERS_FAVORITES',
  STATS_GET_REALESTATE_BIDS: 'STATS_GET_REALESTATE_BIDS',
  STATS_GET_REALESTATE_USER_VIEWS: 'STATS_GET_REALESTATE_USER_VIEWS'
};

export const getRealestateBuyersWarrants = (realEstateCode) => ({
  type: STATS_ACTIONS.STATS_GET_REALESTATE_BUYERS_WARRANTS,
  payload: StatsApi.getRealestateBuyersWarrants(realEstateCode)
});

export const getRealestateBuyersFavorites = (realEstateCode) => ({
  type: STATS_ACTIONS.STATS_GET_REALESTATE_BUYERS_FAVORITES,
  payload: StatsApi.getRealestateBuyersFavorites(realEstateCode)
});

export const getRealestateBids = (realEstateCode) => ({
  type: STATS_ACTIONS.STATS_GET_REALESTATE_BIDS,
  payload: StatsApi.getRealestateBids(realEstateCode)
});


export const getRealestateUserViews = (realEstateCode) => ({
  type: STATS_ACTIONS.STATS_GET_REALESTATE_USER_VIEWS,
  payload: StatsApi.getRealestateUserViews(realEstateCode)
});
