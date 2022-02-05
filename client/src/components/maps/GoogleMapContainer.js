import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

export default class GoogleMapContainer extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            center: {
                lat: (this.props.latInitial) ? this.props.latInitial : 41.015137,
                lng: (this.props.lngInitial) ? this.props.lngInitial : 28.979530,
            }
        };
        this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    }


    handleBoundsChanged = () => {
        const mapCenter = this.myRef.center; //get map center
        this.setState({ center: mapCenter });
    };

    componentDidUpdate(prevProps, prevState) {


        if (this.props && this.props.latInitial && this.state && this.state.center && (this.props.latInitial !== this.state.center.lat)) {
            let center = this.state.center;
            center.lat = this.props.latInitial;
            this.setState({ center: center });
        }

        if (this.props && this.props.lngInitial && this.state && this.state.center && (this.props.lngInitial !== this.state.center.lng)) {
            let center = this.state.center;
            center.lng = this.props.lngInitial;
            this.setState({ center: center });
        }
    }


    render() {
        return (
            <LoadScript
                googleMapsApiKey="AIzaSyCK2vzJbXxSwVGs1ad_Z9ivzzo9_S20o6c"
            >
                <GoogleMap ref={this.myRef}
                    mapContainerStyle={containerStyle}
                    onBoundsChanged={this.handleBoundsChanged}
                    center={this.state.center}
                    zoom={15}
                    onClick={this.props.onClick}
                    mapTypeId="satellite"
                    clickableIcons={false}
                >
                    {<Marker position={{ lat: this.props.lat, lng: this.props.lng }} />}
                    <></>
                </GoogleMap>
            </LoadScript >
        )
    }
}