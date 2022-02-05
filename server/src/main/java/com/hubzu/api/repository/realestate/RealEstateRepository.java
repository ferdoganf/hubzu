package com.hubzu.api.repository.realestate;

import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealEstateRepository extends CodeBaseRepository<RealEstate, Long> {
}
