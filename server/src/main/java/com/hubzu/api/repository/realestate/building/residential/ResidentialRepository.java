package com.hubzu.api.repository.realestate.building.residential;

import com.hubzu.api.model.realestate.building.residential.Residential;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentialRepository extends CodeBaseRepository<Residential, Long> {

    boolean existsByResidentialTypeCode(String realestateSubTypeCode);

    boolean existsByResidentialTypeCodeAndRealEstateTypeNotNull(String realestateSubTypeCode);
}
