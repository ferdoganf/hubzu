package com.hubzu.api.dto.request.search;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
public class SearchRealEstateStatusDTO extends SearchLightDTO {

    private String realEstateStatus;
    private LocalDate startDate;
    private LocalDate endDate;
    private String bank;
    private String realEstateType;
    private String city;
    private String district;
}
