package com.hubzu.api.dto.bid;

import com.hubzu.api.dto.BaseDTO;
import com.hubzu.api.dto.buyer.BuyerDTO;
import com.hubzu.api.model.buyer.Bid;
import com.hubzu.api.model.buyer.DirectBid;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class RealEstateBidDTO extends BaseDTO {

    private BuyerDTO buyer;

    private BigDecimal bidAmount;

    private LocalDateTime createdDate;

    public RealEstateBidDTO(Bid bid) {
        this.setId(bid.getId());
        this.buyer = new BuyerDTO(bid.getBuyer());
        this.bidAmount = bid.getBidAmount();
        this.createdDate = bid.getCreatedDate();
    }

    public RealEstateBidDTO(DirectBid directBid) {
        this.setId(directBid.getId());
        this.buyer = new BuyerDTO(
                directBid.getName(),
                directBid.getSurname(),
                directBid.getIdentityNumber(),
                directBid.getEmailAddress(),
                directBid.getPhoneCountryCode(),
                directBid.getPhone()
        );
        this.bidAmount = directBid.getBidAmount();
        this.createdDate = directBid.getCreatedDate();
    }
}
