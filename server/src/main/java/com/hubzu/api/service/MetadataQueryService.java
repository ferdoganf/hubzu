package com.hubzu.api.service;

import com.hubzu.api.dto.metadata.RealEstateSubTypeDTO;

public interface MetadataQueryService {

    RealEstateSubTypeDTO getRealEstateSubTypeDTO(String realestateTypeCode, String realestateSubTypeCode);
}
