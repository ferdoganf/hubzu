package com.hubzu.api.dto.request.user;

import com.hubzu.api.util.ErrorCodes;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
public class CreateUserDTO {

    @Email(message = ErrorCodes.VALIDATION_NOT_VALID)
    private String emailAddress;

    @NotEmpty(message = ErrorCodes.VALIDATION_EMPTY)
    private String name;

    @NotEmpty(message = ErrorCodes.VALIDATION_EMPTY)
    private String surname;
}
