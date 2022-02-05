import HttpUtil from '../../common/HttpUtil';
import CookieHelper from '../../common/CookieHelper';

class UserApi {

  updatePassword = (code, passwordRequest) => {
    const request = {
      url: '/rest/secure/users/' + code + '/password',
      method: 'PUT',
      data: passwordRequest,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  addToFavorites = (realestateCode) => {
    const request = {
      url: '/rest/secure/users/favorites/realEstates/' + realestateCode,
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };

  removeFromFavorites = (realestateCode) => {
    const request = {
      url: '/rest/secure/users/favorites/realEstates/' + realestateCode,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };

  getFavoritesOfUser = () => {
    const request = {
      url: '/rest/secure/users/favorites',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };

  updateMyPassword = (newPasswordRequest) => {
    const request = {
      url: '/rest/secure/users/password',
      method: 'PUT',
      data: newPasswordRequest,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  activateUser = (code) => {
    const request = {
      url: '/rest/secure/users/' + code + '/status/active',
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  passivateUser = (code) => {
    const request = {
      url: '/rest/secure/users/' + code + '/status/passive',
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getUser = (code) => {
    const request = {
      url: '/rest/secure/users/' + code,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };
}

export default new UserApi();