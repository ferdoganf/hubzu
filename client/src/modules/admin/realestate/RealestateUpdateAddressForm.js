import React, { Component } from 'react';
import { Form, Header, Segment, Grid, Button } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';
import NumberFormat from 'react-number-format';
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import GoogleMapContainer from '../../../components/maps/GoogleMapContainer';

export default class RealestateUpdateAddressForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null,
            request: {
                city: (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.city) ? this.props.realestateCreated.realEstateAddress.city.code : null,
                district: (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.district) ? this.props.realestateCreated.realEstateAddress.district.code : null,
                neighborhood: (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.neighborhood) ? this.props.realestateCreated.realEstateAddress.neighborhood.code : null,
                addressText: (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.addressText) ? this.props.realestateCreated.realEstateAddress.addressText : null,
                parcelSearchUrl: (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.parcelSearchUrl) ? this.props.realestateCreated.realEstateAddress.parcelSearchUrl : null,
                latitude: (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.latitude) ? this.props.realestateCreated.realEstateAddress.latitude : null,
                longitude: (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.longitude) ? this.props.realestateCreated.realEstateAddress.longitude : null,
            },
            latitudeInitial: (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.latitude) ? this.props.realestateCreated.realEstateAddress.latitude : null,
            longitudeInitial: (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.longitude) ? this.props.realestateCreated.realEstateAddress.longitude : null,
            formErrorList: [],
            fieldErrors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleDropdownChangeCity = this.handleDropdownChangeCity.bind(this);
        this.handleDropdownChangeDistrict = this.handleDropdownChangeDistrict.bind(this);
        this.handleMapOnClick = this.handleMapOnClick.bind(this);
    }

    preparePageHeader(prevProps, prevState) {
        if (
            prevProps == null || prevState == null ||
            (this.props.lastResponseId !== prevProps.lastResponseId) ||
            (!prevProps.realestateCreated) ||
            (this.props.realestateCreated.code !== prevProps.realestateCreated.code) ||
            (this.props.realestateCreated.bank !== prevProps.realestateCreated.bank) ||
            (this.props.realestateCreated.realEstateType !== prevProps.realestateCreated.realEstateType) ||
            (this.props.realestateCreated.realEstateSubType !== prevProps.realestateCreated.realEstateSubType) ||
            (this.state.request.city !== prevState.request.city) ||
            (this.state.request.district !== prevState.request.district)
        ) {
            let sections = [];
            sections.push({ key: 'RUAbreadcrumb1', content: I18n.t('menu.REALESTATE'), link: true, active: true });
            sections.push({ key: 'RUAbreadcrumb2', content: this.props.realestateCreated.code });

            if (this.props.realestateCreated.bank) {
                sections.push({ key: 'RUAbreadcrumb3', content: this.props.realestateCreated.bank.name });
            }

            if (this.props.realestateCreated && this.props.realestateCreated.realEstateType) {
                sections.push({ key: 'RUAbreadcrumb4', content: I18n.t('label.' + this.props.realestateCreated.realEstateType.code) });
            }

            if (this.props.realestateCreated && this.props.realestateCreated.realEstateSubType) {
                sections.push({ key: 'RUAbreadcrumb5', content: I18n.t('label.' + this.props.realestateCreated.realEstateSubType.code) });
            }
            if (this.state.request.city && this.props.cities) {
                let selectedCity = this.props.cities.find(e => (e && e.code === this.state.request.city));
                sections.push({ key: 'RUAbreadcrumb6', content: selectedCity ? selectedCity.name : null });
            }

            if (this.state.request.district && this.props.districts && this.state.request.city && this.props.districts[this.state.request.city]) {
                let selectedDistrict = this.props.districts[this.state.request.city].find(e => (e && e.code === this.state.request.district));
                sections.push({ key: 'RUAbreadcrumb7', content: selectedDistrict ? selectedDistrict.name : null });
            }
            this.props.setPageHeader(sections);
        }
    }

    componentDidMount() {
        this.preparePageHeader();
        if (this.state.request.city) {
            if (!this.props.districts[this.state.request.city]) {
                this.props.getDistricts(this.state.request.city);
            }
        }

        if (this.state.request.district) {

            if (!this.props.neighborhoods[this.state.request.district] && this.state.request.city) {
                this.props.getNeighborhoods(this.state.request.city, this.state.request.district);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.preparePageHeader(prevProps, prevState);
    }

    back() {
        this.props.history.push('/admin/realestate/' + this.props.realestateCreated.code + '/details');
    }



    handleInputChange(e) {
        const { id, value } = e.target
        let request = this.state.request;
        request[id] = value;
        this.setState({ request });
    }

    handleDropdownChange(e, result) {
        const { id, value } = result
        let request = this.state.request;
        this.setState({ request: Object.assign({}, request, { [id]: value }) });
    }

    handleDropdownChangeCity(e, result) {
        this.handleDropdownChange(e, result);
        const { value } = result
        if (!this.props.districts[value]) {
            this.props.getDistricts(value);
        }
    }

    handleDropdownChangeDistrict(e, result) {
        this.handleDropdownChange(e, result);
        const { value } = result
        if (!this.props.neighborhoods[value] && this.state.request.city) {
            this.props.getNeighborhoods(this.state.request.city, value);
        }
    }

    handleMapOnClick(e) {
        if (e && e.latLng) {
            let location = e.latLng.toJSON();
            let request = this.state.request;
            this.setState({ request: Object.assign({}, request, { "latitude": location.lat, "longitude": location.lng }) });

        }
    }

    submit(route) {
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};

        if (this.props.realestateCreated) {

            if ((!this.state.request.city) || (!this.state.request.city.trim())) {
                formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.CITY") }));
                fieldErrors.city = true;
            }

            if ((!this.state.request.district) || (!this.state.request.district.trim())) {
                formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.DISTRICT") }));
                fieldErrors.district = true;
            }

            this.setState({ formErrorList, fieldErrors });
            if (formErrorList.length === 0) {

                let request = this.state.request;
                let addressRequest = {
                    city: request.city,
                    district: request.district,
                    neighborhood: request.neighborhood,
                    addressText: request.addressText,
                    parcelSearchUrl: request.parcelSearchUrl,
                    latitude: request.latitude,
                    longitude: request.longitude
                };
                this.props.updateAddress(route, addressRequest);
            } else {
                this.props.showErrorListModal(formErrorList);
            }

        }
    }

    render() {

        let cities = [];
        if (this.props.cities) {
            cities = this.props.cities.map(city => Object.assign({}, { key: city.code, text: city.name, value: city.code }));
        }

        let districts = [];
        if (this.state.request.city && this.props.districts && this.props.districtsVersion > 0) {
            if (this.props.districts[this.state.request.city]) {
                districts = this.props.districts[this.state.request.city].map(district => Object.assign({}, { key: district.code, text: district.name, value: district.code }));
            }
        }

        let neighborhoods = [];
        if (this.state.request.district && this.props.neighborhoods && this.props.neighborhoodsVersion > 0) {
            if (this.props.neighborhoods[this.state.request.district]) {
                neighborhoods = this.props.neighborhoods[this.state.request.district].map(neighborhood => Object.assign({}, { key: neighborhood.code, text: neighborhood.name, value: neighborhood.code }));
            }
        }

        return (

            <Segment attached padded='very'>
                {
                    (this.props.realestateCreated) ?
                        <Form>

                            <div>
                                <Header as='h5' dividing>{I18n.t("label.CITY")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                <Form.Group inline className='nonbordered'>
                                    <Form.Select
                                        id='city'
                                        fluid
                                        options={cities}
                                        placeholder={I18n.t("label.CITY")}
                                        value={this.state.request.city}
                                        search
                                        onChange={this.handleDropdownChangeCity} error={this.state.fieldErrors.city}
                                    />
                                </Form.Group>
                            </div>
                            <div>
                                <Header as='h5' dividing>{I18n.t("label.DISTRICT")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                <Form.Group inline className='nonbordered'>
                                    <Form.Select
                                        id='district'
                                        fluid
                                        options={districts}
                                        placeholder={I18n.t("label.DISTRICT")}
                                        value={this.state.request.district}
                                        search
                                        onChange={this.handleDropdownChangeDistrict} error={this.state.fieldErrors.district}
                                    />
                                </Form.Group>
                            </div>

                            <div>
                                <Header as='h5' dividing>{I18n.t("label.NEIGHBORHOOD")}</Header>
                                <Form.Group inline className='nonbordered'>
                                    <Form.Select
                                        id='neighborhood'
                                        fluid
                                        options={neighborhoods}
                                        placeholder={I18n.t("label.NEIGHBORHOOD")}
                                        value={this.state.request.neighborhood}
                                        search
                                        onChange={this.handleDropdownChange} error={this.state.fieldErrors.neighborhood}
                                    />
                                </Form.Group>
                            </div>
                            <div>
                                <Header as='h5' dividing>{I18n.t("label.ADDRESS")}</Header>
                                <Form.Group inline className='nonbordered'>
                                    <Form.TextArea id='addressText' rows={6} value={this.state.request.addressText} placeholder={I18n.t("label.ADDRESS")} onChange={this.handleInputChange} error={this.state.fieldErrors.addressText} />
                                </Form.Group>
                            </div>

                            <div>
                                <Header as='h5' dividing>{I18n.t("label.PARCEL_SEARCH_URL")}</Header>
                                <Form.Group inline className='nonbordered'>
                                    <Form.Input style={{ width: '100%' }} id='parcelSearchUrl' value={this.state.request.parcelSearchUrl} fluid placeholder={I18n.t("label.PARCEL_SEARCH_URL")} onChange={this.handleInputChange} error={this.state.fieldErrors.parcelSearchUrl} />
                                </Form.Group>
                            </div>


                            <Grid doubling columns={2}>
                                <Grid.Column>
                                    <div>
                                        <Header as='h5' dividing>{I18n.t("label.LATITUDE")}</Header>
                                        <Form.Group inline className='nonbordered'>
                                            <NumberFormat style={{ width: '100%' }} id='latitude' placeholder={I18n.t("label.LATITUDE")}
                                                onValueChange={(values) => {
                                                    const { floatValue } = values;
                                                    let request = this.state.request;
                                                    request.latitude = floatValue;
                                                    this.setState({ request });
                                                }}
                                                value={this.state.request.latitude}
                                                thousandSeparator={false}
                                                decimalSeparator="," />
                                        </Form.Group>
                                    </div>

                                    <div>
                                        <Header as='h5' dividing>{I18n.t("label.LONGITUDE")}</Header>
                                        <Form.Group inline className='nonbordered'>
                                            <NumberFormat style={{ width: '100%' }} id='longitude' placeholder={I18n.t("label.LONGITUDE")}
                                                onValueChange={(values) => {
                                                    const { floatValue } = values;
                                                    let request = this.state.request;
                                                    request.longitude = floatValue;
                                                    this.setState({ request });
                                                }}
                                                value={this.state.request.longitude}
                                                thousandSeparator={false}
                                                decimalSeparator="," />
                                        </Form.Group>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    {
                                        /*
                                        <MapContainer onClick={this.handleMapOnClick} lat={this.state.request.latitude ? this.state.request.latitude : 41.015137} lng={this.state.request.longitude ? this.state.request.longitude : 28.979530} />
                                        */
                                    }
                                    <GoogleMapContainer onClick={this.handleMapOnClick} latInitial={this.state.latitudeInitial ? this.state.latitudeInitial : 41.015137} lngInitial={this.state.longitudeInitial ? this.state.longitudeInitial : 28.979530} lat={this.state.request.latitude ? this.state.request.latitude : 41.015137} lng={this.state.request.longitude ? this.state.request.longitude : 28.979530} />
                                </Grid.Column>
                            </Grid>
                        </Form>
                        : null
                }
                <Grid padded stackable columns={3}>
                    <Grid.Column floated='left' textAlign='left'>
                        <Button onClick={() => this.back()} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.PREVIOUS_STEP")}></Button>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right'>
                        <Button onClick={() => this.submit(-1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_EXIT")}></Button>
                        <Button onClick={() => this.submit(1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_CONTINUE")}></Button>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}