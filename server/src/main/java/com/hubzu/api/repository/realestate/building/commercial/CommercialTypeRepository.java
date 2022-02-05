package com.hubzu.api.repository.realestate.building.commercial;

import com.hubzu.api.model.realestate.building.commercial.CommercialType;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommercialTypeRepository extends CodeBaseRepository<CommercialType, Long> {
    void deleteByCode(String realestateSubTypeCode);
}
