package com.hubzu.api.service;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.realestate.land.LandDTO;
import com.hubzu.api.model.realestate.land.Land;
import com.hubzu.api.model.realestate.land.LandType;

import java.util.List;

public interface LandQueryService {
    List<CodeBaseDTO> getLandTypeCodeBaseDTOs();

    LandDTO getLandDTO(String realEstateCode);

    LandType checkAndGetLandType(String landTypeCode);

    Land checkAndGetLand(String realEstateCode);

    void checkLandTypeExists(String landTypeCode);
}
