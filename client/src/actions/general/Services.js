import HttpUtil from '../../common/HttpUtil';

class GeneralApi {
  contactus = (message) => {
    const request = {
      url: '/rest/general/contactus',
      method: 'POST',
      data: message
    }
    return HttpUtil.makeRequest(request);
  };
}

export default new GeneralApi();