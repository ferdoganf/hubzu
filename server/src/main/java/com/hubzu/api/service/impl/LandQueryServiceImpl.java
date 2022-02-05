package com.hubzu.api.service.impl;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.realestate.land.LandDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.realestate.land.Land;
import com.hubzu.api.model.realestate.land.LandType;
import com.hubzu.api.repository.realestate.LandRepository;
import com.hubzu.api.repository.realestate.LandTypeRepository;
import com.hubzu.api.service.LandQueryService;
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
public class LandQueryServiceImpl implements LandQueryService {

    @Autowired
    private LandRepository landRepository;

    @Autowired
    private LandTypeRepository landTypeRepository;


    @Override
    public List<CodeBaseDTO> getLandTypeCodeBaseDTOs() {
        return this.landTypeRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public Land checkAndGetLand(String realEstateCode) {
        return this.landRepository.findByCode(realEstateCode).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_LAND_REAL_ESTATE_NOT_FOUND));
    }

    @Override
    public void checkLandTypeExists(String landTypeCode) {
        if (this.landTypeRepository.existsByCode(landTypeCode)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_SUB_TYPE_ALREADY_EXISTS);
        }
    }

    @Override
    public LandDTO getLandDTO(String realEstateCode) {
        Land land = this.checkAndGetLand(realEstateCode);
        return new LandDTO(land);
    }

    @Override
    public LandType checkAndGetLandType(String landType) {
        if (StringUtils.isEmpty(landType)) {
            return null;
        }
        Map<String, String> errorParams = new HashMap<>();
        errorParams.put("parameter", "LandType");
        return this.landTypeRepository.findByCode(landType).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_PARAM_NOT_FOUND, errorParams));
    }
}
