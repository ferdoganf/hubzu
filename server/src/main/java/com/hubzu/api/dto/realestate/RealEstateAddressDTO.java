package com.hubzu.api.dto.realestate;

import com.hubzu.api.dto.BaseDTO;
import com.hubzu.api.dto.address.CityDTO;
import com.hubzu.api.dto.address.DistrictDTO;
import com.hubzu.api.dto.address.NeighborhoodDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class RealEstateAddressDTO extends BaseDTO {

    private CityDTO city;
    private DistrictDTO district;
    private NeighborhoodDTO neighborhood;

    private String addressText;

    private Double latitude;
    private Double longitude;

    private String parcelSearchUrl;
}
