import HttpUtil from '../../common/HttpUtil';
import CookieHelper from '../../common/CookieHelper';

class VisitorApi {

  createVisitor = (visitor) => {
    const request = {
      url: '/rest/visitors',
      method: 'POST',
      data: visitor
    };
    return HttpUtil.makeRequest(request);
  }

  createVisitorVerify = (code) => {
    const request = {
      url: '/rest/visitors/verify/' + code,
      method: 'GET'
    };
    return HttpUtil.makeRequest(request);
  };

  updateVisitor = (code, visitor) => {
    const request = {
      url: '/rest/secure/visitors/' + code,
      method: 'PUT',
      data: visitor,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getVisitor = (code) => {
    const request = {
      url: '/rest/secure/visitors/' + code,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  };
  searchVisitor = (searchCriterias) => {
    const request = {
      url: '/rest/secure/visitors/search',
      method: 'POST',
      data: searchCriterias,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }
}

export default new VisitorApi();