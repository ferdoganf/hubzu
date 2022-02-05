package com.hubzu.api.service;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.realestate.building.ResidentialDTO;
import com.hubzu.api.model.realestate.building.residential.Residential;
import com.hubzu.api.model.realestate.building.residential.ResidentialType;

import java.util.List;

public interface ResidentialQueryService {
    List<CodeBaseDTO> getResidentialTypeCodeBaseDTOs();

    Residential checkAndGetResidential(String realEstateCode);

    ResidentialDTO getResidentialDTO(String realEstateCode);

    ResidentialType checkAndGetResidentialType(String residentialTypeCode);

    void checkResidentialTypeExists(String residentialTypeCode);


}
