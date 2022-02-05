package com.hubzu.api.dto.request.bid;

import com.hubzu.api.dto.buyer.BuyerDTO;
import com.hubzu.api.dto.request.base.RequestBaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CreateDirectBidDTO extends RequestBaseDTO {

    BuyerDTO buyer;
    CreateBidDTO bid;
    String description;
}
