package com.hubzu.api.dto.request.realestate;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode(callSuper = true)
public class CreateRealEstateDTO extends UpdateRealEstateDTO {

    @NotNull
    private String realEstateType;

    @NotNull
    private String code;
}
