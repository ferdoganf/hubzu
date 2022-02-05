import HttpUtil from '../../common/HttpUtil';
import CookieHelper from '../../common/CookieHelper';

class BuyerApi {

  createBuyer = (buyer) => {
    const request = {
      url: '/rest/secure/buyers',
      method: 'POST',
      data: buyer,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  updateBuyer = (code, buyer) => {
    const request = {
      url: '/rest/secure/buyers/' + code,
      method: 'PUT',
      data: buyer,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  deleteBuyer = (code) => {
    const request = {
      url: '/rest/secure/buyers/' + code,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }


  getBuyer = (code) => {
    const request = {
      url: '/rest/secure/buyers/' + code,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };

  searchBuyer = (searchCriterias) => {
    const request = {
      url: '/rest/secure/buyers/search',
      method: 'POST',
      data: searchCriterias,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getWarrantedBuyersOfRealestate = (realEstateCode) => {
    const request = {
      url: '/rest/secure/buyers/warrant/realEstates/' + realEstateCode + '/buyers',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };


  updateWarrantedBuyersOfRealestate = (code, buyers) => {
    const request = {
      url: '/rest/secure/buyers/warrant/realEstates/' + code + '/buyers',
      method: 'PUT',
      data: buyers,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  updateRealEstateWarrantsOfBuyer = (code, realestates) => {
    const request = {
      url: '/rest/secure/buyers/warrant/buyers/' + code + '/realEstates',
      method: 'PUT',
      data: realestates,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getWarrantedRealestatesOfBuyer = (buyerCode) => {
    const request = {
      url: '/rest/secure/buyers/warrant/buyers/' + buyerCode + '/realEstates',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };

  getWarrantedRealestatesOfCurrentBuyer = () => {
    const request = {
      url: '/rest/secure/buyers/warrant/buyer/realEstates',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };



}

export default new BuyerApi();