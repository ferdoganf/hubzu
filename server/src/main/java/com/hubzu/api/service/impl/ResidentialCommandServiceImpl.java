package com.hubzu.api.service.impl;


import com.hubzu.api.dto.request.metadata.CreateUpdateRealestateSubTypeDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.realestate.building.residential.ResidentialType;
import com.hubzu.api.repository.realestate.building.residential.ResidentialRepository;
import com.hubzu.api.repository.realestate.building.residential.ResidentialTypeRepository;
import com.hubzu.api.service.ResidentialCommandService;
import com.hubzu.api.service.ResidentialQueryService;
import com.hubzu.api.util.ErrorCodes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ResidentialCommandServiceImpl implements ResidentialCommandService {

    @Autowired
    private ResidentialQueryService residentialQueryService;

    @Autowired
    private ResidentialTypeRepository residentialTypeRepository;

    @Autowired
    private ResidentialRepository residentialRepository;

    @Override
    public void createResidentialType(CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO) {
        this.residentialQueryService.checkResidentialTypeExists(createUpdateRealestateSubTypeDTO.getCode());
        ResidentialType residentialType = new ResidentialType();
        residentialType.setCode(createUpdateRealestateSubTypeDTO.getCode());
        residentialType.setForcedName(createUpdateRealestateSubTypeDTO.getForcedName());
        this.residentialTypeRepository.save(residentialType);
    }

    @Override
    public void updateResidentialType(String realestateSubTypeCode, CreateUpdateRealestateSubTypeDTO createUpdateRealestateSubTypeDTO) {
        ResidentialType residentialType = this.residentialQueryService.checkAndGetResidentialType(realestateSubTypeCode);
        residentialType.setForcedName(createUpdateRealestateSubTypeDTO.getForcedName());
        this.residentialTypeRepository.save(residentialType);
    }

    @Override
    public void deleteResidentialType(String realestateSubTypeCode) {
        if (this.residentialRepository.existsByResidentialTypeCodeAndRealEstateTypeNotNull(realestateSubTypeCode)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_SUB_TYPE_IN_USE);
        }
        this.residentialTypeRepository.deleteByCode(realestateSubTypeCode);
    }
}
