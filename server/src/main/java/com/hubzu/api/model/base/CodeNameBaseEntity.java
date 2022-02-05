package com.hubzu.api.model.base;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

@EqualsAndHashCode(callSuper = true)
@Data
@Audited
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public class CodeNameBaseEntity extends CodeBaseEntity {
    private String name;
}
