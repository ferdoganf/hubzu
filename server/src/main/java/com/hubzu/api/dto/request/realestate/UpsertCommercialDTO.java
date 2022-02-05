package com.hubzu.api.dto.request.realestate;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class UpsertCommercialDTO extends UpsertBuildingDTO {

    private int roomNumber;

    private String commercialType;
    private List<String> generalProperties = new ArrayList<>();
}
