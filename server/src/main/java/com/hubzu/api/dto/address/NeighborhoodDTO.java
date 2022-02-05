package com.hubzu.api.dto.address;

import com.hubzu.api.dto.CodeNameBaseDTO;
import com.hubzu.api.model.address.Neighborhood;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class NeighborhoodDTO extends CodeNameBaseDTO {

    private DistrictDTO district;

    public NeighborhoodDTO(Neighborhood neighborhood) {
        ModelMapperUtil.getInstance().getMapper().map(neighborhood, this);
    }

}
