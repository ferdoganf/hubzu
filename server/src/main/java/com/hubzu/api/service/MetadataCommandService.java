package com.hubzu.api.service;

import com.hubzu.api.dto.metadata.RealEstateSubTypeDTO;
import com.hubzu.api.dto.request.metadata.CreateUpdateRealestateSubTypeDTO;

public interface MetadataCommandService {

    RealEstateSubTypeDTO createRealestateSubType(CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO);

    RealEstateSubTypeDTO updateRealestateSubType(String realestateTypeCode, String realestateSubTypeCode, CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO);

    void deleteRealestateSubType(String realestateTypeCode, String realestateSubTypeCode);
}
