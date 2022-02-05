import HttpUtil from '../../common/HttpUtil';
import CookieHelper from '../../common/CookieHelper';

class ReportApi {

  getRealEstateStatusChanges = (searchCriterias) => {
    const request = {
      url: '/rest/secure/report/realestate/statuschanges',
      method: 'POST',
      data: searchCriterias,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }
}

export default new ReportApi();