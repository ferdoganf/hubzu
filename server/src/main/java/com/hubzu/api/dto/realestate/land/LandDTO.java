package com.hubzu.api.dto.realestate.land;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.dto.realestate.RealEstateDTO;
import com.hubzu.api.model.realestate.land.Land;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class LandDTO extends RealEstateDTO {

    private CodeBaseDTO landType;
    private int floorSpaceNet;

    private CodeBaseDTO landToBuildingRatio;
    private CodeBaseDTO heightRestriction;
    private CodeBaseDTO landStatus;

    private List<CodeBaseDTO> infrastructures = new ArrayList<>();
    private List<CodeBaseDTO> generalFeatures = new ArrayList<>();

    public LandDTO(Land land) {
        ModelMapperUtil.getInstance().getMapper().map(land, this);
        if (StringUtils.isEmpty(this.getBuyerWarrantAlert())) {
            this.setBuyerWarrantAlert(land.getBank().getBuyerWarrantAlert());
        }
        if (land.getLandType() != null) {
            this.setRealEstateSubType(new CodeBaseDTO(land.getLandType()));
        }
    }

}
