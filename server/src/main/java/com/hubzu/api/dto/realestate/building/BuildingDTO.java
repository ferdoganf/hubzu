package com.hubzu.api.dto.realestate.building;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.realestate.RealEstateDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class BuildingDTO extends RealEstateDTO {

    private int floorSpaceGross;
    private int floorSpaceNet;
    private BigDecimal dues;

    private CodeBaseDTO ageOfBuilding;
    private CodeBaseDTO heating;
    private CodeBaseDTO useStatus;

    private List<CodeBaseDTO> frontages = new ArrayList<>();
}
