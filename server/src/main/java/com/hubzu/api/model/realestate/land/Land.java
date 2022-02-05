package com.hubzu.api.model.realestate.land;

import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.realestate.RealEstate;
import com.hubzu.api.model.realestate.property.land.*;
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
public class Land extends RealEstate {

    @ManyToOne(fetch = FetchType.LAZY)
    private LandType landType;

    private int floorSpaceNet;

    @ManyToOne(fetch = FetchType.LAZY)
    private LandToBuildingRatio landToBuildingRatio;
    @ManyToOne(fetch = FetchType.LAZY)
    private HeightRestriction heightRestriction;
    @ManyToOne(fetch = FetchType.LAZY)
    private LandStatus landStatus;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "land_infrastructure", joinColumns = @JoinColumn(name = "land_id"), inverseJoinColumns = @JoinColumn(name = "infrastructure_id"))
    private List<Infrastructure> infrastructures = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "land_general_feature", joinColumns = @JoinColumn(name = "land_id"), inverseJoinColumns = @JoinColumn(name = "general_feature_id"))
    private List<GeneralFeature> generalFeatures = new ArrayList<>();
}
