package com.hubzu.api.model.user;

import com.hubzu.api.model.base.BaseEntity;

import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

import javax.persistence.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Audited
@Where(clause = BaseEntity.SOFT_DELETE_CLAUSE)
public class Operation extends User {
}
