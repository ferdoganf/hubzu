import React from "react";
import RealestateDetailsListTable from './RealestateDetailsListTable';

export default class LandRealestateDetailsListTable extends React.Component {
    render() {
        let realestateProperties = [];
        if (this.props.realestate) {
            realestateProperties.push({ value: this.props.realestate.floorSpaceNet, title: 'FLOOR_SPACE_NET' });
            realestateProperties.push({ value: this.props.realestate.landToBuildingRatio, title: 'LAND_TO_BUILDING_RATIO' });
            realestateProperties.push({ value: this.props.realestate.heightRestriction, title: 'HEIGHT_RESTRICTION' });
            realestateProperties.push({ value: this.props.realestate.landStatus, title: 'LAND_STATUS' });
            realestateProperties.push({ value: this.props.realestate.infrastructures, title: 'INFRASTRUCTURES' });
            realestateProperties.push({ value: this.props.realestate.generalFeatures, title: 'GENERAL_FEATURES' });
        }
        return (
            <RealestateDetailsListTable realestateProperties={realestateProperties}></RealestateDetailsListTable>
        );
    }
}