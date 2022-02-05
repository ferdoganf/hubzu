package com.hubzu.api.model.realestate;

import com.hubzu.api.listener.RealEstateEntityListener;
import com.hubzu.api.model.bank.Bank;
import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.base.CodeBaseEntity;
import com.hubzu.api.model.buyer.Bid;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Audited
@Where(clause = BaseEntity.SOFT_DELETE_CLAUSE)
@Inheritance(strategy = InheritanceType.JOINED)
@EntityListeners(RealEstateEntityListener.class)
@NoArgsConstructor
public class RealEstate extends CodeBaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private Bank bank;

    @Column(length = 255)
    private String title;

    @Column(name = "description", columnDefinition = "MEDIUMTEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private RealEstateType realEstateType;

    @OneToOne(mappedBy = "realEstate", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    private RealEstateAddress realEstateAddress;

    @OneToMany(mappedBy = "realEstate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RealEstatePhoto> photos = new ArrayList<>();

    @Column(name = "auction_date", columnDefinition = "DATETIME")
    private LocalDateTime auctionDate;

    @Column(name = "start_date", columnDefinition = "DATETIME")
    private LocalDateTime startDate;

    @Column(name = "end_date", columnDefinition = "DATETIME")
    private LocalDateTime endDate;

    private int auctionPeriod;

    private BigDecimal startingAmount;
    private BigDecimal bidStep;

    @ManyToOne(fetch = FetchType.LAZY)
    private Bid currentBid;

    @OneToMany(mappedBy = "realEstate", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Bid> bids = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    private RealEstateStatus realEstateStatus;

    @Transient
    private String oldRealEstateStatusCode;

    private boolean occasion;

    private BigDecimal tenderParticipationFee;
    private BigDecimal depositRate;
    private BigDecimal serviceFeeRate;

    @Column(name = "buyer_warrant_alert", columnDefinition = "MEDIUMTEXT")
    private String buyerWarrantAlert;

    private boolean holdDeposit;

    private boolean inAdvance;

    private BigDecimal inAdvanceAmount;

    private boolean finishedAuctionsShown;


    @PostLoad
    public void postLoad() {
        if (this.realEstateStatus != null) {
            this.oldRealEstateStatusCode = this.realEstateStatus.getCode();
        }
    }


}
