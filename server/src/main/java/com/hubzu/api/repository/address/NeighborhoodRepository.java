package com.hubzu.api.repository.address;

import com.hubzu.api.model.address.Neighborhood;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NeighborhoodRepository extends CodeBaseRepository<Neighborhood, Long> {
    List<Neighborhood> findAllByDistrictCityCodeAndDistrictCode(String cityCode, String districtCode);
}
