package com.hubzu.api.repository.realestate;

import com.hubzu.api.model.realestate.RealEstateType;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealEstateTypeRepository extends CodeBaseRepository<RealEstateType, Long> {
}
