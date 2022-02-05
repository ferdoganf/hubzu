package com.hubzu.api.dto.request.bid;

import com.hubzu.api.dto.request.base.RequestBaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
public class CreateBidDTO extends RequestBaseDTO {

    private String realestateCode;
    private BigDecimal bidAmount;

}
