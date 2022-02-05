package com.hubzu.api.service.impl;

import com.hubzu.api.dto.metadata.RealEstateSubTypeDTO;
import com.hubzu.api.dto.request.metadata.CreateUpdateRealestateSubTypeDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.service.*;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MetadataCommandServiceImpl implements MetadataCommandService {

    @Autowired
    private ResidentialCommandService residentialCommandService;
    @Autowired
    private CommercialCommandService commercialCommandService;
    @Autowired
    private LandCommandService landCommandService;

    @Autowired
    private MetadataQueryService metadataQueryService;

    @Override
    public RealEstateSubTypeDTO createRealestateSubType(CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO) {

        if (BusinessConstants.RealEstateType.RESIDENTIAL.equals(createUpdateRealestateSubTypeDTO.getRealEstateTypeCode())) {
            this.residentialCommandService.createResidentialType(createUpdateRealestateSubTypeDTO);
        } else if (BusinessConstants.RealEstateType.COMMERCIAL.equals(createUpdateRealestateSubTypeDTO.getRealEstateTypeCode())) {
            this.commercialCommandService.createCommercialType(createUpdateRealestateSubTypeDTO);
        } else if (BusinessConstants.RealEstateType.LAND.equals(createUpdateRealestateSubTypeDTO.getRealEstateTypeCode())) {
            this.landCommandService.createLandType(createUpdateRealestateSubTypeDTO);
        } else {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_TYPE_NOT_FOUND);
        }
        return this.metadataQueryService.getRealEstateSubTypeDTO(createUpdateRealestateSubTypeDTO.getRealEstateTypeCode(), createUpdateRealestateSubTypeDTO.getCode());
    }

    @Override
    public RealEstateSubTypeDTO updateRealestateSubType(String realestateTypeCode, String realestateSubTypeCode, CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO) {
        if (BusinessConstants.RealEstateType.RESIDENTIAL.equals(realestateTypeCode)) {
            this.residentialCommandService.updateResidentialType(realestateSubTypeCode, createUpdateRealestateSubTypeDTO);
        } else if (BusinessConstants.RealEstateType.COMMERCIAL.equals(realestateTypeCode)) {
            this.commercialCommandService.updateCommercialType(realestateSubTypeCode, createUpdateRealestateSubTypeDTO);
        } else if (BusinessConstants.RealEstateType.LAND.equals(realestateTypeCode)) {
            this.landCommandService.updateLandType(realestateSubTypeCode, createUpdateRealestateSubTypeDTO);
        } else {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_TYPE_NOT_FOUND);
        }
        return this.metadataQueryService.getRealEstateSubTypeDTO(realestateTypeCode, realestateSubTypeCode);
    }

    @Override
    public void deleteRealestateSubType(String realestateTypeCode, String realestateSubTypeCode) {
        if (BusinessConstants.RealEstateType.RESIDENTIAL.equals(realestateTypeCode)) {
            this.residentialCommandService.deleteResidentialType(realestateSubTypeCode);
        } else if (BusinessConstants.RealEstateType.COMMERCIAL.equals(realestateTypeCode)) {
            this.commercialCommandService.deleteCommercialType(realestateSubTypeCode);
        } else if (BusinessConstants.RealEstateType.LAND.equals(realestateTypeCode)) {
            this.landCommandService.deleteLandType(realestateSubTypeCode);
        } else {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_TYPE_NOT_FOUND);
        }
    }
}
