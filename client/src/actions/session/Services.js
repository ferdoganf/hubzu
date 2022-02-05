import HttpUtil from '../../common/HttpUtil';
import CookieHelper from '../../common/CookieHelper';

class SessionApi {

  signIn = (email, password) => {
    const request = {
      auth: {
        username: 'hubzuweb',
        password: 'Fi74nbuD4'
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
    return HttpUtil.makePostDataRequest('/oauth/token', 'grant_type=password&username=' + email + '&password=' + password, request);
  };

  reloadSession = (refreshToken) => {
    const request = {
      auth: {
        username: 'hubzuweb',
        password: 'Fi74nbuD4'
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    return HttpUtil.makePostDataRequest('/oauth/token', 'grant_type=refresh_token&refresh_token=' + refreshToken, request);
  };

  setOAuthCookies(data) {
    return new Promise((resolve, reject) => {
      resolve(CookieHelper.setOAuthCookies(data));
    });
  }

  loadSession = () => {
    const request = {
      url: '/rest/secure/users/user',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };

  setSessionCookies(data) {
    return new Promise((resolve, reject) => {
      resolve(CookieHelper.setSessionCookies(data));
    });
  }

  getUserDataFromCookies() {
    return new Promise((resolve, reject) => {
      resolve(CookieHelper.getUserData());
    });
  }

  signOut() {
    return new Promise((resolve, reject) => {
      resolve(CookieHelper.cleanSessionCookies());
    });
  }
}

export default new SessionApi();