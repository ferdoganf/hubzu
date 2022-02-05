package com.hubzu.api.model.bank;

import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.base.CodeNameBaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Audited
@Where(clause = BaseEntity.SOFT_DELETE_CLAUSE)
public class Bank extends CodeNameBaseEntity {

    private BigDecimal depositRate;
    private BigDecimal serviceFeeRate;

    private String accountBank;
    private String accountBranchNo;
    private String accountBranchName;
    private String accountNo;
    private String accountIbanNo;

    @Column(name = "buyer_warrant_alert", columnDefinition = "MEDIUMTEXT")
    private String buyerWarrantAlert;

    private boolean finishedAuctionsShown;

    private boolean enabled;

}
