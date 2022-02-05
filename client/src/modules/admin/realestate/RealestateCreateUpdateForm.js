import React, { Component } from 'react';
import { Form, Header, Segment, Grid, Button, Radio } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';
import NumberFormat from 'react-number-format';

export default class RealestateCreateUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

            realEstateType: (this.props.realestateCreated && this.props.realestateCreated.realEstateType) ? this.props.realestateCreated.realEstateType.code : null,
            bank: (this.props.realestateCreated && this.props.realestateCreated.bank) ? this.props.realestateCreated.bank.code : null,
            code: this.props.realestateCreated ? ((this.props.realestateCreated.realEstateStatus && this.props.realestateCreated.realEstateStatus.code === 'DRAFT') ? '' : this.props.realestateCreated.code) : '',
            title: this.props.realestateCreated ? this.props.realestateCreated.title : '',
            description: this.props.realestateCreated ? this.props.realestateCreated.description : '',
            auctionPeriod: (this.props.realestateCreated && this.props.realestateCreated.auctionPeriod) ? Math.floor(parseInt(this.props.realestateCreated.auctionPeriod) / 24) : 7,
            auctionPeriodHours: (this.props.realestateCreated && this.props.realestateCreated.auctionPeriod) ? parseInt(this.props.realestateCreated.auctionPeriod) % 24 : 0,
            startingAmount: this.props.realestateCreated ? this.props.realestateCreated.startingAmount : 1,
            bidStep: this.props.realestateCreated ? this.props.realestateCreated.bidStep : 1,
            occasion: this.props.realestateCreated ? this.props.realestateCreated.occasion : false,
            tenderParticipationFee: this.props.realestateCreated ? this.props.realestateCreated.tenderParticipationFee : 0,
            depositRate: this.props.realestateCreated ? this.props.realestateCreated.depositRate : (this.props.bankCreated ? this.props.bankCreated.depositRate : 0),
            serviceFeeRate: this.props.realestateCreated ? this.props.realestateCreated.serviceFeeRate : (this.props.bankCreated ? this.props.bankCreated.serviceFeeRate : 0),
            buyerWarrantAlert: this.props.realestateCreated ? this.props.realestateCreated.buyerWarrantAlert : (this.props.bankCreated ? this.props.bankCreated.buyerWarrantAlert : ''),
            holdDeposit: this.props.realestateCreated ? this.props.realestateCreated.holdDeposit : false,
            inAdvance: this.props.realestateCreated ? this.props.realestateCreated.inAdvance : false,
            inAdvanceAmount: this.props.realestateCreated ? this.props.realestateCreated.inAdvanceAmount : 0,
            finishedAuctionsShown: this.props.realestateCreated ? this.props.realestateCreated.finishedAuctionsShown : false,
            formErrorList: [],
            fieldErrors: {},
            bankInitiated: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBankDropdownChange = this.handleBankDropdownChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleToggleHoldDeposit = this.handleToggleHoldDeposit.bind(this);
        this.handleToggleInAdvance = this.handleToggleInAdvance.bind(this);
        this.handleToggleFinishedAuctionsShown = this.handleToggleFinishedAuctionsShown.bind(this);

    }

    preparePageHeader(prevProps, prevState) {

        if (
            prevProps == null || prevState == null ||
            (this.props.lastResponseId !== prevProps.lastResponseId) ||
            (this.state.bank !== prevState.bank) ||
            (this.state.code !== prevState.code) ||
            (this.state.realEstateType !== prevState.realEstateType)
        ) {
            let sections = [];
            sections.push({ key: 'RCUFbreadcrumb1', content: I18n.t('menu.REALESTATE'), link: true, active: true });

            if (this.state.code) {
                sections.push({ key: 'RCUFbreadcrumb2', content: this.state.code });
            }

            if (this.state.bank && this.props.realestateMetadata.banks) {
                let bankCode = this.state.bank.toString();
                var bankObj = this.props.realestateMetadata.banks.find(e => e.code === bankCode);
                sections.push({ key: 'RCUFbreadcrumb3', content: bankObj.name });
            }

            if (this.state.realEstateType) {
                sections.push({ key: 'RCUFbreadcrumb4', content: I18n.t('label.' + this.state.realEstateType) });
            }

            this.props.setPageHeader(sections);
        }
    }

    componentDidMount() {
        this.preparePageHeader();
    }

    componentDidUpdate(prevProps, prevState) {
        this.preparePageHeader(prevProps, prevState);

        if (this.props.bankCreated && this.state.bank && (!this.state.bankInitiated)) {
            if ((!this.prevProps) || (!(this.prevProps.bankCreated)) || ((this.prevProps) && (this.prevProps.bankCreated) && (this.prevProps.bankCreated.code !== this.props.bankCreated.code))) {
                this.setState({ bankInitiated: true, depositRate: this.props.bankCreated.depositRate, serviceFeeRate: this.props.bankCreated.serviceFeeRate, buyerWarrantAlert: this.props.bankCreated.buyerWarrantAlert });
            }
        }
    }

    back() {
        this.props.history.push("/admin/realestate/list");
    }

    submit(route) {
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};

        if ((!this.state.code) || (!this.state.code.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.REALESTATE_CODE") }));
            fieldErrors.code = true;
        }

        if ((!this.state.bank) || (!this.state.bank.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.BANK") }));
            fieldErrors.bank = true;
        }

        if ((!this.state.realEstateType) || (!this.state.realEstateType.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.REAL_ESTATE_TYPE") }));
            fieldErrors.realEstateType = true;
        }

        if ((!this.state.title) || (!this.state.title.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.REALESTATE_TITLE") }));
            fieldErrors.title = true;
        }

        if ((!this.state.description) || (!this.state.description.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.DESCRIPTION") }));
            fieldErrors.description = true;
        }

        if (this.state.holdDeposit && (!this.state.depositRate || this.state.depositRate === 0)) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.DEPOSIT_RATE") }));
            fieldErrors.depositRate = true;
        }

        if (this.state.inAdvance && (!this.state.inAdvanceAmount || this.state.inAdvanceAmount === 0)) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.IN_ADVANCE_AMOUNT") }));
            fieldErrors.inAdvanceAmount = true;
        }

        this.setState({ formErrorList, fieldErrors });
        if (formErrorList.length === 0) {
            let realestate = {
                realEstateType: this.state.realEstateType,
                code: this.state.code,
                title: this.state.title,
                description: this.state.description,
                bank: this.state.bank,
                auctionPeriod: (this.state.auctionPeriod * 24) + this.state.auctionPeriodHours,
                startingAmount: this.state.startingAmount ? Number(this.state.startingAmount) : 0,
                bidStep: this.state.bidStep ? Number(this.state.bidStep) : 0,
                occasion: this.state.occasion ? this.state.occasion : false,
                holdDeposit: this.state.holdDeposit ? this.state.holdDeposit : false,
                tenderParticipationFee: this.state.tenderParticipationFee ? Number(this.state.tenderParticipationFee) : 0,
                depositRate: this.state.depositRate ? Number(this.state.depositRate) : 0,
                serviceFeeRate: this.state.serviceFeeRate ? Number(this.state.serviceFeeRate) : 0,
                buyerWarrantAlert: this.state.buyerWarrantAlert,
                inAdvance: this.state.inAdvance ? this.state.inAdvance : false,
                inAdvanceAmount: this.state.inAdvanceAmount ? Number(this.state.inAdvanceAmount) : 0,
                finishedAuctionsShown: (this.props.bankCreated && !this.props.bankCreated.finishedAuctionsShown) ? false : this.state.finishedAuctionsShown
            }
            this.props.createUpdateAction(route, realestate);
        } else {
            this.props.showErrorListModal(formErrorList);
        }
    }

    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    handleBankDropdownChange(e, result) {
        const { id, value } = result
        this.setState({ [id]: value, bankInitiated: false });
        this.props.getBank(value);
    }

    handleRadioChange(e, result) {
        const { name, value } = result
        this.setState({ [name]: value });
    }

    handleStartDateChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleEndDateChange = date => {
        this.setState({
            endDate: date
        });
    };

    handleToggle(e, result) {
        this.setState({ occasion: result.checked });
    }

    handleToggleHoldDeposit(e, result) {
        this.setState({ holdDeposit: result.checked });
    }

    handleToggleInAdvance(e, result) {
        this.setState({ inAdvance: result.checked });
    }

    handleToggleFinishedAuctionsShown(e, result) {
        this.setState({ finishedAuctionsShown: result.checked });
    }

    render() {

        let banks = [];
        if (this.props.realestateMetadata && this.props.realestateMetadata.banks) {
            banks = this.props.realestateMetadata.banks.map(bank => Object.assign({}, { key: bank.code, text: bank.name, value: bank.code }));
        }
        return (
            <Segment attached padded='very'>
                <Form>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.REALESTATE_CODE")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.Input style={{ width: '100%' }} id='code' disabled={this.props.realestateCreated ? ((this.props.realestateCreated.realEstateStatus && this.props.realestateCreated.realEstateStatus.code === 'DRAFT') ? false : true) : false} fluid placeholder={I18n.t("label.REALESTATE_CODE")} value={this.state.code} onChange={this.handleInputChange} error={this.state.fieldErrors.code} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.BANK")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.Select
                                id='bank'
                                fluid
                                options={banks}
                                placeholder={I18n.t("label.BANK")}
                                value={this.state.bank}
                                onChange={this.handleBankDropdownChange} error={this.state.fieldErrors.bank}
                            />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.REAL_ESTATE_TYPE")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='bordered'>
                            {
                                (this.props.realestateMetadata && this.props.realestateMetadata.realEstateTypes) ?
                                    this.props.realestateMetadata.realEstateTypes.map(
                                        realEstateType => {
                                            return (<Form.Radio
                                                key={realEstateType.code}
                                                name='realEstateType'
                                                checked={this.state.realEstateType === realEstateType.code}
                                                onChange={this.handleRadioChange}
                                                label={I18n.t('label.' + realEstateType.code)}
                                                value={realEstateType.code}
                                                disabled={this.props.realestateCreated ? true : false}
                                            />);
                                        }

                                    )
                                    : null
                            }
                        </Form.Group>
                    </div>


                    <div>
                        <Header as='h5' dividing>{I18n.t("label.REALESTATE_TITLE")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.Input style={{ width: '100%' }} id='title' value={this.state.title} fluid placeholder={I18n.t("label.REALESTATE_TITLE")} onChange={this.handleInputChange} error={this.state.fieldErrors.title} />
                        </Form.Group>
                    </div>
                    <div>
                        <Header as='h5' dividing>{I18n.t("label.DESCRIPTION")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.TextArea id='description' value={this.state.description} rows={6} placeholder={I18n.t("label.DESCRIPTION")} onChange={this.handleInputChange} error={this.state.fieldErrors.description} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.OCCASION")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <Radio toggle
                                checked={this.state.occasion}
                                onChange={this.handleToggle}
                            />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.AUCTION_PERIOD")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <NumberFormat style={{ width: '200px', marginRight: '20px' }} id='auctionPeriod' placeholder={I18n.t("label.AUCTION_PERIOD")}
                                onValueChange={(values) => {

                                    const { floatValue } = values;
                                    this.setState({ auctionPeriod: floatValue });
                                }} value={this.state.auctionPeriod} thousandSeparator={false} decimalScale={0} suffix={' ' + I18n.t("label.DAYS")} />

                            <NumberFormat style={{ width: '200px', marginRight: '20px' }} id='auctionPeriodHours' placeholder={I18n.t("label.AUCTION_PERIOD_HOURS")}
                                onValueChange={(values) => {

                                    const { floatValue } = values;
                                    this.setState({ auctionPeriodHours: floatValue });
                                }} value={this.state.auctionPeriodHours} thousandSeparator={false} decimalScale={0} suffix={' ' + I18n.t("label.HOURS")} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.STARTING_AMOUNT")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <NumberFormat style={{ width: '100%' }} id='startingAmount' placeholder={I18n.t("label.STARTING_AMOUNT")}
                                onValueChange={(values) => {
                                    const { floatValue } = values;
                                    this.setState({ startingAmount: floatValue });
                                }} value={this.state.startingAmount} thousandSeparator={true} prefix={'₺'} decimalScale={0} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.BID_STEP")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <NumberFormat style={{ width: '100%' }} id='bidStep' placeholder={I18n.t("label.BID_STEP")}
                                onValueChange={(values) => {
                                    const { floatValue } = values;
                                    this.setState({ bidStep: floatValue });
                                }} value={this.state.bidStep} thousandSeparator={true} prefix={'₺'} decimalScale={0} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.HOLD_DEPOSIT")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <Radio toggle
                                checked={this.state.holdDeposit}
                                onChange={this.handleToggleHoldDeposit}
                            />
                        </Form.Group>
                    </div>


                    <div>
                        <Header as='h5' dividing>{I18n.t("label.WILL_SHOWN_IN_FINISHED_AUCTIONS")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <Radio toggle
                                disabled={this.props.bankCreated && !this.props.bankCreated.finishedAuctionsShown}
                                checked={(this.props.bankCreated && !this.props.bankCreated.finishedAuctionsShown) ? false : this.state.finishedAuctionsShown}
                                onChange={this.handleToggleFinishedAuctionsShown}
                            />
                        </Form.Group>
                    </div>


                    <div>
                        <Header as='h5' dividing>{I18n.t("label.TENDER_PARTICIPATION_FEE")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <NumberFormat style={{ width: '100%' }} id='tenderParticipationFee' placeholder={I18n.t("label.TENDER_PARTICIPATION_FEE")}
                                onValueChange={(values) => {
                                    const { floatValue } = values;
                                    this.setState({ tenderParticipationFee: floatValue });
                                }} value={this.state.tenderParticipationFee} thousandSeparator={true} prefix={'₺'} decimalScale={0} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.IN_ADVANCE")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <Radio toggle
                                checked={this.state.inAdvance}
                                onChange={this.handleToggleInAdvance}
                            />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.IN_ADVANCE_AMOUNT")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <NumberFormat style={{ width: '100%' }} id='inAdvanceAmount' placeholder={I18n.t("label.IN_ADVANCE_AMOUNT")}
                                onValueChange={(values) => {
                                    const { floatValue } = values;
                                    this.setState({ inAdvanceAmount: floatValue });
                                }} value={this.state.inAdvanceAmount} thousandSeparator={true} prefix={'₺'} decimalScale={0} />
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
                        <Header as='h5' dividing>{I18n.t("label.ALERT_MESSAGE")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.TextArea id='buyerWarrantAlert' value={this.state.buyerWarrantAlert} rows={6} placeholder={I18n.t("label.ALERT_MESSAGE")} onChange={this.handleInputChange} error={this.state.fieldErrors.buyerWarrantAlert} />
                        </Form.Group>
                    </div>

                </Form>
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