package com.hubzu.api.repository.realestate;

import com.hubzu.api.model.realestate.land.Land;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandRepository extends CodeBaseRepository<Land, Long> {
    boolean existsByLandTypeCodeAndRealEstateTypeNotNull(String realestateSubTypeCode);
}
