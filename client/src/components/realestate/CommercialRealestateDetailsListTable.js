import React from "react";
import RealestateDetailsListTable from './RealestateDetailsListTable';

export default class CommercialRealestateDetailsListTable extends React.Component {
    render() {
        let realestateProperties = [];
        if (this.props.realestate) {
            realestateProperties.push({ value: this.props.realestate.floorSpaceGross, title: 'FLOOR_SPACE_GROSS' });
            realestateProperties.push({ value: this.props.realestate.floorSpaceNet, title: 'FLOOR_SPACE_NET' });
            realestateProperties.push({ value: this.props.realestate.ageOfBuilding, title: 'AGE_OF_BUILDING' });
            realestateProperties.push({ value: this.props.realestate.heating, title: 'HEATING' });
            realestateProperties.push({ value: this.props.realestate.useStatus, title: 'USE_STATUS' });
            realestateProperties.push({ value: this.props.realestate.dues, title: 'DUES' });
            realestateProperties.push({ value: this.props.realestate.frontageTypes, title: 'FRONTAGES' });
            realestateProperties.push({ value: this.props.realestate.generalProperties, title: 'GENERAL_PROPERTIES' });
        }
        return (
            <RealestateDetailsListTable realestateProperties={realestateProperties}></RealestateDetailsListTable>
        );
    }
}