package com.hubzu.api.dto.realestate.building;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.model.realestate.building.commercial.Commercial;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CommercialDTO extends BuildingDTO {

    private CodeBaseDTO commercialType;

    private List<CodeBaseDTO> generalProperties = new ArrayList<>();

    public CommercialDTO(Commercial commercial) {
        ModelMapperUtil.getInstance().getMapper().map(commercial, this);
        if (StringUtils.isEmpty(this.getBuyerWarrantAlert())) {
            this.setBuyerWarrantAlert(commercial.getBank().getBuyerWarrantAlert());
        }
        if (commercial.getCommercialType() != null) {
            this.setRealEstateSubType(new CodeBaseDTO(commercial.getCommercialType()));
        }
    }

}
