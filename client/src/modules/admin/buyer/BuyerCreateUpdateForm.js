import React, { Component } from 'react';
import { Form, Header, Segment, Grid, Button } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';
import NumberFormat from 'react-number-format';

export default class BuyerCreateUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identityNumber: this.props.buyerCreated ? this.props.buyerCreated.identityNumber : '',
            name: this.props.buyerCreated ? this.props.buyerCreated.name : '',
            surname: this.props.buyerCreated ? this.props.buyerCreated.surname : '',
            emailAddress: this.props.buyerCreated ? this.props.buyerCreated.emailAddress : '',
            phoneCountryCode: this.props.buyerCreated ? this.props.buyerCreated.phoneCountryCode : '90',
            phone: this.props.buyerCreated ? this.props.buyerCreated.phone : '',

            formErrorList: [],
            fieldErrors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    preparePageHeader(prevProps, prevState) {

        if (
            prevProps == null || prevState == null ||
            (this.props.lastResponseId !== prevProps.lastResponseId) ||
            (this.state.identityNumber !== prevState.identityNumber) ||
            (this.state.name !== prevState.name) ||
            (this.state.surname !== prevState.surname) ||
            (this.state.emailAddress !== prevState.emailAddress)
        ) {
            let sections = [];
            sections.push({ key: 'BCUFbreadcrumb1', content: I18n.t('menu.BUYER'), link: true, active: true });

            if (this.state.identityNumber) {
                sections.push({ key: 'BCUFbreadcrumb2', content: this.state.identityNumber });
            }
            if (this.state.name) {
                sections.push({ key: 'BCUFbreadcrumb3', content: this.state.name });
            }

            if (this.state.surname) {
                sections.push({ key: 'BCUFbreadcrumb4', content: this.state.surname });
            }

            if (this.state.emailAddress) {
                sections.push({ key: 'BCUFbreadcrumb5', content: this.state.emailAddress });
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
        this.props.history.push("/admin/buyer/list");
    }

    submit(route) {
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};

        let inputList = [
            { field: 'identityNumber', label: I18n.t("label.IDENTITY_NUMBER") },
            { field: 'name', label: I18n.t("label.NAME") },
            { field: 'surname', label: I18n.t("label.SURNAME") },
            { field: 'emailAddress', label: I18n.t("label.EMAIL_ADDRESS") },
            { field: 'phoneCountryCode', label: I18n.t("label.PHONE_COUNTRY_CODE") },
            { field: 'phone', label: I18n.t("label.PHONE_NUMBER") },
        ];

        inputList.forEach(input => {
            if ((!this.state[input.field]) || (!this.state[input.field].trim())) {
                formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: input.label }));
                fieldErrors[input.field] = true;
            }
        });

        if (this.state.identityNumber && this.state.identityNumber.length !== 11) {
            formErrorList.push(I18n.t('validation.FIELD_IS_NOT_VALID', { fieldName: I18n.t("label.IDENTITY_NUMBER") }));
            fieldErrors.identityNumber = true;
        }

        if (this.state.phoneCountryCode && ((this.state.phoneCountryCode.length < 2) || (this.state.phoneCountryCode.length > 5))) {
            formErrorList.push(I18n.t('validation.FIELD_IS_NOT_VALID', { fieldName: I18n.t("label.PHONE_COUNTRY_CODE") }));
            fieldErrors.phoneCountryCode = true;
        }

        if (this.state.phone && ((this.state.phone.length < 4) || (this.state.phone.length > 15))) {
            formErrorList.push(I18n.t('validation.FIELD_IS_NOT_VALID', { fieldName: I18n.t("label.PHONE_NUMBER") }));
            fieldErrors.phone = true;
        }

        if (this.state.emailAddress && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.emailAddress)) {
            formErrorList.push(I18n.t('validation.FIELD_IS_NOT_VALID', { fieldName: I18n.t("label.EMAIL_ADDRESS") }));
            fieldErrors.emailAddress = true;
        }

        this.setState({ formErrorList, fieldErrors });
        if (formErrorList.length === 0) {
            let buyer = {
                identityNumber: this.state.identityNumber,
                name: this.state.name,
                surname: this.state.surname,
                emailAddress: this.state.emailAddress,
                phoneCountryCode: this.state.phoneCountryCode,
                phone: this.state.phone
            }
            this.props.createUpdateAction(route, buyer);
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
                        <Header as='h5' dividing>{I18n.t("label.IDENTITY_NUMBER")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className={this.state.fieldErrors.identityNumber ? 'ui field error nonbordered' : 'nonbordered'}>
                            <NumberFormat style={{ width: '100%' }} id='identityNumber' placeholder={I18n.t("label.IDENTITY_NUMBER")}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    this.setState({ identityNumber: value });
                                }} value={this.state.identityNumber} format="###########" isNumericString={true} thousandSeparator={false} decimalScale={0} allowNegative={false} />

                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.NAME")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.Input style={{ width: '100%' }} id='name' value={this.state.name} fluid placeholder={I18n.t("label.NAME")} onChange={this.handleInputChange} error={this.state.fieldErrors.name} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.SURNAME")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.Input style={{ width: '100%' }} id='surname' value={this.state.surname} fluid placeholder={I18n.t("label.SURNAME")} onChange={this.handleInputChange} error={this.state.fieldErrors.surname} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.EMAIL_ADDRESS")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.Input style={{ width: '100%' }} id='emailAddress' value={this.state.emailAddress} fluid placeholder={I18n.t("label.EMAIL_ADDRESS")} onChange={this.handleInputChange} error={this.state.fieldErrors.emailAddress} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.PHONE_NUMBER")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className={this.state.fieldErrors.phone ? 'ui field error nonbordered' : 'nonbordered'}>
                            <NumberFormat style={{ width: '100%' }} id='phone' placeholder={I18n.t("label.PHONE_NUMBER")}
                                onValueChange={(values) => {
                                    const { value } = values;
                                    this.setState({ phone: value });
                                }} value={this.state.phone} format="0 ### ### ### ### ###" isNumericString={true} thousandSeparator={false} decimalScale={0} allowNegative={false} />
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
                        {
                            this.props.buyerCreated ?
                                <Button onClick={() => this.props.history.push("/admin/buyer/" + this.props.buyerCreated.code + "/password")} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.SKIP")}></Button>
                                : null
                        }
                        <Button onClick={() => this.submit(-1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_EXIT")}></Button>
                        <Button onClick={() => this.submit(1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_CONTINUE")}></Button>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}