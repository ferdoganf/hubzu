package com.hubzu.api.dto.request.user;

import lombok.Data;

@Data
public class UpdateMyPasswordDTO {
    private String password;
    private String newPassword;
}
