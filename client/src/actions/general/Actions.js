import GeneralApi from './Services';

export const GENERAL_ACTIONS = {
  GENERAL_CONTACT_US: 'GENERAL_CONTACT_US',
  GENERAL_SET_REDIRECT_FLAG: 'GENERAL_SET_REDIRECT_FLAG'
};

export const generalRedirect = (value) => ({
  type: GENERAL_ACTIONS.GENERAL_SET_REDIRECT_FLAG,
  payload: value
});

export const contactus = (message) => {
  return (dispatch) => {
    const response = dispatch({
      type: GENERAL_ACTIONS.GENERAL_CONTACT_US,
      payload: GeneralApi.contactus(message)
    })
    response.then(() => {
      dispatch(generalRedirect(true))
    });
  }
}