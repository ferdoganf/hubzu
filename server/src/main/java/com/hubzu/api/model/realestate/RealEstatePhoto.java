package com.hubzu.api.model.realestate;

import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.base.CodeBaseEntity;
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
public class RealEstatePhoto extends CodeBaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private RealEstate realEstate;

    private Long size;

    private String fileName;

    private String mimeType;

    private String path;

}
