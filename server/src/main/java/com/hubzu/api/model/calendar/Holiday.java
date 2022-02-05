package com.hubzu.api.model.calendar;

import com.hubzu.api.model.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Audited
@Where(clause = BaseEntity.SOFT_DELETE_CLAUSE)
public class Holiday extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private Calendar calendar;

    @Column(name = "holiday_date", columnDefinition = "DATE")
    private LocalDate holidayDate;

    private boolean halfDay;

}
