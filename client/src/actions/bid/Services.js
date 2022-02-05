import HttpUtil from '../../common/HttpUtil';
import CookieHelper from '../../common/CookieHelper';

class BidApi {

  createBid = (bid) => {
    const request = {
      url: '/rest/secure/bids',
      method: 'POST',
      data: bid,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getBidsOfBuyer = () => {
    const request = {
      url: '/rest/secure/bids',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };

  getBidsOfRealestate = (code) => {
    const request = {
      url: '/rest/secure/bids/realestates/' + code,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };

  createAutoBid = (autoBid) => {
    const request = {
      url: '/rest/secure/bids/auto',
      method: 'POST',
      data: autoBid,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  updateAutoBid = (autoBid) => {
    const request = {
      url: '/rest/secure/bids/auto',
      method: 'PUT',
      data: autoBid,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  deleteAutoBid = (code) => {
    const request = {
      url: '/rest/secure/bids/auto/' + code,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getAutoBidsOfBuyer = () => {
    const request = {
      url: '/rest/secure/bids/auto',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };

  getAutoBid = (code) => {
    const request = {
      url: '/rest/secure/bids/auto/' + code,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  buyInAdvance = (realestate) => {
    const request = {
      url: '/rest/secure/bids/inadvance',
      method: 'POST',
      data: realestate,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getDirectBidsOfRealestate = (code) => {
    const request = {
      url: '/rest/secure/bids/direct/realestates/' + code,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };

  createDirectBid = (bid) => {
    const request = {
      url: '/rest/secure/bids/direct',
      method: 'POST',
      data: bid,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }



}

export default new BidApi();