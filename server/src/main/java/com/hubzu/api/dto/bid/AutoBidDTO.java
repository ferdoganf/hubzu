package com.hubzu.api.dto.bid;

import com.hubzu.api.dto.BaseDTO;
import com.hubzu.api.dto.realestate.RealEstateLightDTO;
import com.hubzu.api.model.buyer.BuyerAutoBid;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class AutoBidDTO extends BaseDTO {

    private RealEstateLightDTO realEstate;

    private BigDecimal upperLimit;

    private LocalDateTime createdDate;

    public AutoBidDTO(BuyerAutoBid buyerAutoBid) {
        this.setId(buyerAutoBid.getId());
        this.realEstate = new RealEstateLightDTO(buyerAutoBid.getRealEstate());
        this.upperLimit = buyerAutoBid.getUpperLimit();
        this.createdDate = buyerAutoBid.getCreatedDate();
    }
}
