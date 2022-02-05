package com.hubzu.api.dto.visitor;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.UserLightDTO;
import com.hubzu.api.model.visitor.Visitor;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class VisitorDTO extends UserLightDTO {

    private String phoneCountryCode;
    private String phone;
    private CodeBaseDTO userStatus;

    public VisitorDTO(Visitor visitor) {
        super(visitor);
        ModelMapperUtil.getInstance().getMapper().map(visitor, this);
        this.setUserType(visitor.getUserType().getCode());
    }
}
