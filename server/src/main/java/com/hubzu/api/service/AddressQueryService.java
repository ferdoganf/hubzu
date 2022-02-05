package com.hubzu.api.service;

import com.hubzu.api.dto.address.CityDTO;
import com.hubzu.api.dto.address.DistrictDTO;
import com.hubzu.api.dto.address.NeighborhoodDTO;
import com.hubzu.api.model.address.City;
import com.hubzu.api.model.address.District;
import com.hubzu.api.model.address.Neighborhood;

import java.util.List;

public interface AddressQueryService {

    List<CityDTO> getAllCities();

    List<DistrictDTO> getDistrictsOfCity(String cityCode);

    List<NeighborhoodDTO> getNeighborhoodsOfDistrictsOfCity(String cityCode, String districtCode);

    City getCity(String code);

    District getDistrict(String code);

    Neighborhood getNeighborhood(String code);
}
