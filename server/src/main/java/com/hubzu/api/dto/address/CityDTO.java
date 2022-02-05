package com.hubzu.api.dto.address;

import com.hubzu.api.dto.CodeNameBaseDTO;
import com.hubzu.api.model.address.City;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class CityDTO extends CodeNameBaseDTO {

    public CityDTO(City city) {
        ModelMapperUtil.getInstance().getMapper().map(city, this);
    }
}
