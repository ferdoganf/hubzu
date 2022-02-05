package com.hubzu.api.dto.request.realestate;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode
@Data
public class UpsertBuildingDTO {

    private int floorSpaceGross;
    private int floorSpaceNet;
    private BigDecimal dues;

    private String ageOfBuilding;
    private String heating;
    private String useStatus;

    private List<String> frontages = new ArrayList<>();


}
