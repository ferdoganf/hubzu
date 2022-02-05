package com.hubzu.api.repository.address;

import com.hubzu.api.model.address.District;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepository extends CodeBaseRepository<District, Long> {
    List<District> findAllByCityCode(String cityCode);
}
