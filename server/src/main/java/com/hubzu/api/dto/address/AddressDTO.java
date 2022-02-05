package com.hubzu.api.dto.address;

import com.hubzu.api.dto.BaseDTO;
import com.hubzu.api.model.realestate.RealEstateAddress;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class AddressDTO extends BaseDTO {

    private CityDTO city;
    private DistrictDTO district;
    private NeighborhoodDTO neighborhood;
    private String addressText;

    public AddressDTO(RealEstateAddress realEstateAddress) {
        ModelMapperUtil.getInstance().getMapper().map(realEstateAddress, this);
    }
}
