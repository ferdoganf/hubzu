package com.hubzu.api.service.impl;

import com.hubzu.api.dto.address.CityDTO;
import com.hubzu.api.dto.address.DistrictDTO;
import com.hubzu.api.dto.address.NeighborhoodDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.address.City;
import com.hubzu.api.model.address.District;
import com.hubzu.api.model.address.Neighborhood;
import com.hubzu.api.repository.address.CityRepository;
import com.hubzu.api.repository.address.DistrictRepository;
import com.hubzu.api.repository.address.NeighborhoodRepository;
import com.hubzu.api.service.AddressQueryService;
import com.hubzu.api.util.ErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Collator;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AddressQueryServiceImpl implements AddressQueryService {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private DistrictRepository districtRepository;

    @Autowired
    private NeighborhoodRepository neighborhoodRepository;

    @Override
    public List<CityDTO> getAllCities() {
        List<CityDTO> cityDTOS = this.cityRepository.findAll().stream().map(CityDTO::new).collect(Collectors.toList());
        Collections.sort(cityDTOS, new Comparator<CityDTO>() {
            @Override
            public int compare(CityDTO s1, CityDTO s2) {
                Collator collator = Collator.getInstance(new Locale("tr", "TR"));
                return collator.compare(s1.getName(), s2.getName());
            }
        });
        return cityDTOS;
    }

    @Override
    public List<DistrictDTO> getDistrictsOfCity(String cityCode) {
        List<District> districts = this.districtRepository.findAllByCityCode(cityCode);
        List<DistrictDTO> districtDTOS = districts.stream().map(DistrictDTO::new).collect(Collectors.toList());
        Collections.sort(districtDTOS, new Comparator<DistrictDTO>() {
            @Override
            public int compare(DistrictDTO s1, DistrictDTO s2) {
                Collator collator = Collator.getInstance(new Locale("tr", "TR"));
                return collator.compare(s1.getName(), s2.getName());
            }
        });
        return districtDTOS;
    }

    @Override
    public List<NeighborhoodDTO> getNeighborhoodsOfDistrictsOfCity(String cityCode, String districtCode) {
        List<Neighborhood> neighborhoods = this.neighborhoodRepository.findAllByDistrictCityCodeAndDistrictCode(cityCode, districtCode);
        List<NeighborhoodDTO> neighborhoodDTOS = neighborhoods.stream().map(NeighborhoodDTO::new).collect(Collectors.toList());
        Collections.sort(neighborhoodDTOS, new Comparator<NeighborhoodDTO>() {
            @Override
            public int compare(NeighborhoodDTO s1, NeighborhoodDTO s2) {
                Collator collator = Collator.getInstance(new Locale("tr", "TR"));
                return collator.compare(s1.getName(), s2.getName());
            }
        });
        return neighborhoodDTOS;
    }

    @Override
    public City getCity(String code) {
        return this.cityRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_CITY_NOT_FOUND));
    }

    @Override
    public District getDistrict(String code) {
        return this.districtRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_DISTRICT_NOT_FOUND));
    }

    @Override
    public Neighborhood getNeighborhood(String code) {
        return this.neighborhoodRepository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_NEIGHBORHOOD_NOT_FOUND));
    }

}
