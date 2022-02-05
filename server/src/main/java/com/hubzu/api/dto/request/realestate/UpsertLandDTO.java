package com.hubzu.api.dto.request.realestate;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode
@Data
public class UpsertLandDTO {

    private String landType;
    private int floorSpaceNet;
    private String landToBuildingRatio;
    private String heightRestriction;
    private String landStatus;

    private List<String> infrastructures = new ArrayList<>();
    private List<String> generalFeatures = new ArrayList<>();
}
