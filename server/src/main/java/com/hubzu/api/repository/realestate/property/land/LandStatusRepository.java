package com.hubzu.api.repository.realestate.property.land;

import com.hubzu.api.model.realestate.property.land.LandStatus;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandStatusRepository extends CodeBaseRepository<LandStatus, Long> {
}
