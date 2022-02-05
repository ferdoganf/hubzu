import HttpUtil from '../../common/HttpUtil';

class AddressApi {

  getCities = () => {
    const request = {
      url: '/rest/address/cities',
      method: 'GET'
    };
    return HttpUtil.makeRequest(request);
  };

  getDistricts = (cityCode) => {
    const request = {
      url: '/rest/address/cities/' + cityCode + '/districts',
      method: 'GET'
    };
    return HttpUtil.makeRequest(request);
  };

  getNeighborhoods = (cityCode, districtCode) => {
    const request = {
      url: '/rest/address/cities/' + cityCode + '/districts/' + districtCode + '/neighborhoods',
      method: 'GET'
    };
    return HttpUtil.makeRequest(request);
  };
}

export default new AddressApi();