package com.hubzu.api.dto.request.search;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
public class SearchBuyerDTO extends SearchLightDTO {

    private String userStatus;
    private LocalDate startDate;
    private LocalDate endDate;
}
