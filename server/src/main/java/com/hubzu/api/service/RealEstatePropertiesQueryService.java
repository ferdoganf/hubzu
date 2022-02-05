package com.hubzu.api.service;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.model.realestate.RealEstateType;
import com.hubzu.api.model.realestate.property.building.AgeOfBuilding;
import com.hubzu.api.model.realestate.property.building.Frontage;
import com.hubzu.api.model.realestate.property.building.Heating;
import com.hubzu.api.model.realestate.property.building.UseStatus;
import com.hubzu.api.model.realestate.property.building.commercial.GeneralProperty;
import com.hubzu.api.model.realestate.property.building.residental.*;
import com.hubzu.api.model.realestate.property.land.*;

import java.util.List;

public interface RealEstatePropertiesQueryService {

    List<CodeBaseDTO> getAgeOfBuildingTypeCodeBaseDTOs();

    List<CodeBaseDTO> getHeatingTypeCodeBaseDTOs();

    List<CodeBaseDTO> getUseStatusTypeCodeBaseDTOs();

    List<CodeBaseDTO> getFrontageTypeCodeBaseDTOs();

    List<CodeBaseDTO> getNumberOfRoomsTypeCodeBaseDTOs();

    List<CodeBaseDTO> getFloorNumberTypeCodeBaseDTOs();

    List<CodeBaseDTO> getNumberOfFloorsTypeCodeBaseDTOs();

    List<CodeBaseDTO> getNumberOfBathroomsTypeCodeBaseDTOs();

    List<CodeBaseDTO> getBalconyTypeCodeBaseDTOs();

    List<CodeBaseDTO> getFurnishedTypeCodeBaseDTOs();

    List<CodeBaseDTO> getBuildingComplexTypeCodeBaseDTOs();

    List<CodeBaseDTO> getEligibleForBankCreditTypeCodeBaseDTOs();

    List<CodeBaseDTO> getInteriorPropertyTypeCodeBaseDTOs();

    List<CodeBaseDTO> getExternalPropertyTypeCodeBaseDTOs();

    List<CodeBaseDTO> getGeneralPropertyTypeCodeBaseDTOs();

    List<CodeBaseDTO> getInfrastructureTypeCodeBaseDTOs();

    List<CodeBaseDTO> getGeneralFeatureTypeCodeBaseDTOs();

    List<CodeBaseDTO> getLandToBuildingRatioTypeCodeBaseDTOs();

    List<CodeBaseDTO> getHeightRestrictionTypeCodeBaseDTOs();

    List<CodeBaseDTO> getLandStatusTypeCodeBaseDTOs();

    List<CodeBaseDTO> getRealEstateTypeCodeBaseDTOs();

    NumberOfRooms checkAndGetNumberOfRooms(String numberOfRooms);

    FloorNumber checkAndGetFloorNumber(String floorNumber);

    NumberOfFloors checkAndGetNumberOfFloors(String numberOfFloors);

    NumberOfBathrooms checkAndGetNumberOfBathrooms(String numberOfBathrooms);

    Balcony checkAndGetBalcony(String balcony);

    Furnished checkAndGetFurnished(String furnished);

    BuildingComplex checkAndGetBuildingComplex(String buildingComplex);

    EligibleForBankCredit checkAndGetEligibleForBankCredit(String eligibleForBankCredit);

    List<InteriorProperty> checkAndGetInteriorProperties(List<String> interiorProperties);

    List<ExternalProperty> checkAndGetExternalProperties(List<String> externalProperties);

    List<Frontage> checkAndGetFrontages(List<String> frontages);

    AgeOfBuilding checkAndGetAgeOfBuilding(String ageOfBuilding);

    Heating checkAndGetHeating(String heating);

    UseStatus checkAndGetUseStatus(String useStatus);

    RealEstateType checkAndGetRealEstateType(String realEstateType);

    List<GeneralProperty> checkAndGetGeneralProperties(List<String> generalProperties);

    LandStatus checkAndGetLandStatus(String landStatus);

    LandToBuildingRatio checkAndGetLandToBuildingRatio(String landToBuildingRatio);

    HeightRestriction checkAndGetHeightRestriction(String heightRestriction);

    List<Infrastructure> checkAndGetInfrastructures(List<String> infrastructures);

    List<GeneralFeature> checkAndGetGeneralFeatures(List<String> generalFeatures);
}
