package com.hubzu.api.model.visitor;

import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.user.User;
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
public class Visitor extends User {

    private String phone;
    private String phoneCountryCode;
    private String identityNumber;
}
