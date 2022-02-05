package com.hubzu.api.dto;

import com.hubzu.api.model.user.User;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
@Data
public class UserLightDTO {

    private String code;
    private String emailAddress;
    private String name;
    private String surname;
    private String userType;

    public UserLightDTO(User user) {
        ModelMapperUtil.getInstance().getMapper().map(user, this);
        this.userType = user.getUserType().getCode();
    }

    public UserLightDTO(String name, String surname, String emailAddress) {
        this.setName(name);
        this.setSurname(surname);
        this.setEmailAddress(emailAddress);
    }

}
