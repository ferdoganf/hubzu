package com.hubzu.api.service.impl;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.realestate.building.CommercialDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.realestate.building.commercial.Commercial;
import com.hubzu.api.model.realestate.building.commercial.CommercialType;
import com.hubzu.api.repository.realestate.building.commercial.CommercialRepository;
import com.hubzu.api.repository.realestate.building.commercial.CommercialTypeRepository;
import com.hubzu.api.service.CommercialQueryService;
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
public class CommercialQueryServiceImpl implements CommercialQueryService {

    @Autowired
    private CommercialRepository commercialRepository;

    @Autowired
    private CommercialTypeRepository commercialTypeRepository;


    @Override
    public List<CodeBaseDTO> getCommercialTypeCodeBaseDTOs() {
        return this.commercialTypeRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public Commercial checkAndGetCommercial(String realEstateCode) {
        return this.commercialRepository.findByCode(realEstateCode).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_COMMERCIAL_REAL_ESTATE_NOT_FOUND));
    }

    @Override
    public CommercialDTO geCommercialDTO(String realEstateCode) {
        Commercial commercial = this.checkAndGetCommercial(realEstateCode);
        return new CommercialDTO(commercial);
    }

    @Override
    public CommercialType checkAndGetCommercialType(String commercialType) {
        if (StringUtils.isEmpty(commercialType)) {
            return null;
        }

        Map<String, String> errorParams = new HashMap<>();
        errorParams.put("parameter", "CommercialType");

        return this.commercialTypeRepository.findByCode(commercialType).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_PARAM_NOT_FOUND, errorParams));
    }

    @Override
    public void checkCommercialTypeExists(String commercialTypeCode) {
        if (this.commercialTypeRepository.existsByCode(commercialTypeCode)) {
            throw new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_SUB_TYPE_ALREADY_EXISTS);
        }
    }
}
