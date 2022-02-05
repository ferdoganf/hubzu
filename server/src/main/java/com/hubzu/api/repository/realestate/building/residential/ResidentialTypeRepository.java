package com.hubzu.api.repository.realestate.building.residential;

import com.hubzu.api.model.realestate.building.residential.ResidentialType;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentialTypeRepository extends CodeBaseRepository<ResidentialType, Long> {
    void deleteByCode(String realestateSubTypeCode);
}
