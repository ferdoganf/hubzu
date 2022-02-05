import React, { Component } from 'react';
import { Form, Header, Segment, Grid, Button } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class RealestateUpdateEndDateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null,
            endDate: (this.props.realestateCreated && this.props.realestateCreated.endDate) ? moment.utc(this.props.realestateCreated.endDate).local().toDate() : null,
            formErrorList: [],
            fieldErrors: {}
        };
        this.handleEndDate = this.handleEndDate.bind(this);
    }


    handleEndDate(value) {
        this.setState({ endDate: value });
    }

    preparePageHeader(prevProps, prevState) {
        if (this.props.realestateCreated) {
            if (
                prevProps == null || prevState == null ||
                (this.props.lastResponseId !== prevProps.lastResponseId) ||
                (!prevProps.realestateCreated) ||
                (!prevProps.realestateCreated.realEstateAddress) ||
                (!prevProps.realestateCreated.realEstateAddress.city) ||
                (!prevProps.realestateCreated.realEstateAddress.district) ||
                (this.props.realestateCreated.code !== prevProps.realestateCreated.code) ||
                (this.props.realestateCreated.bank !== prevProps.realestateCreated.bank) ||
                (this.props.realestateCreated.realEstateType !== prevProps.realestateCreated.realEstateType) ||
                (this.props.realestateCreated.realEstateSubType !== prevProps.realestateCreated.realEstateSubType) ||
                ((this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.city && (this.props.realestateCreated.realEstateAddress.city.code !== prevProps.realestateCreated.realEstateAddress.city.code))) ||
                ((this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.district && (this.props.realestateCreated.realEstateAddress.district.code !== prevProps.realestateCreated.realEstateAddress.district.code)))
            ) {
                let sections = [];
                sections.push({ key: 'RUPbreadcrumb1', content: I18n.t('menu.REALESTATE'), link: true, active: true });
                sections.push({ key: 'RUPbreadcrumb2', content: this.props.realestateCreated.code });

                if (this.props.realestateCreated.bank) {
                    sections.push({ key: 'RUPbreadcrumb3', content: this.props.realestateCreated.bank.name });
                }

                if (this.props.realestateCreated && this.props.realestateCreated.realEstateType) {
                    sections.push({ key: 'RUPbreadcrumb4', content: I18n.t('label.' + this.props.realestateCreated.realEstateType.code) });
                }

                if (this.props.realestateCreated && this.props.realestateCreated.realEstateSubType) {
                    sections.push({ key: 'RUPbreadcrumb5', content: I18n.t('label.' + this.props.realestateCreated.realEstateSubType.code) });
                }

                if (this.props.realestateCreated && this.props.realestateCreated && this.props.realestateCreated.realEstateAddress.city) {
                    sections.push({ key: 'RUPbreadcrumb6', content: this.props.realestateCreated.realEstateAddress.city.name });
                }

                if (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.district) {
                    sections.push({ key: 'RUPbreadcrumb7', content: this.props.realestateCreated.realEstateAddress.district.name });
                }
                this.props.setPageHeader(sections);
            }
        }
    }

    componentDidMount() {
        this.preparePageHeader();
    }

    componentDidUpdate(prevProps, prevState) {
        this.preparePageHeader(prevProps, prevState);
        if (this.props.realestateCreated && (!this.props.realestateCreated.endDate)) {
            this.back();
        }
    }

    back() {
        this.props.history.push('/admin/realestate/' + this.props.realestateCreated.code + '/view');
    }


    submit() {
        if (this.state.endDate) {
            this.props.updateRealestateEndDate(this.state.endDate.toISOString());
        }
    }

    render() {
        return (
            <Segment attached padded='very'>
                {
                    (this.props.realestateCreated) ?
                        <Form>

                            <div>
                                <Header as='h5' dividing>{I18n.t("label.AUCTION_END_DATE")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                <DatePicker selected={this.state.endDate} showTimeInput
                                    onChange={(date) => this.handleEndDate(date)} dateFormat='yyyy-MM-dd HH:mm' />

                            </div>
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
                        <Button onClick={() => this.submit()} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE")}></Button>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}