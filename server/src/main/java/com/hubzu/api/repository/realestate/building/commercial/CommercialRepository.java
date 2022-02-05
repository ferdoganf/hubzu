package com.hubzu.api.repository.realestate.building.commercial;

import com.hubzu.api.model.realestate.building.commercial.Commercial;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommercialRepository extends CodeBaseRepository<Commercial, Long> {
    boolean existsByCommercialTypeCodeAndRealEstateTypeNotNull(String realestateSubTypeCode);
}
