package com.hubzu.api.model.buyer;

import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.realestate.RealEstate;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Audited
@Where(clause = BaseEntity.SOFT_DELETE_CLAUSE)
public class BuyerWarrant extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private Buyer buyer;


    @ManyToOne(fetch = FetchType.LAZY)
    private RealEstate realEstate;
}
