package com.hubzu.api.model.realestate.building.commercial;

import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.realestate.building.Building;
import com.hubzu.api.model.realestate.property.building.commercial.GeneralProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Audited
@Where(clause = BaseEntity.SOFT_DELETE_CLAUSE)
public class Commercial extends Building {

    @ManyToOne(fetch = FetchType.LAZY)
    private CommercialType commercialType;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "commercial_general_property", joinColumns = @JoinColumn(name = "commercial_id"), inverseJoinColumns = @JoinColumn(name = "general_property_id"))
    private List<GeneralProperty> generalProperties = new ArrayList<>();

}

