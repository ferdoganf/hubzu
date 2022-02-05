package com.hubzu.api.service;

import com.hubzu.api.dto.request.metadata.CreateUpdateRealestateSubTypeDTO;

public interface LandCommandService {
    void createLandType(CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO);

    void updateLandType(String realestateSubTypeCode, CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO);

    void deleteLandType(String realestateSubTypeCode);
}
