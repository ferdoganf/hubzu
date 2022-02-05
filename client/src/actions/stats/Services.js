import HttpUtil from '../../common/HttpUtil';
import CookieHelper from '../../common/CookieHelper';

class StatsApi {

  getRealestateBuyersWarrants = (realEstateCode) => {
    const request = {
      url: '/rest/secure/stats/realestate/' + realEstateCode + '/buyers/warrants',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getRealestateBuyersFavorites = (realEstateCode) => {
    const request = {
      url: '/rest/secure/stats/realestate/' + realEstateCode + '/buyers/favorites',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getRealestateBids = (realEstateCode) => {
    const request = {
      url: '/rest/secure/stats/realestate/' + realEstateCode + '/bids',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getRealestateUserViews = (realEstateCode) => {
    const request = {
      url: '/rest/secure/stats/realestate/' + realEstateCode + '/user/views',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

}

export default new StatsApi();