package com.hubzu.api.service.impl;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.realestate.building.ResidentialDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.realestate.building.residential.Residential;
import com.hubzu.api.model.realestate.building.residential.ResidentialType;
import com.hubzu.api.repository.realestate.building.residential.ResidentialRepository;
import com.hubzu.api.repository.realestate.building.residential.ResidentialTypeRepository;
import com.hubzu.api.service.ResidentialQueryService;
import com.hubzu.api.util.ErrorCodes;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ResidentialQueryServiceImpl implements ResidentialQueryService {
    @Autowired
    private ResidentialRepository residentialRepository;

    @Autowired
    private ResidentialTypeRepository residentialTypeRepository;


    @Override
    public List<CodeBaseDTO> getResidentialTypeCodeBaseDTOs() {
        return this.residentialTypeRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public Residential checkAndGetResidential(String realEstateCode) {
        return this.residentialRepository.findByCode(realEstateCode).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_RESIDENTIAL_REAL_ESTATE_NOT_FOUND));
    }

    @Override
    public ResidentialDTO getResidentialDTO(String realEstateCode) {
        Residential residential = this.checkAndGetResidential(realEstateCode);
        return new ResidentialDTO(residential);
    }

    @Override
    public ResidentialType checkAndGetResidentialType(String residentialType) {
        if (StringUtils.isEmpty(residentialType)) {
            return null;
        }
        Map<String, String> errorParams = new HashMap<>();
        errorParams.put("parameter", "ResidentialType");
        return this.residentialTypeRepository.findByCode(residentialType).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_PARAM_NOT_FOUND, errorParams));
    }

    @Override
    public void checkResidentialTypeExists(String residentialTypeCode) {
        if (this.residentialTypeRepository.existsByCode(residentialTypeCode)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_SUB_TYPE_ALREADY_EXISTS);
        }
    }
}
