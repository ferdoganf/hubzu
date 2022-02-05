package com.hubzu.api.service.impl;

import com.hubzu.api.dto.request.metadata.CreateUpdateRealestateSubTypeDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.realestate.building.commercial.CommercialType;
import com.hubzu.api.repository.realestate.building.commercial.CommercialRepository;
import com.hubzu.api.repository.realestate.building.commercial.CommercialTypeRepository;
import com.hubzu.api.service.CommercialCommandService;
import com.hubzu.api.service.CommercialQueryService;
import com.hubzu.api.util.ErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommercialCommandServiceImpl implements CommercialCommandService {

    @Autowired
    private CommercialQueryService commercialQueryService;

    @Autowired
    private CommercialTypeRepository commercialTypeRepository;

    @Autowired
    private CommercialRepository commercialRepository;

    @Override
    public void createCommercialType(CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO) {
        this.commercialQueryService.checkCommercialTypeExists(createUpdateRealestateSubTypeDTO.getCode());
        CommercialType commercialType = new CommercialType();
        commercialType.setCode(createUpdateRealestateSubTypeDTO.getCode());
        commercialType.setForcedName(createUpdateRealestateSubTypeDTO.getForcedName());
        this.commercialTypeRepository.save(commercialType);

    }

    @Override
    public void updateCommercialType(String realestateSubTypeCode, CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO) {
        CommercialType commercialType = this.commercialQueryService.checkAndGetCommercialType(realestateSubTypeCode);
        commercialType.setForcedName(createUpdateRealestateSubTypeDTO.getForcedName());
        this.commercialTypeRepository.save(commercialType);
    }

    @Override
    public void deleteCommercialType(String realestateSubTypeCode) {
        if (this.commercialRepository.existsByCommercialTypeCodeAndRealEstateTypeNotNull(realestateSubTypeCode)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_SUB_TYPE_IN_USE);
        }
        this.commercialTypeRepository.deleteByCode(realestateSubTypeCode);
    }
}
