package com.hubzu.api.model.realestate.building.residential;

import com.hubzu.api.model.base.BaseEntity;
import com.hubzu.api.model.realestate.building.Building;
import com.hubzu.api.model.realestate.property.building.residental.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
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
@NoArgsConstructor
public class Residential extends Building {

    @ManyToOne(fetch = FetchType.LAZY)
    private ResidentialType residentialType;

    @ManyToOne(fetch = FetchType.LAZY)
    private NumberOfRooms numberOfRooms;
    @ManyToOne(fetch = FetchType.LAZY)
    private FloorNumber floorNumber;
    @ManyToOne(fetch = FetchType.LAZY)
    private NumberOfFloors numberOfFloors;
    @ManyToOne(fetch = FetchType.LAZY)
    private NumberOfBathrooms numberOfBathrooms;
    @ManyToOne(fetch = FetchType.LAZY)
    private Balcony balcony;
    @ManyToOne(fetch = FetchType.LAZY)
    private Furnished furnished;
    @ManyToOne(fetch = FetchType.LAZY)
    private BuildingComplex buildingComplex;
    @ManyToOne(fetch = FetchType.LAZY)
    private EligibleForBankCredit eligibleForBankCredit;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "residential_interior_property", joinColumns = @JoinColumn(name = "residential_id"), inverseJoinColumns = @JoinColumn(name = "interior_property_id"))
    private List<InteriorProperty> interiorProperties = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "residential_external_property", joinColumns = @JoinColumn(name = "residential_id"), inverseJoinColumns = @JoinColumn(name = "external_property_id"))
    private List<ExternalProperty> externalProperties = new ArrayList<>();
}
