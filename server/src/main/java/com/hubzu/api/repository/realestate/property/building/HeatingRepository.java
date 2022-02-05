package com.hubzu.api.repository.realestate.property.building;

import com.hubzu.api.model.realestate.property.building.Heating;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeatingRepository extends CodeBaseRepository<Heating, Long> {
}
