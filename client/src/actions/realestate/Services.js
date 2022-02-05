import HttpUtil from '../../common/HttpUtil';
import CookieHelper from '../../common/CookieHelper';

class RealestateApi {

  createRealestate = (realestate) => {
    const request = {
      url: '/rest/secure/realestates',
      method: 'POST',
      data: realestate,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  updateRealestate = (realestateCode, realestate) => {
    const request = {
      url: '/rest/secure/realestates/' + realestateCode,
      method: 'PUT',
      data: realestate,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  deleteRealestate = (realestateCode) => {
    const request = {
      url: '/rest/secure/realestates/' + realestateCode,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  copyRealestate = (realestateCode) => {
    const request = {
      url: '/rest/secure/realestates/' + realestateCode + '/copy',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getRealestate = (code) => {
    const request = {
      url: '/rest/secure/realestates/' + code,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };

  updateRealestateDetails = (realestateCode, realEstateType, realEstate) => {
    const request = {
      url: '/rest/secure/realestates/' + realestateCode + '/' + realEstateType,
      method: 'PUT',
      data: realEstate,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  updateAddress = (realestateCode, addressRequest) => {
    const request = {
      url: '/rest/secure/realestates/' + realestateCode + '/address',
      method: 'PUT',
      data: addressRequest,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  uploadPhoto = (realestateCode, photo) => {
    const request = {
      url: '/rest/secure/realestates/' + realestateCode + '/photo',
      method: 'POST',
      data: photo,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      },
      hideLoading: true
    };
    return HttpUtil.makeRequest(request);
  }

  deletePhoto = (realestateCode, photoCode) => {
    const request = {
      url: '/rest/secure/realestates/' + realestateCode + '/photo/' + photoCode,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      },
      hideLoading: true
    };
    return HttpUtil.makeRequest(request);
  }

  searchRealestate = (searchCriterias) => {
    const request = {
      url: '/rest/secure/realestates/search',
      method: 'POST',
      data: searchCriterias,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  searchRealestatePublic = (searchCriterias, hideLoading) => {
    const request = {
      url: '/rest/realestates/search',
      method: 'POST',
      data: searchCriterias,
      hideLoading: hideLoading
    };
    return HttpUtil.makeRequest(request);
  }

  getRealestatePublic = (code, hideLoading) => {
    if (CookieHelper.getAccessToken()) {
      const request = {
        url: '/rest/realestates/' + code,
        method: 'GET',
        hideLoading: hideLoading,
        headers: {
          'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
        }
      };
      return HttpUtil.makeRequest(request);
    } else {
      const request = {
        url: '/rest/realestates/' + code,
        method: 'GET',
        hideLoading: hideLoading
      };
      return HttpUtil.makeRequest(request);
    }
  };

  getRealestateDepositAmount = (code, hideLoading) => {
    const request = {
      url: '/rest/realestates/' + code + '/depositamount',
      method: 'GET',
      hideLoading: hideLoading
    };
    return HttpUtil.makeRequest(request);
  };


  getRealestateCurrentBidAmount = (code, hideLoading) => {
    const request = {
      url: '/rest/realestates/' + code + '/currentbidamount',
      method: 'GET',
      hideLoading: hideLoading
    };
    return HttpUtil.makeRequest(request);
  };


  updateRealestateStatus = (realestateCode, status) => {
    const request = {
      url: '/rest/secure/realestates/' + realestateCode + '/status/' + status,
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }
  updateRealestateEndDate = (realestateCode, endDate) => {
    const request = {
      url: '/rest/secure/realestates/' + realestateCode + '/enddate?enddate=' + endDate,
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }


  getFavoritedBuyers = (code) => {
    const request = {
      url: '/rest/secure/realestates/' + code + '/favorites',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  };
}

export default new RealestateApi();