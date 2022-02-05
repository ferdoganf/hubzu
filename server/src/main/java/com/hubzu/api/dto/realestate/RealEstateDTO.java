package com.hubzu.api.dto.realestate;

import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class RealEstateDTO extends RealEstateLightDTO {

    private List<RealEstatePhotoDTO> photos = new ArrayList<>();
    private BigDecimal currentBidAmount;
    private String buyerWarrantAlert;

    public RealEstateDTO(RealEstate realEstate) {
        super(realEstate);
        ModelMapperUtil.getInstance().getMapper().map(realEstate, this);
        /*
        if (StringUtils.isEmpty(this.buyerWarrantAlert)) {
            this.buyerWarrantAlert = realEstate.getBank().getBuyerWarrantAlert();
        }
        */

        if (BusinessConstants.RealEstateStatus.STARTED.equals(realEstate.getRealEstateStatus().getCode())) {
            if (realEstate.getCurrentBid() != null) {
                this.setCurrentBidAmount(realEstate.getCurrentBid().getBidAmount());
            }
        }
    }
}
