package com.hubzu.api.repository.address;

import com.hubzu.api.model.address.City;
import com.hubzu.api.repository.base.CodeBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CodeBaseRepository<City, Long> {
}
