package com.hubzu.api.model.address;

import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.base.CodeNameBaseEntity;
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
public class Neighborhood extends CodeNameBaseEntity {

    private String postalCode;

    @ManyToOne(fetch = FetchType.LAZY)
    private District district;
}
