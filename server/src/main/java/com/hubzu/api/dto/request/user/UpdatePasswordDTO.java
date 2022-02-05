package com.hubzu.api.dto.request.user;

import com.hubzu.api.util.ErrorCodes;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class UpdatePasswordDTO {

    @NotEmpty(message = ErrorCodes.VALIDATION_EMPTY)
    private String password;
}
