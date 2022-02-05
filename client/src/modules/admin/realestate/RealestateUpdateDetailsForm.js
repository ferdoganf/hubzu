import React, { Component } from 'react';
import { Form, Segment, Grid, Button, Header } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';
import RealestateDetailsRadioPanel from './RealestateDetailsRadioPanel'
import RealestateDetailsCheckboxPanel from './RealestateDetailsCheckboxPanel'
import NumberFormat from 'react-number-format';

export default class RealestateUpdateDetailsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: {
                residentialType: (this.props.realestateCreated && this.props.realestateCreated.residentialType) ? this.props.realestateCreated.residentialType.code : null,

                floorSpaceGross: (this.props.realestateCreated && this.props.realestateCreated.floorSpaceGross) ? this.props.realestateCreated.floorSpaceGross : null,
                floorSpaceNet: (this.props.realestateCreated && this.props.realestateCreated.floorSpaceNet) ? this.props.realestateCreated.floorSpaceNet : null,
                dues: (this.props.realestateCreated && this.props.realestateCreated.dues) ? this.props.realestateCreated.dues : null,

                ageOfBuilding: (this.props.realestateCreated && this.props.realestateCreated.ageOfBuilding) ? this.props.realestateCreated.ageOfBuilding.code : null,
                heating: (this.props.realestateCreated && this.props.realestateCreated.heating) ? this.props.realestateCreated.heating.code : null,
                useStatus: (this.props.realestateCreated && this.props.realestateCreated.useStatus) ? this.props.realestateCreated.useStatus.code : null,

                numberOfRooms: (this.props.realestateCreated && this.props.realestateCreated.numberOfRooms) ? this.props.realestateCreated.numberOfRooms.code : null,
                floorNumber: (this.props.realestateCreated && this.props.realestateCreated.floorNumber) ? this.props.realestateCreated.floorNumber.code : null,
                numberOfFloors: (this.props.realestateCreated && this.props.realestateCreated.numberOfFloors) ? this.props.realestateCreated.numberOfFloors.code : null,
                numberOfBathrooms: (this.props.realestateCreated && this.props.realestateCreated.numberOfBathrooms) ? this.props.realestateCreated.numberOfBathrooms.code : null,
                balcony: (this.props.realestateCreated && this.props.realestateCreated.balcony) ? this.props.realestateCreated.balcony.code : null,
                furnished: (this.props.realestateCreated && this.props.realestateCreated.furnished) ? this.props.realestateCreated.furnished.code : null,
                buildingComplex: (this.props.realestateCreated && this.props.realestateCreated.buildingComplex) ? this.props.realestateCreated.buildingComplex.code : null,
                eligibleForBankCredit: (this.props.realestateCreated && this.props.realestateCreated.eligibleForBankCredit) ? this.props.realestateCreated.eligibleForBankCredit.code : null,

                frontages: (this.props.realestateCreated && this.props.realestateCreated.frontages) ? this.props.realestateCreated.frontages.map(obj => obj.code) : [],
                interiorProperties: (this.props.realestateCreated && this.props.realestateCreated.interiorProperties) ? this.props.realestateCreated.interiorProperties.map(obj => obj.code) : [],
                externalProperties: (this.props.realestateCreated && this.props.realestateCreated.externalProperties) ? this.props.realestateCreated.externalProperties.map(obj => obj.code) : [],

                commercialType: (this.props.realestateCreated && this.props.realestateCreated.commercialType) ? this.props.realestateCreated.commercialType.code : null,
                generalProperties: (this.props.realestateCreated && this.props.realestateCreated.generalProperties) ? this.props.realestateCreated.generalProperties.map(obj => obj.code) : [],

