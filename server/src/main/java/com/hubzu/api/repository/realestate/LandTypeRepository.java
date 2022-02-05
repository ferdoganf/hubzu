package com.hubzu.api.repository.realestate;

import com.hubzu.api.model.realestate.land.LandType;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandTypeRepository extends CodeBaseRepository<LandType, Long> {
    void deleteByCode(String realestateSubTypeCode);
}
