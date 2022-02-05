package com.hubzu.api.dto.address;

import com.hubzu.api.dto.CodeNameBaseDTO;
import com.hubzu.api.model.address.District;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class DistrictDTO extends CodeNameBaseDTO {

    private CityDTO city;

    public DistrictDTO(District district) {
        ModelMapperUtil.getInstance().getMapper().map(district, this);
    }
}
