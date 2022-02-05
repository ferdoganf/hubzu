package com.hubzu.api.dto.request.general;

import com.hubzu.api.util.ErrorCodes;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@EqualsAndHashCode(callSuper = false)
@Data
public class ContactUsDTO {

    @NotEmpty(message = ErrorCodes.VALIDATION_EMPTY)
    private String name;

    @NotEmpty(message = ErrorCodes.VALIDATION_EMPTY)
    private String surname;

    @Email(message = ErrorCodes.VALIDATION_NOT_VALID)
    private String emailAddress;

    private String phoneCountryCode;
    private String phone;

    private String message;

    private String recaptchaToken;
}
