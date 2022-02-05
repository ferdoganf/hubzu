package com.hubzu.api.dto.realestate;

import com.hubzu.api.dto.CodeBaseDTO;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.util.BusinessConstants;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class RealEstateChangeDTO extends CodeBaseDTO {

    private BigDecimal currentBidAmount;
    private CodeBaseDTO realEstateStatus;

    public RealEstateChangeDTO(RealEstate realEstate) {
        super(realEstate);
        ModelMapperUtil.getInstance().getMapper().map(realEstate, this);
        if (BusinessConstants.RealEstateStatus.STARTED.equals(realEstate.getRealEstateStatus().getCode())) {
            if (realEstate.getCurrentBid() != null) {
                this.setCurrentBidAmount(realEstate.getCurrentBid().getBidAmount());
            }
        }
    }
}
