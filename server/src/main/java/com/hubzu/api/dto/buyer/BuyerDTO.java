package com.hubzu.api.dto.buyer;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.UserLightDTO;
import com.hubzu.api.model.buyer.Buyer;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class BuyerDTO extends UserLightDTO {

    private String phoneCountryCode;
    private String phone;
    private String identityNumber;
    private CodeBaseDTO userStatus;
    private LocalDateTime createdDate;

    public BuyerDTO(Buyer buyer) {
        super(buyer);
        ModelMapperUtil.getInstance().getMapper().map(buyer, this);
        this.setUserType(buyer.getUserType().getCode());
    }

    public BuyerDTO(
            String name,
            String surname,
            String identityNumber,
            String emailAddress,
            String phoneCountryCode,
            String phone
    ) {
        super(name, surname, emailAddress);
        this.setIdentityNumber(identityNumber);
        this.setPhoneCountryCode(phoneCountryCode);
        this.setPhone(phone);
    }
}
