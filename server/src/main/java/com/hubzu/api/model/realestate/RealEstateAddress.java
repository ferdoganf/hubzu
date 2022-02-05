package com.hubzu.api.model.realestate;

import com.hubzu.api.model.address.City;
import com.hubzu.api.model.address.District;
import com.hubzu.api.model.address.Neighborhood;
import com.hubzu.api.model.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Audited
@Where(clause = BaseEntity.SOFT_DELETE_CLAUSE)
public class RealEstateAddress extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private City city;

    @ManyToOne(fetch = FetchType.LAZY)
    private District district;

    @ManyToOne(fetch = FetchType.LAZY)
    private Neighborhood neighborhood;

    private String addressText;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "real_estate_id")
    private RealEstate realEstate;

    private Double latitude;
    private Double longitude;

    private String parcelSearchUrl;
}
