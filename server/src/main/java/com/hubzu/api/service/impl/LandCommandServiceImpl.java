package com.hubzu.api.service.impl;

import com.hubzu.api.dto.request.metadata.CreateUpdateRealestateSubTypeDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.realestate.land.LandType;
import com.hubzu.api.repository.realestate.LandRepository;
import com.hubzu.api.repository.realestate.LandTypeRepository;
import com.hubzu.api.service.LandCommandService;
import com.hubzu.api.service.LandQueryService;
import com.hubzu.api.util.ErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LandCommandServiceImpl implements LandCommandService {

    @Autowired
    private LandQueryService landQueryService;

    @Autowired
    private LandTypeRepository landTypeRepository;

    @Autowired
    private LandRepository landRepository;

    @Override
    public void createLandType(CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO) {
        this.landQueryService.checkLandTypeExists(createUpdateRealestateSubTypeDTO.getCode());
        LandType landType = new LandType();
        landType.setCode(createUpdateRealestateSubTypeDTO.getCode());
        landType.setForcedName(createUpdateRealestateSubTypeDTO.getForcedName());
        this.landTypeRepository.save(landType);
    }

    @Override
    public void updateLandType(String realestateSubTypeCode, CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO) {
        LandType landType = this.landQueryService.checkAndGetLandType(realestateSubTypeCode);
        landType.setForcedName(createUpdateRealestateSubTypeDTO.getForcedName());
        this.landTypeRepository.save(landType);
    }

    @Override
    public void deleteLandType(String realestateSubTypeCode) {
        if (this.landRepository.existsByLandTypeCodeAndRealEstateTypeNotNull(realestateSubTypeCode)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_SUB_TYPE_IN_USE);
        }
        this.landTypeRepository.deleteByCode(realestateSubTypeCode);
    }
}
