package com.hubzu.api.dto.metadata;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.CodeNameBaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode
@Data
public class RealEstateMetadataDTO {

    private List<CodeBaseDTO> realEstateStatus = new ArrayList<>();
    private List<CodeNameBaseDTO> banks = new ArrayList<>();
    private List<CodeBaseDTO> realEstateTypes = new ArrayList<>();

    private List<CodeBaseDTO> ageOfBuildingTypes = new ArrayList<>();
    private List<CodeBaseDTO> heatingTypes = new ArrayList<>();
    private List<CodeBaseDTO> useStatusTypes = new ArrayList<>();
    private List<CodeBaseDTO> frontageTypes = new ArrayList<>();

    private List<CodeBaseDTO> residentialTypes = new ArrayList<>();
    private List<CodeBaseDTO> numberOfRoomsTypes = new ArrayList<>();
    private List<CodeBaseDTO> floorNumberTypes = new ArrayList<>();
    private List<CodeBaseDTO> numberOfFloorsTypes = new ArrayList<>();
    private List<CodeBaseDTO> numberOfBathroomsTypes = new ArrayList<>();
    private List<CodeBaseDTO> balconyTypes = new ArrayList<>();
    private List<CodeBaseDTO> furnishedTypes = new ArrayList<>();
    private List<CodeBaseDTO> buildingComplexTypes = new ArrayList<>();
    private List<CodeBaseDTO> eligibleForBankCreditTypes = new ArrayList<>();
    private List<CodeBaseDTO> interiorPropertyTypes = new ArrayList<>();
    private List<CodeBaseDTO> externalPropertyTypes = new ArrayList<>();

    private List<CodeBaseDTO> commercialTypes = new ArrayList<>();
    private List<CodeBaseDTO> generalPropertyTypes = new ArrayList<>();

    private List<CodeBaseDTO> landTypes = new ArrayList<>();
    private List<CodeBaseDTO> infrastructureTypes = new ArrayList<>();
    private List<CodeBaseDTO> generalFeatureTypes = new ArrayList<>();
    private List<CodeBaseDTO> landToBuildingRatioTypes = new ArrayList<>();
    private List<CodeBaseDTO> heightRestrictionTypes = new ArrayList<>();
    private List<CodeBaseDTO> landStatusTypes = new ArrayList<>();
}
