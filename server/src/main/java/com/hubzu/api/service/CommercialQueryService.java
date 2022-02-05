package com.hubzu.api.service;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.realestate.building.CommercialDTO;
import com.hubzu.api.model.realestate.building.commercial.Commercial;
import com.hubzu.api.model.realestate.building.commercial.CommercialType;

import java.util.List;


public interface CommercialQueryService {

    List<CodeBaseDTO> getCommercialTypeCodeBaseDTOs();

    Commercial checkAndGetCommercial(String realEstateCode);

    CommercialDTO geCommercialDTO(String realEstateCode);

    CommercialType checkAndGetCommercialType(String commercialTypeCode);

    void checkCommercialTypeExists(String commercialTypeCode);
}
