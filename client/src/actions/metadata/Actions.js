// IMPORT SERVICES
import MetadataApi from './Services';


export const METADATA_ACTIONS = {
  METADATA_GET_REALESTATE_METADATA: 'METADATA_GET_REALESTATE_METADATA',
  METADATA_GET_SYSTEM_DATE: 'METADATA_GET_SYSTEM_DATE',
  METADATA_SET_REDIRECT_FLAG: 'METADATA_SET_REDIRECT_FLAG',
  METADATA_CREATE_BANK: 'METADATA_CREATE_BANK',
  METADATA_UPDATE_BANK: 'METADATA_UPDATE_BANK',
  METADATA_SEARCH_BANK: 'METADATA_SEARCH_BANK',
  METADATA_GET_BANK: 'METADATA_GET_BANK',
  METADATA_GET_SELECTED_BANK: 'METADATA_GET_SELECTED_BANK',
  METADATA_GET_ALL_BANKS: 'METADATA_GET_ALL_BANKS',
  METADATA_GET_CONTRACT: 'METADATA_GET_CONTRACT',
  METADATA_GET_USER_METADATA: 'METADATA_GET_USER_METADATA',
  METADATA_GET_SMS_LIST: 'METADATA_GET_SMS_LIST',
  METADATA_GET_SMS: 'METADATA_GET_SMS',
  METADATA_UPDATE_SMS: 'METADATA_UPDATE_SMS',
  METADATA_CREATE_REALESTATE_SUB_TYPE: 'METADATA_CREATE_REALESTATE_SUB_TYPE',
  METADATA_GET_REALESTATE_SUB_TYPE: 'METADATA_GET_REALESTATE_SUB_TYPE',
  METADATA_UPDATE_REALESTATE_SUB_TYPE: 'METADATA_UPDATE_REALESTATE_SUB_TYPE',
  METADATA_DELETE_REALESTATE_SUB_TYPE: 'METADATA_DELETE_REALESTATE_SUB_TYPE'
};


export const metadataRedirect = (value) => ({
  type: METADATA_ACTIONS.METADATA_SET_REDIRECT_FLAG,
  payload: value
});

export const getRealestateMetadata = () => ({
  type: METADATA_ACTIONS.METADATA_GET_REALESTATE_METADATA,
  payload: MetadataApi.getRealestateMetadata()
});

export const getUserMetadata = () => ({
  type: METADATA_ACTIONS.METADATA_GET_USER_METADATA,
  payload: MetadataApi.getUserMetadata()
});



export const getSystemDate = () => ({
  type: METADATA_ACTIONS.METADATA_GET_SYSTEM_DATE,
  payload: MetadataApi.getSystemDate()
});


export const createBank = (bank) => {
  return (dispatch) => {
    const response = dispatch({
      type: METADATA_ACTIONS.METADATA_CREATE_BANK,
      payload: MetadataApi.createBank(bank)
    })
    response.then((result) => {
      dispatch(getBank(result.value.data.value))
    }).then(() => {
      dispatch(metadataRedirect(true))
    })
  }
}

export const updateBank = (code, bank) => {
  return (dispatch) => {
    const response = dispatch({
      type: METADATA_ACTIONS.METADATA_UPDATE_BANK,
      payload: MetadataApi.updateBank(code, bank)
    })
    response.then((result) => {
      dispatch(getBank(result.value.data.value))
    }).then(() => {
      dispatch(metadataRedirect(true))
    })
  }
}

export const getBank = (code) => ({
  type: METADATA_ACTIONS.METADATA_GET_BANK,
  payload: MetadataApi.getBank(code)
});

export const searchBank = (searchCriterias) => ({
  type: METADATA_ACTIONS.METADATA_SEARCH_BANK,
  payload: MetadataApi.searchBank(searchCriterias)
});

export const getSelectedBank = () => ({
  type: METADATA_ACTIONS.METADATA_GET_SELECTED_BANK,
  payload: MetadataApi.getSelectedBank()
});

export const getAllBanks = () => ({
  type: METADATA_ACTIONS.METADATA_GET_ALL_BANKS,
  payload: MetadataApi.getAllBanks()
});


export const getContract = (code) => ({
  type: METADATA_ACTIONS.METADATA_GET_CONTRACT,
  payload: MetadataApi.getContract(code)
});

export const updateContract = (code, content) => {
  return (dispatch) => {
    const response = dispatch({
      type: METADATA_ACTIONS.METADATA_UPDATE_CONTRACT,
      payload: MetadataApi.updateContract(code, content)
    })
    response.then((result) => {
      dispatch(getContract(result.value.data.value))
    }).then(() => {
      dispatch(metadataRedirect(true))
    })
  }
}

export const getSmsList = () => ({
  type: METADATA_ACTIONS.METADATA_GET_SMS_LIST,
  payload: MetadataApi.getSmsList()
});

export const getSms = (code) => ({
  type: METADATA_ACTIONS.METADATA_GET_SMS,
  payload: MetadataApi.getSms(code)
});

export const updateSms = (code, content) => {
  return (dispatch) => {
    const response = dispatch({
      type: METADATA_ACTIONS.METADATA_UPDATE_SMS,
      payload: MetadataApi.updateSms(code, content)
    })
    response.then((result) => {
      dispatch(getSms(result.value.data.value))
    }).then(() => {
      dispatch(metadataRedirect(true))
    })
  }
}

export const createRealestateSubType = (realEstateSubType) => {
  return (dispatch) => {
    const response = dispatch({
      type: METADATA_ACTIONS.METADATA_CREATE_REALESTATE_SUB_TYPE,
      payload: MetadataApi.createRealestateSubType(realEstateSubType)
    })
    response.then((result) => {
      dispatch(getRealestateSubType(result.value.data.value.realestateTypeCode, result.value.data.value.code))
    }).then(() => {
      dispatch(getRealestateMetadata())
    }).then(() => {
      dispatch(metadataRedirect(true))
    })
  }
}

export const updateRealestateSubType = (realestateTypeCode, realestateSubTypeCode, realEstateSubType) => {
  return (dispatch) => {
    const response = dispatch({
      type: METADATA_ACTIONS.METADATA_UPDATE_REALESTATE_SUB_TYPE,
      payload: MetadataApi.updateRealestateSubType(realestateTypeCode, realestateSubTypeCode, realEstateSubType)
    })
    response.then((result) => {
      dispatch(getRealestateSubType(result.value.data.value.realestateTypeCode, result.value.data.value.code))
    }).then(() => {
      dispatch(getRealestateMetadata())
    }).then(() => {
      dispatch(metadataRedirect(true))
    })
  }
}

export const getRealestateSubType = (realestateTypeCode, realestateSubTypeCode) => ({
  type: METADATA_ACTIONS.METADATA_GET_REALESTATE_SUB_TYPE,
  payload: MetadataApi.getRealestateSubType(realestateTypeCode, realestateSubTypeCode)
});


export const deleteRealestateSubType = (realestateTypeCode, realestateSubTypeCode) => {
  return (dispatch) => {
    const response = dispatch({
      type: METADATA_ACTIONS.METADATA_DELETE_REALESTATE_SUB_TYPE,
      payload: MetadataApi.deleteRealestateSubType(realestateTypeCode, realestateSubTypeCode)
    })
    response.then(() => {
      dispatch(getRealestateMetadata())
    })
  }
}