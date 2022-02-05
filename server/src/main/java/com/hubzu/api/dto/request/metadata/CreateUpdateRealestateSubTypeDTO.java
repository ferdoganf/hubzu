package com.hubzu.api.dto.request.metadata;

import com.hubzu.api.dto.request.base.RequestCodeBaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CreateUpdateRealestateSubTypeDTO extends RequestCodeBaseDTO {
    private String realEstateTypeCode;
}
