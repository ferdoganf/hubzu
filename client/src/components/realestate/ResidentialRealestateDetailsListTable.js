import React from "react";
import RealestateDetailsListTable from './RealestateDetailsListTable';

export default class ResidentialRealestateDetailsListTable extends React.Component {
    render() {
        let realestateProperties = [];
        if (this.props.realestate) {
            realestateProperties.push({ value: this.props.realestate.floorSpaceGross, title: 'FLOOR_SPACE_GROSS' });
            realestateProperties.push({ value: this.props.realestate.floorSpaceNet, title: 'FLOOR_SPACE_NET' });
            realestateProperties.push({ value: this.props.realestate.ageOfBuilding, title: 'AGE_OF_BUILDING' });
            realestateProperties.push({ value: this.props.realestate.heating, title: 'HEATING' });
            realestateProperties.push({ value: this.props.realestate.useStatus, title: 'USE_STATUS' });
            realestateProperties.push({ value: this.props.realestate.numberOfRooms, title: 'NUMBER_OF_ROOMS' });
            realestateProperties.push({ value: this.props.realestate.floorNumber, title: 'FLOOR_NUMBER' });
            realestateProperties.push({ value: this.props.realestate.numberOfFloors, title: 'NUMBER_OF_FLOORS' });
            realestateProperties.push({ value: this.props.realestate.numberOfBathrooms, title: 'NUMBER_OF_BATHROOMS' });
            realestateProperties.push({ value: this.props.realestate.balcony, title: 'BALCONY' });
            realestateProperties.push({ value: this.props.realestate.furnished, title: 'FURNISHED' });
            realestateProperties.push({ value: this.props.realestate.buildingComplex, title: 'BUILDING_COMPLEX' });
            realestateProperties.push({ value: this.props.realestate.eligibleForBankCredit, title: 'ELIGIBLE_FOR_BANK_CREDIT' });
            realestateProperties.push({ value: this.props.realestate.dues, title: 'DUES' });
            realestateProperties.push({ value: this.props.realestate.frontageTypes, title: 'FRONTAGES' });
            realestateProperties.push({ value: this.props.realestate.interiorProperties, title: 'INTERIOR_PROPERTIES' });
            realestateProperties.push({ value: this.props.realestate.externalProperties, title: 'EXTERNAL_PROPERTIES' });
        }
        return (
            <RealestateDetailsListTable realestateProperties={realestateProperties}></RealestateDetailsListTable>
        );
    }
}