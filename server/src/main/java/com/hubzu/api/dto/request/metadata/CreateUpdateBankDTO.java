package com.hubzu.api.dto.request.metadata;

import com.hubzu.api.dto.request.base.RequestCodeNameBaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
public class CreateUpdateBankDTO extends RequestCodeNameBaseDTO {

    private BigDecimal depositRate;
    private BigDecimal serviceFeeRate;

    private String buyerWarrantAlert;
    private boolean finishedAuctionsShown;

    private boolean enabled;
}
