package com.hubzu.api.service;

import com.hubzu.api.dto.request.metadata.CreateUpdateRealestateSubTypeDTO;

public interface CommercialCommandService {

    void createCommercialType(CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO);

    void updateCommercialType(String realestateSubTypeCode, CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO);

    void deleteCommercialType(String realestateSubTypeCode);
}
