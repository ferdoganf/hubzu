import React, { Component } from 'react';
import { Form, Header, Segment, Grid, Button, Radio } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';
import NumberFormat from 'react-number-format';

export default class BankCreateUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.bankCreated ? this.props.bankCreated.code : '',
            name: this.props.bankCreated ? this.props.bankCreated.name : '',
            depositRate: this.props.bankCreated ? this.props.bankCreated.depositRate : 1,
            serviceFeeRate: this.props.bankCreated ? this.props.bankCreated.serviceFeeRate : 0,
            buyerWarrantAlert: this.props.bankCreated ? this.props.bankCreated.buyerWarrantAlert : '',
            finishedAuctionsShown: this.props.bankCreated ? this.props.bankCreated.finishedAuctionsShown : false,
            enabled: this.props.bankCreated ? this.props.bankCreated.enabled : false,
            formErrorList: [],
            fieldErrors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleToggleFinishedAuctionsShown = this.handleToggleFinishedAuctionsShown.bind(this);
    }

    handleToggleFinishedAuctionsShown(e, result) {
        this.setState({ finishedAuctionsShown: result.checked });
    }

    handleToggle(e, result) {
        this.setState({ enabled: result.checked });
    }

    preparePageHeader(prevProps, prevState) {

        if (
            prevProps == null || prevState == null ||
            (this.props.code !== prevProps.code) ||
            (this.state.name !== prevState.name)
        ) {
            let sections = [];
            sections.push({ key: 'BCUFbreadcrumb1', content: I18n.t('menu.BANK'), link: true, active: true });

            if (this.state.code) {
                sections.push({ key: 'BCUFbreadcrumb2', content: this.state.code });
            }

            if (this.state.name) {
                sections.push({ key: 'BCUFbreadcrumb3', content: this.state.name });
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

    back() {
        this.props.history.push("/admin/bank/list");
    }

    submit(route) {
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};

        let inputList = [
            { field: 'code', label: I18n.t("label.BANK_CODE") },
            { field: 'name', label: I18n.t("label.BANK_NAME") },
            { field: 'buyerWarrantAlert', label: I18n.t("label.ALERT_MESSAGE") }

        ];

        inputList.forEach(input => {
            if ((!this.state[input.field]) || (!this.state[input.field].trim())) {
                formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: input.label }));
                fieldErrors[input.field] = true;
            }
        });

        this.setState({ formErrorList, fieldErrors });
        if (formErrorList.length === 0) {
            let bank = {
                code: this.state.code,
                name: this.state.name,
                enabled: this.state.enabled,
                finishedAuctionsShown: this.state.finishedAuctionsShown,
                depositRate: this.state.depositRate ? Number(this.state.depositRate) : 0,
                serviceFeeRate: this.state.serviceFeeRate ? Number(this.state.serviceFeeRate) : 0,
                buyerWarrantAlert: this.state.buyerWarrantAlert
            }
            this.props.createUpdateAction(route, bank);
        } else {
            this.props.showErrorListModal(formErrorList);
        }
    }

    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    render() {
        return (
            <Segment attached padded='very'>
                <Form>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.BANK_CODE")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.Input style={{ width: '100%' }} id='code' value={this.state.code} fluid placeholder={I18n.t("label.BANK_CODE")} onChange={this.handleInputChange} error={this.state.fieldErrors.code} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.BANK_NAME")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.Input style={{ width: '100%' }} id='name' value={this.state.name} fluid placeholder={I18n.t("label.BANK_NAME")} onChange={this.handleInputChange} error={this.state.fieldErrors.name} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.ENABLED")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <Radio toggle
                                checked={this.state.enabled}
                                onChange={this.handleToggle}
                            />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.DEPOSIT_RATE")}</Header>
                        <Form.Group inline className='nonbordered'>

                            <NumberFormat style={{ width: '100%' }} id='depositRate' placeholder={I18n.t("label.DEPOSIT_RATE")}
                                onValueChange={(values) => {
                                    const { floatValue } = values;
                                    this.setState({ depositRate: floatValue });
                                }} value={this.state.depositRate} thousandSeparator={true} prefix={'%'} decimalScale={0} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.SERVICE_FEE_RATE")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <NumberFormat style={{ width: '100%' }} id='serviceFeeRate' placeholder={I18n.t("label.SERVICE_FEE_RATE")}
                                onValueChange={(values) => {
                                    const { floatValue } = values;
                                    this.setState({ serviceFeeRate: floatValue });
                                }} value={this.state.serviceFeeRate} thousandSeparator={true} prefix={'%'} decimalScale={2} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.FINISHED_AUCTIONS_SHOWN")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <Radio toggle
                                checked={this.state.finishedAuctionsShown}
                                onChange={this.handleToggleFinishedAuctionsShown}
                            />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.ALERT_MESSAGE")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.TextArea id='buyerWarrantAlert' value={this.state.buyerWarrantAlert} rows={6} placeholder={I18n.t("label.ALERT_MESSAGE")} onChange={this.handleInputChange} error={this.state.fieldErrors.buyerWarrantAlert} />
                        </Form.Group>
                    </div>
                </Form>
                <Grid padded stackable columns={3}>
                    <Grid.Column floated='left' textAlign='left' width={4}>
                        <Button onClick={() => this.back()} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.PREVIOUS_STEP")}></Button>
                    </Grid.Column>
                    <Grid.Column textAlign='center' width={4}>
                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right' width={8}>
                        <Button onClick={() => this.submit(-1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_EXIT")}></Button>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}