import axios from 'axios';
import { showLoading, hideLoading } from './../actions/page/Actions';
import { showErrorModal } from './../actions/page/Actions';
import CookieHelper from './CookieHelper'
import { I18n } from 'react-redux-i18n';

class HttpUtil {
  constructor() {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
  }


  initialize = (dispatch) => {
    this.dispatch = dispatch;
  };

  makeRequest(request) {
    if (!request.hideLoading) {
      this.dispatch(showLoading());
    }
    const newRequest = Object.assign({}, request);
    newRequest.withCredentials = true;

    //console.log(process.env.REACT_APP_BANK_HEADER);
    if (process.env.REACT_APP_BANK_HEADER) {
      const headers = Object.assign({ 'X-Bank': process.env.REACT_APP_BANK_HEADER }, newRequest.headers);
      newRequest.headers = headers;
    }


    return new Promise((resolve, reject) => {
      axios(newRequest).then(
        (response) => {
          if (!newRequest.hideLoading) {
            this.dispatch(hideLoading());
          }
          resolve(response);
        },
        (error) => {
          if (!newRequest.hideLoading) {
            this.dispatch(hideLoading());
          }
          if ((!newRequest.hideLoading)) {
            if (error.response && error.response && error.response.status) {
              if (error.response.status === 401) {
                if (CookieHelper.getRefreshToken()) {
                  CookieHelper.cleanAccessToken();
                } else {
                  this.dispatch(showErrorModal(I18n.t('error.ERROR_401_SESSION_INVALID'), '/signin'));
                }
              } else if (error.response.status === 403) {
                this.dispatch(showErrorModal(I18n.t('error.ERROR_403')));
              } else if (error.response.status === 404) {
                this.dispatch(showErrorModal(I18n.t('error.ERROR_404')));
              } else if (error.response.status === 400) {
                this.dispatch(showErrorModal(I18n.t('error.ERROR_400')));
              } else if (error.response.status === 500) {
                this.dispatch(showErrorModal((error.response.data && error.response.data.message) ? I18n.t('error.' + error.response.data.message, error.response.data.parameters) : I18n.t('error.ERROR_GENERAL')));
              } else {
                this.dispatch(showErrorModal(I18n.t('error.ERROR_GENERAL')));
              }
            } else {
              this.dispatch(showErrorModal(I18n.t('error.ERROR_GENERAL')));
            }
            reject(error.response);
          } else {
            reject();
          }
        }
      );
    });
  }

  makePostDataRequest(url, postData, request) {
    this.dispatch(showLoading());
    const newRequest = Object.assign({}, request);
    newRequest.withCredentials = true;

    //console.log(process.env.REACT_APP_BANK_HEADER);
    if (process.env.REACT_APP_BANK_HEADER) {
      const headers = Object.assign({ 'X-Bank': process.env.REACT_APP_BANK_HEADER }, newRequest.headers);
      newRequest.headers = headers;
    }


    return new Promise((resolve, reject) => {
      axios.post(url, postData, request).then(
        (response) => {
          this.dispatch(hideLoading());
          resolve(response);
        },
        (error) => {
          this.dispatch(hideLoading());
          if (error.response && error.response && error.response.status) {
            if (error.response.status === 401) {
              this.dispatch(showErrorModal(I18n.t('error.ERROR_401')));
            } else if (error.response.status === 403) {
              this.dispatch(showErrorModal(I18n.t('error.ERROR_403')));
            } else if (error.response.status === 404) {
              this.dispatch(showErrorModal(I18n.t('error.ERROR_404')));
            } else if (error.response.status === 400) {
              if ((error.response.data && error.response.data.error === 'invalid_grant')) {
                this.dispatch(showErrorModal(I18n.t('error.ERROR_401_SESSION_INVALID'), '/signin'));
              } else {
                this.dispatch(showErrorModal(I18n.t('error.ERROR_400')));
              }
            } else if (error.response.status === 500) {
              this.dispatch(showErrorModal(I18n.t('error.ERROR_GENERAL')));
            } else {
              this.dispatch(showErrorModal(I18n.t('error.ERROR_GENERAL')));
            }
          } else {
            this.dispatch(showErrorModal(I18n.t('error.ERROR_GENERAL')));
          }
          console.log(error)
          reject(error.response);
        }
      );
    });
  }

}

export default new HttpUtil();
