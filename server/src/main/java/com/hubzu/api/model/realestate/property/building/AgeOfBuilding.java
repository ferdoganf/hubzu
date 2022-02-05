package com.hubzu.api.model.realestate.property.building;

import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.base.CodeBaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Audited
@Where(clause = BaseEntity.SOFT_DELETE_CLAUSE)
public class AgeOfBuilding extends CodeBaseEntity {
}
