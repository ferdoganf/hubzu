// IMPORT SERVICES
import AddressApi from './Services';


export const ADDRESS_ACTIONS = {
  ADDRESS_GET_CITIES: 'ADDRESS_GET_CITIES',
  ADDRESS_GET_DISTRICTS: 'ADDRESS_GET_DISTRICTS',
  ADDRESS_GET_DISTRICTS_OF_CITY: 'ADDRESS_GET_DISTRICTS_OF_CITY',
  ADDRESS_GET_NEIGHBORHOODS: 'ADDRESS_GET_NEIGHBORHOODS',
  ADDRESS_GET_NEIGHBORHOODS_OF_DISTRICT: 'ADDRESS_GET_NEIGHBORHOODS_OF_DISTRICT'
};

export const getCities = () => ({
  type: ADDRESS_ACTIONS.ADDRESS_GET_CITIES,
  payload: AddressApi.getCities()
});

export const getDistrictsOfCity = (cityCode, districts) => ({
  type: ADDRESS_ACTIONS.ADDRESS_GET_DISTRICTS_OF_CITY,
  payload: { cityCode: cityCode, districts: districts }
});


export const getDistricts = (cityCode) => {
  return (dispatch) => {
    const response = dispatch({
      type: ADDRESS_ACTIONS.ADDRESS_GET_DISTRICTS,
      payload: AddressApi.getDistricts(cityCode)
    })
    response.then((result) => {
      dispatch(getDistrictsOfCity(cityCode, result.value.data.value))
    })
  }
}

export const getNeighborhoodsOfDistrict = (districtCode, neighborhoods) => ({
  type: ADDRESS_ACTIONS.ADDRESS_GET_NEIGHBORHOODS_OF_DISTRICT,
  payload: { districtCode: districtCode, neighborhoods: neighborhoods }
});

export const getNeighborhoods = (cityCode, districtCode) => {
  return (dispatch) => {
    const response = dispatch({
      type: ADDRESS_ACTIONS.ADDRESS_GET_NEIGHBORHOODS,
      payload: AddressApi.getNeighborhoods(cityCode, districtCode)
    })
    response.then((result) => {
      dispatch(getNeighborhoodsOfDistrict(districtCode, result.value.data.value))
    })
  }
}

