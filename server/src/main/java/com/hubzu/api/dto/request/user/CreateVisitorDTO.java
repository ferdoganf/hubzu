package com.hubzu.api.dto.request.user;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CreateVisitorDTO extends CreateUserDTO {

    private String password;
    private String phoneCountryCode;
    private String phone;
    private String recaptchaToken;
}
