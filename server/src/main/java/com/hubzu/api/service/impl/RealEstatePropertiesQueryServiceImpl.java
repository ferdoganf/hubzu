package com.hubzu.api.service.impl;


import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.exception.HubzuBusinessException;
import com.hubzu.api.model.base.CodeBaseEntity;
import com.hubzu.api.model.realestate.RealEstateType;
import com.hubzu.api.model.realestate.property.building.AgeOfBuilding;
import com.hubzu.api.model.realestate.property.building.Frontage;
import com.hubzu.api.model.realestate.property.building.Heating;
import com.hubzu.api.model.realestate.property.building.UseStatus;
import com.hubzu.api.model.realestate.property.building.commercial.GeneralProperty;
import com.hubzu.api.model.realestate.property.building.residental.*;
import com.hubzu.api.model.realestate.property.land.*;
import com.hubzu.api.repository.base.CodeBaseRepository;
import com.hubzu.api.repository.realestate.RealEstateTypeRepository;
import com.hubzu.api.repository.realestate.property.building.AgeOfBuildingRepository;
import com.hubzu.api.repository.realestate.property.building.FrontageRepository;
import com.hubzu.api.repository.realestate.property.building.HeatingRepository;
import com.hubzu.api.repository.realestate.property.building.UseStatusRepository;
import com.hubzu.api.repository.realestate.property.building.commercial.GeneralPropertyRepository;
import com.hubzu.api.repository.realestate.property.building.residental.*;
import com.hubzu.api.repository.realestate.property.land.*;
import com.hubzu.api.service.RealEstatePropertiesQueryService;
import com.hubzu.api.util.ErrorCodes;
import lombok.SneakyThrows;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class RealEstatePropertiesQueryServiceImpl implements RealEstatePropertiesQueryService {

    @Autowired
    private AgeOfBuildingRepository ageOfBuildingRepository;

    @Autowired
    private HeatingRepository heatingRepository;

    @Autowired
    private UseStatusRepository useStatusRepository;

    @Autowired
    private FrontageRepository frontageRepository;

    @Autowired
    private NumberOfRoomsRepository numberOfRoomsRepository;

    @Autowired
    private FloorNumberRepository floorNumberRepository;

    @Autowired
    private NumberOfFloorsRepository numberOfFloorsRepository;

    @Autowired
    private NumberOfBathroomsRepository numberOfBathroomsRepository;

    @Autowired
    private BalconyRepository balconyRepository;

    @Autowired
    private FurnishedRepository furnishedRepository;

    @Autowired
    private BuildingComplexRepository buildingComplexRepository;

    @Autowired
    private EligibleForBankCreditRepository eligibleForBankCreditRepository;

    @Autowired
    private InteriorPropertyRepository interiorPropertyRepository;

    @Autowired
    private ExternalPropertyRepository externalPropertyRepository;

    @Autowired
    private GeneralPropertyRepository generalPropertyRepository;

    @Autowired
    private InfrastructureRepository infrastructureRepository;

    @Autowired
    private LandStatusRepository landStatusRepository;

    @Autowired
    private HeightRestrictionRepository heightRestrictionRepository;

    @Autowired
    private LandToBuildingRatioRepository landToBuildingRatioRepository;

    @Autowired
    private GeneralFeatureRepository generalFeatureRepository;

    @Autowired
    private RealEstateTypeRepository realEstateTypeRepository;


    @Override
    public List<CodeBaseDTO> getUseStatusTypeCodeBaseDTOs() {
        return this.useStatusRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getAgeOfBuildingTypeCodeBaseDTOs() {
        return this.ageOfBuildingRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getHeatingTypeCodeBaseDTOs() {
        return this.heatingRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getFrontageTypeCodeBaseDTOs() {
        return this.frontageRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getNumberOfRoomsTypeCodeBaseDTOs() {
        return this.numberOfRoomsRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getFloorNumberTypeCodeBaseDTOs() {
        return this.floorNumberRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getNumberOfFloorsTypeCodeBaseDTOs() {
        return this.numberOfFloorsRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());

    }

    @Override
    public List<CodeBaseDTO> getNumberOfBathroomsTypeCodeBaseDTOs() {
        return this.numberOfBathroomsRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getBalconyTypeCodeBaseDTOs() {
        return this.balconyRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getFurnishedTypeCodeBaseDTOs() {
        return this.furnishedRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getBuildingComplexTypeCodeBaseDTOs() {
        return this.buildingComplexRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getEligibleForBankCreditTypeCodeBaseDTOs() {
        return this.eligibleForBankCreditRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getInteriorPropertyTypeCodeBaseDTOs() {
        return this.interiorPropertyRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getExternalPropertyTypeCodeBaseDTOs() {
        return this.externalPropertyRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getGeneralPropertyTypeCodeBaseDTOs() {
        return this.generalPropertyRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getInfrastructureTypeCodeBaseDTOs() {
        return this.infrastructureRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getGeneralFeatureTypeCodeBaseDTOs() {
        return this.generalFeatureRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getLandToBuildingRatioTypeCodeBaseDTOs() {
        return this.landToBuildingRatioRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getHeightRestrictionTypeCodeBaseDTOs() {
        return this.heightRestrictionRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getLandStatusTypeCodeBaseDTOs() {
        return this.landStatusRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @Override
    public List<CodeBaseDTO> getRealEstateTypeCodeBaseDTOs() {
        return this.realEstateTypeRepository.findAll().stream().map(CodeBaseDTO::new).collect(Collectors.toList());
    }

    @SneakyThrows
    private <T extends CodeBaseRepository, S extends CodeBaseEntity> S checkAndGetParam(T repository, Class<S> className, String code) throws HubzuBusinessException {
        if (StringUtils.isEmpty(code)) {
            return null;
        }
        Map<String, String> errorParams = new HashMap<>();
        errorParams.put("parameter", repository.getClass().getSimpleName());
        return (S) repository.findByCode(code).orElseThrow(() -> new HubzuBusinessException(ErrorCodes.ERROR_REAL_ESTATE_PARAM_NOT_FOUND, errorParams));
    }

    @SneakyThrows
    private <T extends CodeBaseRepository, S extends CodeBaseEntity> List<S> checkAndGetParams(T repository, Class<S> className, List<String> codes) throws HubzuBusinessException {
        List<S> list = new ArrayList<>();
        for (String code : codes) {
            list.add(this.checkAndGetParam(repository, className, code));
        }
        return list;
    }

    @Override
    public NumberOfRooms checkAndGetNumberOfRooms(String numberOfRooms) {
        return this.checkAndGetParam(this.numberOfRoomsRepository, NumberOfRooms.class, numberOfRooms);
    }

    @Override
    public FloorNumber checkAndGetFloorNumber(String floorNumber) {
        return this.checkAndGetParam(this.floorNumberRepository, FloorNumber.class, floorNumber);
    }

    @Override
    public NumberOfFloors checkAndGetNumberOfFloors(String numberOfFloors) {
        return this.checkAndGetParam(this.numberOfFloorsRepository, NumberOfFloors.class, numberOfFloors);
    }

    @Override
    public NumberOfBathrooms checkAndGetNumberOfBathrooms(String numberOfBathrooms) {
        return this.checkAndGetParam(this.numberOfBathroomsRepository, NumberOfBathrooms.class, numberOfBathrooms);
    }

    @Override
    public Balcony checkAndGetBalcony(String balcony) {
        return this.checkAndGetParam(this.balconyRepository, Balcony.class, balcony);

    }

    @Override
    public Furnished checkAndGetFurnished(String furnished) {
        return this.checkAndGetParam(this.furnishedRepository, Furnished.class, furnished);

    }

    @Override
    public BuildingComplex checkAndGetBuildingComplex(String buildingComplex) {
        return this.checkAndGetParam(this.buildingComplexRepository, BuildingComplex.class, buildingComplex);

    }

    @Override
    public EligibleForBankCredit checkAndGetEligibleForBankCredit(String eligibleForBankCredit) {
        return this.checkAndGetParam(this.eligibleForBankCreditRepository, EligibleForBankCredit.class, eligibleForBankCredit);

    }

    @Override
    public List<InteriorProperty> checkAndGetInteriorProperties(List<String> interiorProperties) {
        return this.checkAndGetParams(this.interiorPropertyRepository, InteriorProperty.class, interiorProperties);
    }

    @Override
    public List<ExternalProperty> checkAndGetExternalProperties(List<String> externalProperties) {
        return this.checkAndGetParams(this.externalPropertyRepository, ExternalProperty.class, externalProperties);
    }

    @Override
    public List<Frontage> checkAndGetFrontages(List<String> frontages) {
        return this.checkAndGetParams(this.frontageRepository, Frontage.class, frontages);
    }

    @Override
    public AgeOfBuilding checkAndGetAgeOfBuilding(String ageOfBuilding) {
        return this.checkAndGetParam(this.ageOfBuildingRepository, AgeOfBuilding.class, ageOfBuilding);
    }

    @Override
    public Heating checkAndGetHeating(String heating) {
        return this.checkAndGetParam(this.heatingRepository, Heating.class, heating);
    }

    @Override
    public UseStatus checkAndGetUseStatus(String useStatus) {
        return this.checkAndGetParam(this.useStatusRepository, UseStatus.class, useStatus);
    }

    @Override
    public RealEstateType checkAndGetRealEstateType(String realEstateType) {
        return this.checkAndGetParam(this.realEstateTypeRepository, RealEstateType.class, realEstateType);
    }

    @Override
    public List<GeneralProperty> checkAndGetGeneralProperties(List<String> generalProperties) {
        return this.checkAndGetParams(this.generalPropertyRepository, GeneralProperty.class, generalProperties);
    }

    @Override
    public LandStatus checkAndGetLandStatus(String landStatus) {
        return this.checkAndGetParam(this.landStatusRepository, LandStatus.class, landStatus);
    }

    @Override
    public LandToBuildingRatio checkAndGetLandToBuildingRatio(String landToBuildingRatio) {
        return this.checkAndGetParam(this.landToBuildingRatioRepository, LandToBuildingRatio.class, landToBuildingRatio);
    }

    @Override
    public HeightRestriction checkAndGetHeightRestriction(String heightRestriction) {
        return this.checkAndGetParam(this.heightRestrictionRepository, HeightRestriction.class, heightRestriction);
    }

    @Override
    public List<Infrastructure> checkAndGetInfrastructures(List<String> infrastructures) {
        return this.checkAndGetParams(this.infrastructureRepository, Infrastructure.class, infrastructures);
    }

    @Override
    public List<GeneralFeature> checkAndGetGeneralFeatures(List<String> generalFeatures) {
        return this.checkAndGetParams(this.generalFeatureRepository, GeneralFeature.class, generalFeatures);
    }
}
