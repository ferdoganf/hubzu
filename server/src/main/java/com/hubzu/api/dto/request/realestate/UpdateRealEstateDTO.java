package com.hubzu.api.dto.request.realestate;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class UpdateRealEstateDTO {

    private String code;

    @NotNull
    private String bank;

    @NotNull
    private String title;

    private String description;

    private int auctionPeriod;

    private BigDecimal startingAmount;
    private BigDecimal bidStep;

    private boolean occasion;

    private BigDecimal tenderParticipationFee;
    private BigDecimal depositRate;
    private BigDecimal serviceFeeRate;

    private boolean holdDeposit;

    private boolean inAdvance;

    private BigDecimal inAdvanceAmount;

    private boolean finishedAuctionsShown;
}
