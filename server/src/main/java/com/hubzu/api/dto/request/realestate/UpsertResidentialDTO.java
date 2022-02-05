package com.hubzu.api.dto.request.realestate;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class UpsertResidentialDTO extends UpsertBuildingDTO {


    private String residentialType;

    private String numberOfRooms;
    private String floorNumber;
    private String numberOfFloors;
    private String numberOfBathrooms;
    private String balcony;
    private String furnished;
    private String buildingComplex;
    private String eligibleForBankCredit;

    private List<String> interiorProperties = new ArrayList<>();
    private List<String> externalProperties = new ArrayList<>();
}
