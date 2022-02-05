package com.hubzu.api.dto.buyer;

import com.hubzu.api.dto.UserLightDTO;
import com.hubzu.api.model.user.UserFavourite;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode
@Data
public class UserFavouriteDTO {

    private UserLightDTO buyer;
    private LocalDateTime createdDate;

    public UserFavouriteDTO(UserFavourite userFavourite) {
        this.buyer = new UserLightDTO(userFavourite.getUser());
        this.createdDate = userFavourite.getCreatedDate();
    }

}
