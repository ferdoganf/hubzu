package com.hubzu.api.repository.realestate.property.building.commercial;

import com.hubzu.api.model.realestate.property.building.commercial.GeneralProperty;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralPropertyRepository extends CodeBaseRepository<GeneralProperty, Long> {
}
