package com.hubzu.api.model.realestate.building;

import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.model.realestate.property.building.AgeOfBuilding;
import com.hubzu.api.model.realestate.property.building.Frontage;
import com.hubzu.api.model.realestate.property.building.Heating;
import com.hubzu.api.model.realestate.property.building.UseStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Audited
@Where(clause = BaseEntity.SOFT_DELETE_CLAUSE)
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@NoArgsConstructor
public class Building extends RealEstate {

    private int floorSpaceGross;
    private int floorSpaceNet;

    @ManyToOne(fetch = FetchType.LAZY)
    private AgeOfBuilding ageOfBuilding;
    @ManyToOne(fetch = FetchType.LAZY)
    private Heating heating;
    @ManyToOne(fetch = FetchType.LAZY)
    private UseStatus useStatus;

    private BigDecimal dues;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "building_frontage", joinColumns = @JoinColumn(name = "building_id"), inverseJoinColumns = @JoinColumn(name = "frontage_id"))
    private List<Frontage> frontages = new ArrayList<>();

}
