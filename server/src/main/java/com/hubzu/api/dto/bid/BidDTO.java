package com.hubzu.api.dto.bid;

import com.hubzu.api.dto.BaseDTO;
import com.hubzu.api.dto.realestate.RealEstateLightDTO;
import com.hubzu.api.model.buyer.Bid;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class BidDTO extends BaseDTO {

    private RealEstateLightDTO realEstate;

    private BigDecimal bidAmount;

    private LocalDateTime createdDate;

    public BidDTO(Bid bid) {
        this.setId(bid.getId());
        this.realEstate = new RealEstateLightDTO(bid.getRealEstate());
        this.bidAmount = bid.getBidAmount();
        this.createdDate = bid.getCreatedDate();
    }
}
