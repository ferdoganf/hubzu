package com.hubzu.api.dto.metadata;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.model.base.CodeBaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class RealEstateSubTypeDTO extends CodeBaseDTO {

    private String realestateTypeCode;

    public RealEstateSubTypeDTO(String realestateTypeCode, CodeBaseEntity realestateSubType) {
        super(realestateSubType);
        this.setRealestateTypeCode(realestateTypeCode);
    }
}
