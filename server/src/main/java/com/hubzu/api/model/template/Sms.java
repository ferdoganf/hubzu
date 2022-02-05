package com.hubzu.api.model.template;

import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.base.CodeBaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

import javax.persistence.Column;
import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Audited
@Where(clause = BaseEntity.SOFT_DELETE_CLAUSE)
@NoArgsConstructor
public class Sms extends CodeBaseEntity {

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    public Sms(String code) {
        super();
        this.setCode(code);
    }
}


