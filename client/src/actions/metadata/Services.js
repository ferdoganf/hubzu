import HttpUtil from '../../common/HttpUtil';
import CookieHelper from '../../common/CookieHelper';

class MetadataApi {
  getRealestateMetadata = () => {
    const request = {
      url: '/rest/metadata/realestate',
      method: 'GET'
    };
    return HttpUtil.makeRequest(request);
  };

  getUserMetadata = () => {
    const request = {
      url: '/rest/metadata/user',
      method: 'GET'
    };
    return HttpUtil.makeRequest(request);
  };



  getSystemDate = () => {
    const request = {
      url: '/rest/metadata/system/date',
      method: 'GET',
      hideLoading: true
    };
    return HttpUtil.makeRequest(request);
  }


  createBank = (bank) => {
    const request = {
      url: '/rest/secure/metadata/banks',
      method: 'POST',
      data: bank,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  updateBank = (code, bank) => {
    const request = {
      url: '/rest/secure/metadata/banks/' + code,
      method: 'PUT',
      data: bank,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getBank = (code) => {
    const request = {
      url: '/rest/secure/metadata/banks/' + code,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getContract = (code) => {
    const request = {
      url: '/rest/metadata/contracts/' + code,
      method: 'GET'
    };
    return HttpUtil.makeRequest(request);
  }

  updateContract = (code, content) => {
    const request = {
      url: '/rest/secure/metadata/contracts/',
      method: 'PUT',
      data: { code: code, content: content },
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }


  searchBank = (searchCriterias) => {
    const request = {
      url: '/rest/secure/metadata/banks/search',
      method: 'POST',
      data: searchCriterias,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getSelectedBank = () => {
    const request = {
      url: '/rest/metadata/system/bank',
      method: 'GET'
    };
    return HttpUtil.makeRequest(request);
  }


  getAllBanks = () => {
    const request = {
      url: '/rest/metadata/system/banks',
      method: 'GET'
    };
    return HttpUtil.makeRequest(request);
  }

  getSmsList = () => {
    const request = {
      url: '/rest/secure/metadata/sms',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getSms = (code) => {
    const request = {
      url: '/rest/secure/metadata/sms/' + code,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  }

  updateSms = (code, content) => {
    const request = {
      url: '/rest/secure/metadata/sms/',
      method: 'PUT',
      data: { code: code, content: content },
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }




  createRealestateSubType = (realEstateSubType) => {
    const request = {
      url: '/rest/secure/metadata/realestatesubtypes',
      method: 'POST',
      data: realEstateSubType,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  updateRealestateSubType = (realestateTypeCode, realestateSubTypeCode, realEstateSubType) => {
    const request = {
      url: '/rest/secure/metadata/realestatesubtypes/' + realestateTypeCode + '/' + realestateSubTypeCode,
      method: 'PUT',
      data: realEstateSubType,
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

  getRealestateSubType = (realestateTypeCode, realestateSubTypeCode) => {
    const request = {
      url: '/rest/secure/metadata/realestatesubtypes/' + realestateTypeCode + '/' + realestateSubTypeCode,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken(),
      }
    };
    return HttpUtil.makeRequest(request);
  }

  deleteRealestateSubType = (realestateTypeCode, realestateSubTypeCode) => {
    const request = {
      url: '/rest/secure/metadata/realestatesubtypes/' + realestateTypeCode + '/' + realestateSubTypeCode,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
      }
    };
    return HttpUtil.makeRequest(request);
  }

}



export default new MetadataApi();