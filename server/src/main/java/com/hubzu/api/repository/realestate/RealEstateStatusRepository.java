package com.hubzu.api.repository.realestate;

import com.hubzu.api.model.realestate.RealEstateStatus;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealEstateStatusRepository extends CodeBaseRepository<RealEstateStatus, Long> {

}
