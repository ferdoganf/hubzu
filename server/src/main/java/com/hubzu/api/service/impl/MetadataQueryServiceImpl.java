package com.hubzu.api.service.impl;

import com.hubzu.api.dto.metadata.RealEstateSubTypeDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.realestate.building.commercial.CommercialType;
import com.hubzu.api.model.realestate.building.residential.ResidentialType;
import com.hubzu.api.model.realestate.land.LandType;
import com.hubzu.api.service.CommercialQueryService;
import com.hubzu.api.service.LandQueryService;
import com.hubzu.api.service.MetadataQueryService;
import com.hubzu.api.service.ResidentialQueryService;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class MetadataQueryServiceImpl implements MetadataQueryService {

    @Autowired
    private ResidentialQueryService residentialQueryService;
    @Autowired
    private CommercialQueryService commercialQueryService;
    @Autowired
    private LandQueryService landQueryService;

    @Override
    public RealEstateSubTypeDTO getRealEstateSubTypeDTO(String realestateTypeCode, String realestateSubTypeCode) {
        if (BusinessConstants.RealEstateType.RESIDENTIAL.equals(realestateTypeCode)) {
            ResidentialType residentialType = this.residentialQueryService.checkAndGetResidentialType(realestateSubTypeCode);
            return new RealEstateSubTypeDTO(realestateTypeCode, residentialType);
        } else if (BusinessConstants.RealEstateType.COMMERCIAL.equals(realestateTypeCode)) {
            CommercialType commercialType = this.commercialQueryService.checkAndGetCommercialType(realestateSubTypeCode);
            return new RealEstateSubTypeDTO(realestateTypeCode, commercialType);
        } else if (BusinessConstants.RealEstateType.LAND.equals(realestateTypeCode)) {
            LandType landType = this.landQueryService.checkAndGetLandType(realestateSubTypeCode);
            return new RealEstateSubTypeDTO(realestateTypeCode, landType);
        } else {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_TYPE_NOT_FOUND);
        }
    }
}
