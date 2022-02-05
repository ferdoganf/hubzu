package com.hubzu.api.dto.request.realestate;

import lombok.Data;

@Data
public class UpdateRealEstateAddressDTO {

    private String city;
    private String district;
    private String neighborhood;

    private String addressText;

    private Double latitude;
    private Double longitude;

    private String parcelSearchUrl;

}
