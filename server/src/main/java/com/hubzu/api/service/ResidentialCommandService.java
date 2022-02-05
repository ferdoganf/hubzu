package com.hubzu.api.service;

import com.hubzu.api.dto.request.metadata.CreateUpdateRealestateSubTypeDTO;

public interface ResidentialCommandService {

    void createResidentialType(CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO);

    void updateResidentialType(String realestateSubTypeCode, CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO);

    void deleteResidentialType(String realestateSubTypeCode);
}
