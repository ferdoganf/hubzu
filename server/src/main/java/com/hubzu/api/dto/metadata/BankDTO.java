package com.hubzu.api.dto.metadata;

import com.hubzu.api.dto.CodeNameBaseDTO;
import com.hubzu.api.model.bank.Bank;
import com.hubzu.api.util.ModelMapperUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class BankDTO extends CodeNameBaseDTO {

    private BigDecimal depositRate;
    private BigDecimal serviceFeeRate;

    private String buyerWarrantAlert;

    private boolean finishedAuctionsShown;

    private boolean enabled;

    public BankDTO(Bank bank) {
        super(bank);
        ModelMapperUtil.getInstance().getMapper().map(bank, this);
    }
}
