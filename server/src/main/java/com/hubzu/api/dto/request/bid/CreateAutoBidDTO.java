package com.hubzu.api.dto.request.bid;

import com.hubzu.api.dto.request.base.RequestBaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
public class CreateAutoBidDTO extends RequestBaseDTO {

    private String realestateCode;
    private BigDecimal upperLimit;
}
