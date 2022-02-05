import React, { Component } from 'react';
import { Form, Header, Segment, Grid, Button } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';
import moment from 'moment';

export default class RealestateUpdateStatusForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null,
            status: (this.props.realestateCreated && this.props.realestateCreated.realEstateStatus) ? this.props.realestateCreated.realEstateStatus.code : 'PASSIVE',
            formErrorList: [],
            fieldErrors: {}
        };
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleRadioChange(e, result) {
        const { name, value } = result
        this.setState({ [name]: value });
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
    }

    back() {
        this.props.history.push('/admin/realestate/' + this.props.realestateCreated.code + '/view');
    }


    submit() {
        this.props.updateRealestateStatus(this.state.status);
    }

    render() {

        const { realestateCreated, systemDate } = this.props;
        let closeForBid = false;
        let startedBefore = false;
        if (realestateCreated) {
            if (realestateCreated.startDate && (moment.utc(realestateCreated.startDate) < moment.utc(systemDate))) {
                startedBefore = true;
            }
            if (realestateCreated.endDate && (moment.utc(realestateCreated.endDate) < moment.utc(systemDate))) {
                closeForBid = true;
            }
        }

        let statusList = [
            { code: 'ACTIVE', active: true },
            { code: 'PASSIVE', active: true },
            { code: 'STARTED', active: true },
            { code: 'FINISHED', active: true },
            { code: 'FINISHED_SOLD', active: true },
            { code: 'CANCELLED', active: true }
        ];

        if (this.props.realestateCreated && this.props.realestateCreated.realEstateStatus) {
            if (this.props.realestateCreated.realEstateStatus.code === 'ACTIVE') {
                statusList = [
                    { code: 'ACTIVE', active: true },
                    { code: 'PASSIVE', active: true },
                    { code: 'STARTED', active: false },
                    { code: 'FINISHED', active: false },
                    { code: 'FINISHED_SOLD', active: false },
                    { code: 'CANCELLED', active: true }
                ];
            } else if (this.props.realestateCreated.realEstateStatus.code === 'PASSIVE') {
                statusList = [
                    { code: 'ACTIVE', active: !startedBefore },
                    { code: 'PASSIVE', active: true },
                    { code: 'STARTED', active: startedBefore },
                    { code: 'FINISHED', active: false },
                    { code: 'FINISHED_SOLD', active: false },
                    { code: 'CANCELLED', active: true }
                ];
            } else if (this.props.realestateCreated.realEstateStatus.code === 'STARTED') {
                statusList = [
                    { code: 'ACTIVE', active: false },
                    { code: 'PASSIVE', active: true },
                    { code: 'STARTED', active: true },
                    { code: 'FINISHED', active: true },
                    { code: 'FINISHED_SOLD', active: false },
                    { code: 'CANCELLED', active: true }
                ];
            } else if (this.props.realestateCreated.realEstateStatus.code === 'FINISHED') {
                statusList = [
                    { code: 'ACTIVE', active: false },
                    { code: 'PASSIVE', active: false },
                    { code: 'STARTED', active: false },
                    { code: 'FINISHED', active: false },
                    { code: 'FINISHED_SOLD', active: closeForBid },
                    { code: 'CANCELLED', active: false }
                ];
            } else if (this.props.realestateCreated.realEstateStatus.code === 'FINISHED_SOLD') {
                statusList = [
                    { code: 'ACTIVE', active: false },
                    { code: 'PASSIVE', active: false },
                    { code: 'STARTED', active: false },
                    { code: 'FINISHED', active: false },
                    { code: 'FINISHED_SOLD', active: false },
                    { code: 'CANCELLED', active: false }
                ];
            } else if (this.props.realestateCreated.realEstateStatus.code === 'CANCELLED') {
                statusList = [
                    { code: 'ACTIVE', active: false },
                    { code: 'PASSIVE', active: true },
                    { code: 'STARTED', active: false },
                    { code: 'FINISHED', active: false },
                    { code: 'FINISHED_SOLD', active: false },
                    { code: 'CANCELLED', active: true }
                ];
            }
        }

        return (
            <Segment attached padded='very'>
                {
                    (this.props.realestateCreated) ?
                        <Form>

                            <div>
                                <Header as='h5' dividing>{I18n.t("label.STATUS")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                <Form.Group grouped className='bordered'>
                                    {
                                        statusList.map(
                                            status => {
                                                return (<Form.Radio
                                                    key={status.code}
                                                    name='status'
                                                    checked={this.state.status === status.code}
                                                    onChange={this.handleRadioChange}
                                                    label={I18n.t('label.' + status.code)}
                                                    value={status.code}
                                                    disabled={!status.active}
                                                />);

                                            }
                                        )}
                                </Form.Group>
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