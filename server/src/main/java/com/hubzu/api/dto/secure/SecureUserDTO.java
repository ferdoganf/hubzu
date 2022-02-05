package com.hubzu.api.dto.secure;

import com.hubzu.api.dto.BaseDTO;
import com.hubzu.api.model.user.User;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class SecureUserDTO extends BaseDTO {

    private String emailAddress;
    private String password;
    private String userType;

    public SecureUserDTO(User user) {
        ModelMapperUtil.getInstance().getMapper().map(user, this);
        this.userType = user.getUserType().getCode();
    }
}
