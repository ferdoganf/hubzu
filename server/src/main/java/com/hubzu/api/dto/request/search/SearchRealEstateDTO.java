package com.hubzu.api.dto.request.search;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class SearchRealEstateDTO extends SearchLightDTO {

    private List<String> realEstateStatus;
    private String bank;
    private String realEstateType;
    private String residentialType;
    private String commercialType;
    private String landType;
    private String city;
    private String district;
    private boolean onlyOccasions;
}
