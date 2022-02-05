// IMPORT SERVICES
import ReportApi from './Services';


export const REPORT_ACTIONS = {
  REPORT_SET_REDIRECT_FLAG: 'REPORT_SET_REDIRECT_FLAG',
  REPORT_GET_REALESTATE_STATUS_CHANGES: 'REPORT_GET_REALESTATE_STATUS_CHANGES'
};

export const reportRedirect = (value) => ({
  type: REPORT_ACTIONS.REPORT_SET_REDIRECT_FLAG,
  payload: value
});


export const getRealEstateStatusChanges = (searchCriterias) => ({
  type: REPORT_ACTIONS.REPORT_GET_REALESTATE_STATUS_CHANGES,
  payload: ReportApi.getRealEstateStatusChanges(searchCriterias)
});