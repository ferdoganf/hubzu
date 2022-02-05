package com.hubzu.api.dto.request.user;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CreateBuyerDTO extends CreateUserDTO {

    private String phoneCountryCode;
    private String phone;
    private String identityNumber;
}