                landType: (this.props.realestateCreated && this.props.realestateCreated.landType) ? this.props.realestateCreated.landType.code : null,
                landToBuildingRatio: (this.props.realestateCreated && this.props.realestateCreated.landToBuildingRatio) ? this.props.realestateCreated.landToBuildingRatio.code : null,
                heightRestriction: (this.props.realestateCreated && this.props.realestateCreated.heightRestriction) ? this.props.realestateCreated.heightRestriction.code : null,
                landStatus: (this.props.realestateCreated && this.props.realestateCreated.landStatus) ? this.props.realestateCreated.landStatus.code : null,
                infrastructures: (this.props.realestateCreated && this.props.realestateCreated.infrastructures) ? this.props.realestateCreated.infrastructures.map(obj => obj.code) : [],
                generalFeatures: (this.props.realestateCreated && this.props.realestateCreated.generalFeatures) ? this.props.realestateCreated.generalFeatures.map(obj => obj.code) : []
            },
            formErrorList: [],
            fieldErrors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    preparePageHeader(prevProps, prevState) {
        if (
            prevProps == null || prevState == null ||
            (this.props.lastResponseId !== prevProps.lastResponseId) ||
            (!prevProps.realestateCreated) ||
            (this.props.realestateCreated.code !== prevProps.realestateCreated.code) ||
            (this.props.realestateCreated.bank !== prevProps.realestateCreated.bank) ||
            (this.props.realestateCreated.realEstateType !== prevProps.realestateCreated.realEstateType) ||
            (this.state.request.residentialType !== prevState.request.residentialType)
        ) {

            let sections = [];

            sections.push({ key: 'RUDbreadcrumb1', content: I18n.t('menu.REALESTATE'), link: true, active: true });
            sections.push({ key: 'RUDbreadcrumb2', content: this.props.realestateCreated.code });

            if (this.props.realestateCreated.bank) {
                sections.push({ key: 'RUDbreadcrumb3', content: this.props.realestateCreated.bank.name });
            }

            if (this.props.realestateCreated.realEstateType) {
                sections.push({ key: 'RUDbreadcrumb4', content: I18n.t('label.' + this.props.realestateCreated.realEstateType.code) });
            }

            if (this.state.request.residentialType) {
                sections.push({ key: 'RUDbreadcrumb5', content: I18n.t('label.' + this.state.request.residentialType) });
            }

            this.props.setPageHeader(sections);
        }
    }

    componentDidMount() {
        this.preparePageHeader();
    }

    componentDidUpdate(prevProps, prevState) {
        this.preparePageHeader(prevProps, prevState);
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
        request[id] = value;
        this.setState({ request });
    }

    handleRadioChange(e, result) {
        const { name, value } = result
        let request = this.state.request;
        this.setState({ request: Object.assign({}, request, { [name]: value }) });
    }

    handleCheckboxChange(e, result) {
        const { name, value } = result

        let request = this.state.request;
        let list = request[name]
        if (list) {
            if (list.includes(value)) {
                list = list.filter(e => e !== value)
            } else {
                list.push(value)
            }
        } else {
            list = [value];
        }
        request[name] = list;
        this.setState({ request });
    }

    back() {
        this.props.history.push('/admin/realestate/' + this.props.realestateCreated.code);
    }

    submit(route) {
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};
        if (this.props.realestateCreated) {

            if (this.props.realestateCreated && this.props.realestateCreated.realEstateType) {

                if ((this.props.realestateCreated.realEstateType.code === 'RESIDENTIAL')) {
                    if ((!this.state.request.residentialType) || (!this.state.request.residentialType.trim())) {
                        formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.RESIDENTIAL_TYPE") }));
                        fieldErrors.residentialType = true;
                    }
                } else if ((this.props.realestateCreated.realEstateType.code === 'COMMERCIAL')) {
                    if ((!this.state.request.commercialType) || (!this.state.request.commercialType.trim())) {
                        formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.COMMERCIAL_TYPE") }));
                        fieldErrors.commercialType = true;
                    }
                } else if ((this.props.realestateCreated.realEstateType.code === 'LAND')) {
                    if ((!this.state.request.landType) || (!this.state.request.landType.trim())) {
                        formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.LAND_TYPE") }));
                        fieldErrors.landType = true;
                    }
                }
            }

            this.setState({ formErrorList, fieldErrors });
            if (formErrorList.length === 0) {
                this.props.updateRealEstate(route, this.state.request);
            } else {
                this.props.showErrorListModal(formErrorList);
            }
        }
    }

    render() {
        return (
            <Segment attached padded='very'>
                {
                    (this.props.realestateCreated.realEstateType) ?
                        (
                            (
                                (this.props.realestateCreated.realEstateType.code === 'RESIDENTIAL') ?
                                    <Form>
                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.residentialTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='residentialType' panelTitle={I18n.t("label.RESIDENTIAL_TYPE")} panelItems={this.props.realestateMetadata.residentialTypes} panelSelectedItem={this.state.request.residentialType} handleRadioChange={this.handleRadioChange} required={true} columnSize={2} />
                                                : null
                                        }

                                        <div>
                                            <Header as='h5' dividing>{I18n.t("label.FLOOR_SPACE_GROSS")}</Header>
                                            <Form.Group inline className='nonbordered'>
                                                <NumberFormat style={{ width: '100%' }} id='floorSpaceGross' placeholder={I18n.t("label.FLOOR_SPACE_GROSS")} onChange={this.handleInputChange} value={this.state.request.floorSpaceGross} thousandSeparator={false} decimalScale={0} />
                                            </Form.Group>
                                        </div>

                                        <div>
                                            <Header as='h5' dividing>{I18n.t("label.FLOOR_SPACE_NET")}</Header>
                                            <Form.Group inline className='nonbordered'>
                                                <NumberFormat style={{ width: '100%' }} id='floorSpaceNet' placeholder={I18n.t("label.FLOOR_SPACE_NET")} onChange={this.handleInputChange} value={this.state.request.floorSpaceNet} thousandSeparator={false} decimalScale={0} />
                                            </Form.Group>
                                        </div>

                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.ageOfBuildingTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='ageOfBuilding' panelTitle={I18n.t("label.AGE_OF_BUILDING")} panelItems={this.props.realestateMetadata.ageOfBuildingTypes} panelSelectedItem={this.state.request.ageOfBuilding} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                : null
                                        }
                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.heatingTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='heating' panelTitle={I18n.t("label.HEATING")} panelItems={this.props.realestateMetadata.heatingTypes} panelSelectedItem={this.state.request.heating} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                : null
                                        }
                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.useStatusTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='useStatus' panelTitle={I18n.t("label.USE_STATUS")} panelItems={this.props.realestateMetadata.useStatusTypes} panelSelectedItem={this.state.request.useStatus} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                : null
                                        }

                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.numberOfRoomsTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='numberOfRooms' panelTitle={I18n.t("label.NUMBER_OF_ROOMS")} panelItems={this.props.realestateMetadata.numberOfRoomsTypes} panelSelectedItem={this.state.request.numberOfRooms} handleRadioChange={this.handleRadioChange} columnSize={1} />
                                                : null
                                        }

                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.floorNumberTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='floorNumber' panelTitle={I18n.t("label.FLOOR_NUMBER")} panelItems={this.props.realestateMetadata.floorNumberTypes} panelSelectedItem={this.state.request.floorNumber} handleRadioChange={this.handleRadioChange} columnSize={1} />
                                                : null
                                        }

                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.numberOfFloorsTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='numberOfFloors' panelTitle={I18n.t("label.NUMBER_OF_FLOORS")} panelItems={this.props.realestateMetadata.numberOfFloorsTypes} panelSelectedItem={this.state.request.numberOfFloors} handleRadioChange={this.handleRadioChange} columnSize={1} />
                                                : null
                                        }
                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.numberOfBathroomsTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='numberOfBathrooms' panelTitle={I18n.t("label.NUMBER_OF_BATHROOMS")} panelItems={this.props.realestateMetadata.numberOfBathroomsTypes} panelSelectedItem={this.state.request.numberOfBathrooms} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                : null
                                        }
                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.balconyTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='balcony' panelTitle={I18n.t("label.BALCONY")} panelItems={this.props.realestateMetadata.balconyTypes} panelSelectedItem={this.state.request.balcony} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                : null
                                        }
                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.furnishedTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='furnished' panelTitle={I18n.t("label.FURNISHED")} panelItems={this.props.realestateMetadata.furnishedTypes} panelSelectedItem={this.state.request.furnished} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                : null
                                        }
                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.buildingComplexTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='buildingComplex' panelTitle={I18n.t("label.BUILDING_COMPLEX")} panelItems={this.props.realestateMetadata.buildingComplexTypes} panelSelectedItem={this.state.request.buildingComplex} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                : null
                                        }
                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.eligibleForBankCreditTypes) ?
                                                < RealestateDetailsRadioPanel fieldName='eligibleForBankCredit' panelTitle={I18n.t("label.ELIGIBLE_FOR_BANK_CREDIT")} panelItems={this.props.realestateMetadata.eligibleForBankCreditTypes} panelSelectedItem={this.state.request.eligibleForBankCredit} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                : null
                                        }

                                        <div>
                                            <Header as='h5' dividing>{I18n.t("label.DUES")}</Header>
                                            <Form.Group inline className='nonbordered'>
                                                <NumberFormat style={{ width: '100%' }} id='dues' placeholder={I18n.t("label.DUES")}
                                                    onValueChange={(values) => {
                                                        const { floatValue } = values;
                                                        let request = this.state.request;
                                                        request.dues = floatValue;
                                                        this.setState({ request });
                                                    }} value={this.state.request.dues} thousandSeparator={true} prefix={'₺'} decimalScale={0} />

                                            </Form.Group>
                                        </div>

                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.frontageTypes) ?
                                                < RealestateDetailsCheckboxPanel fieldName='frontages' panelTitle={I18n.t("label.FRONTAGES")} panelItems={this.props.realestateMetadata.frontageTypes} panelSelectedItems={this.state.request.frontages} handleCheckboxChange={this.handleCheckboxChange} columnSize={2} />
                                                : null
                                        }
                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.interiorPropertyTypes) ?
                                                < RealestateDetailsCheckboxPanel fieldName='interiorProperties' panelTitle={I18n.t("label.INTERIOR_PROPERTIES")} panelItems={this.props.realestateMetadata.interiorPropertyTypes} panelSelectedItems={this.state.request.interiorProperties} handleCheckboxChange={this.handleCheckboxChange} columnSize={2} />
                                                : null
                                        }
                                        {
                                            (this.props.realestateMetadata && this.props.realestateMetadata.externalPropertyTypes) ?
                                                < RealestateDetailsCheckboxPanel fieldName='externalProperties' panelTitle={I18n.t("label.EXTERNAL_PROPERTIES")} panelItems={this.props.realestateMetadata.externalPropertyTypes} panelSelectedItems={this.state.request.externalProperties} handleCheckboxChange={this.handleCheckboxChange} columnSize={2} />
                                                : null
                                        }
                                    </Form>
                                    : (
                                        (this.props.realestateCreated.realEstateType.code === 'COMMERCIAL') ?
                                            <Form>
                                                {
                                                    (this.props.realestateMetadata && this.props.realestateMetadata.commercialTypes) ?
                                                        < RealestateDetailsRadioPanel fieldName='commercialType' panelTitle={I18n.t("label.COMMERCIAL_TYPE")} panelItems={this.props.realestateMetadata.commercialTypes} panelSelectedItem={this.state.request.commercialType} handleRadioChange={this.handleRadioChange} required={true} columnSize={2} />
                                                        : null
                                                }

                                                <div>
                                                    <Header as='h5' dividing>{I18n.t("label.FLOOR_SPACE_GROSS")}</Header>
                                                    <Form.Group inline className='nonbordered'>
                                                        <NumberFormat style={{ width: '100%' }} id='floorSpaceGross' placeholder={I18n.t("label.FLOOR_SPACE_GROSS")} onChange={this.handleInputChange} value={this.state.request.floorSpaceGross} thousandSeparator={false} decimalScale={0} />
                                                    </Form.Group>
                                                </div>

                                                <div>
                                                    <Header as='h5' dividing>{I18n.t("label.FLOOR_SPACE_NET")}</Header>
                                                    <Form.Group inline className='nonbordered'>
                                                        <NumberFormat style={{ width: '100%' }} id='floorSpaceNet' placeholder={I18n.t("label.FLOOR_SPACE_NET")} onChange={this.handleInputChange} value={this.state.request.floorSpaceNet} thousandSeparator={false} decimalScale={0} />
                                                    </Form.Group>
                                                </div>

                                                {
                                                    (this.props.realestateMetadata && this.props.realestateMetadata.ageOfBuildingTypes) ?
                                                        < RealestateDetailsRadioPanel fieldName='ageOfBuilding' panelTitle={I18n.t("label.AGE_OF_BUILDING")} panelItems={this.props.realestateMetadata.ageOfBuildingTypes} panelSelectedItem={this.state.request.ageOfBuilding} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                        : null
                                                }
                                                {
                                                    (this.props.realestateMetadata && this.props.realestateMetadata.heatingTypes) ?
                                                        < RealestateDetailsRadioPanel fieldName='heating' panelTitle={I18n.t("label.HEATING")} panelItems={this.props.realestateMetadata.heatingTypes} panelSelectedItem={this.state.request.heating} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                        : null
                                                }
                                                {
                                                    (this.props.realestateMetadata && this.props.realestateMetadata.useStatusTypes) ?
                                                        < RealestateDetailsRadioPanel fieldName='useStatus' panelTitle={I18n.t("label.USE_STATUS")} panelItems={this.props.realestateMetadata.useStatusTypes} panelSelectedItem={this.state.request.useStatus} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                        : null
                                                }

                                                <div>
                                                    <Header as='h5' dividing>{I18n.t("label.DUES")}</Header>
                                                    <Form.Group inline className='nonbordered'>
                                                        <NumberFormat style={{ width: '100%' }} id='dues' placeholder={I18n.t("label.DUES")} onChange={this.handleInputChange} value={this.state.request.dues} thousandSeparator={false} decimalScale={0} />
                                                    </Form.Group>
                                                </div>

                                                {
                                                    (this.props.realestateMetadata && this.props.realestateMetadata.frontageTypes) ?
                                                        < RealestateDetailsCheckboxPanel fieldName='frontages' panelTitle={I18n.t("label.FRONTAGES")} panelItems={this.props.realestateMetadata.frontageTypes} panelSelectedItems={this.state.request.frontages} handleCheckboxChange={this.handleCheckboxChange} columnSize={2} />
                                                        : null
                                                }

                                                {
                                                    (this.props.realestateMetadata && this.props.realestateMetadata.generalPropertyTypes) ?
                                                        < RealestateDetailsCheckboxPanel fieldName='generalProperties' panelTitle={I18n.t("label.GENERAL_PROPERTIES")} panelItems={this.props.realestateMetadata.generalPropertyTypes} panelSelectedItems={this.state.request.generalProperties} handleCheckboxChange={this.handleCheckboxChange} columnSize={2} />
                                                        : null
                                                }
                                            </Form>
                                            : (
                                                (this.props.realestateCreated.realEstateType.code === 'LAND') ?
                                                    <Form>
                                                        {
                                                            (this.props.realestateMetadata && this.props.realestateMetadata.landTypes) ?
                                                                < RealestateDetailsRadioPanel fieldName='landType' panelTitle={I18n.t("label.LAND_TYPE")} panelItems={this.props.realestateMetadata.landTypes} panelSelectedItem={this.state.request.landType} handleRadioChange={this.handleRadioChange} required={true} columnSize={2} />
                                                                : null
                                                        }

                                                        <div>
                                                            <Header as='h5' dividing>{I18n.t("label.FLOOR_SPACE_NET")}</Header>
                                                            <Form.Group inline className='nonbordered'>
                                                                <NumberFormat style={{ width: '100%' }} id='floorSpaceNet' placeholder={I18n.t("label.FLOOR_SPACE_NET")} onChange={this.handleInputChange} value={this.state.request.floorSpaceNet} thousandSeparator={false} decimalScale={0} />
                                                            </Form.Group>
                                                        </div>

                                                        {
                                                            (this.props.realestateMetadata && this.props.realestateMetadata.landToBuildingRatioTypes) ?
                                                                < RealestateDetailsRadioPanel fieldName='landToBuildingRatio' panelTitle={I18n.t("label.LAND_TO_BUILDING_RATIO")} panelItems={this.props.realestateMetadata.landToBuildingRatioTypes} panelSelectedItem={this.state.request.landToBuildingRatio} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                                : null
                                                        }

                                                        {
                                                            (this.props.realestateMetadata && this.props.realestateMetadata.heightRestrictionTypes) ?
                                                                < RealestateDetailsRadioPanel fieldName='heightRestriction' panelTitle={I18n.t("label.HEIGHT_RESTRICTION")} panelItems={this.props.realestateMetadata.heightRestrictionTypes} panelSelectedItem={this.state.request.heightRestriction} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                                : null
                                                        }
                                                        {
                                                            (this.props.realestateMetadata && this.props.realestateMetadata.landStatusTypes) ?
                                                                < RealestateDetailsRadioPanel fieldName='landStatus' panelTitle={I18n.t("label.LAND_STATUS")} panelItems={this.props.realestateMetadata.landStatusTypes} panelSelectedItem={this.state.request.landStatus} handleRadioChange={this.handleRadioChange} columnSize={2} />
                                                                : null
                                                        }

                                                        {
                                                            (this.props.realestateMetadata && this.props.realestateMetadata.infrastructureTypes) ?
                                                                < RealestateDetailsCheckboxPanel fieldName='infrastructures' panelTitle={I18n.t("label.INFRASTRUCTURES")} panelItems={this.props.realestateMetadata.infrastructureTypes} panelSelectedItems={this.state.request.infrastructures} handleCheckboxChange={this.handleCheckboxChange} columnSize={2} />
                                                                : null
                                                        }

                                                        {
                                                            (this.props.realestateMetadata && this.props.realestateMetadata.generalFeatureTypes) ?
                                                                < RealestateDetailsCheckboxPanel fieldName='generalFeatures' panelTitle={I18n.t("label.GENERAL_FEATURES")} panelItems={this.props.realestateMetadata.generalFeatureTypes} panelSelectedItems={this.state.request.generalFeatures} handleCheckboxChange={this.handleCheckboxChange} columnSize={2} />
                                                                : null
                                                        }




                                                    </Form>
                                                    : null
                                            )
                                    )
                            )
                        )
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