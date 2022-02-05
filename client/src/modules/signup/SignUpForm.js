import React, { Component } from 'react';
import Captcha from './../../components/captcha/Captcha';
import { I18n } from 'react-redux-i18n';
import { Form, Button } from 'semantic-ui-react';
import passwordValidator from 'password-validator';

export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            phoneCountryCode: '90',
            phone: '',
            password: '',
            passwordAgain: '',
            recaptchaToken: '',
            formErrorList: [],
            fieldErrors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.expiredCallback = this.expiredCallback.bind(this);
    }

    submit() {
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};

        let inputList = [
            { field: 'password', label: I18n.t("label.PASSWORD") },
            { field: 'passwordAgain', label: I18n.t("label.PASSWORD_AGAIN") },
            { field: 'name', label: I18n.t("label.NAME") },
            { field: 'surname', label: I18n.t("label.SURNAME") },
            { field: 'email', label: I18n.t("label.EMAIL_ADDRESS") },
            { field: 'phoneCountryCode', label: I18n.t("label.PHONE_COUNTRY_CODE") },
            { field: 'phone', label: I18n.t("label.PHONE_NUMBER") },
            { field: 'recaptchaToken', label: I18n.t("label.RECAPTCHA_TOKEN") }
        ];

        inputList.forEach(input => {
            if ((!this.state[input.field]) || (!this.state[input.field].trim())) {
                formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: input.label }));
                fieldErrors[input.field] = true;
            }
        });

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

        if (this.state.password && this.state.passwordAgain && (this.state.password !== this.state.passwordAgain)) {
            formErrorList.push(I18n.t('validation.PASSWORD_PASSWORD_AGAIN_NOT_EQUAL'));
            fieldErrors.password = true;
            fieldErrors.passwordAgain = true;
        }

        if (!fieldErrors.password) {
            var schemaPassword = new passwordValidator();
            schemaPassword
                .is()
                .min(6)
                .is()
                .max(10)
                .has()
                .not()
                .spaces()
                .has()
                .not('ş|ğ|ü|ı|ö|Ş|Ğ|Ç|ç|Ü|İ|Ö');

            var checkPasswordResultList = schemaPassword.validate(this.state.password, { list: true });
            if (checkPasswordResultList.length > 0) {
                formErrorList.push(I18n.t('validation.PASSWORD_' + checkPasswordResultList[0]));
                fieldErrors.password = true;
                fieldErrors.passwordAgain = true;
            }
        }

        this.setState({ formErrorList, fieldErrors });
        if (formErrorList.length === 0) {
            let visitor = {
                name: this.state.name,
                surname: this.state.surname,
                emailAddress: this.state.email,
                phoneCountryCode: this.state.phoneCountryCode,
                phone: this.state.phone,
                password: this.state.password,
                recaptchaToken: this.state.recaptchaToken
            }
            this.props.createVisitor(visitor);
        } else {
            this.props.showErrorListModal(formErrorList);
        }
    }

    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    verifyCallback(token) {
        this.setState({ recaptchaToken: token });
    }

    expiredCallback() {
        this.setState({ recaptchaToken: '' });
    }

    render() {
        return (
            <div>
                <Form style={{ textAlign: 'left' }}>
                    <Form.Group widths="equal">
                        <Form.Input
                            id="name"
                            value={this.state.name}
                            label={I18n.t('label.NAME')}
                            placeholder={I18n.t('label.NAME')}
                            onChange={this.handleInputChange}
                            error={this.state.fieldErrors.name}
                            required
                        />
                        <Form.Input
                            id="surname"
                            value={this.state.surname}
                            label={I18n.t('label.SURNAME')}
                            placeholder={I18n.t('label.SURNAME')}
                            onChange={this.handleInputChange}
                            error={this.state.fieldErrors.surname}
                            required
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input
                            id="email"
                            value={this.state.email}
                            label={I18n.t('label.EMAIL_ADDRESS')}
                            placeholder={I18n.t('label.EMAIL_ADDRESS')}
                            onChange={this.handleInputChange}
                            error={this.state.fieldErrors.email}
                            required
                        />
                        <Form.Input
                            id="phone"
                            value={this.state.phone}
                            label={I18n.t('label.PHONE_NUMBER')}
                            placeholder={I18n.t('label.PHONE_NUMBER')}
                            onChange={this.handleInputChange}
                            error={this.state.fieldErrors.phone}
                            required
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Input
                            id="password"
                            type='password'
                            value={this.state.password}
                            label={I18n.t('label.PASSWORD')}
                            placeholder={I18n.t('label.PASSWORD')}
                            onChange={this.handleInputChange}
                            error={this.state.fieldErrors.password}
                            required
                        />
                        <Form.Input
                            id="passwordAgain"
                            type='password'
                            value={this.state.passwordAgain}
                            label={I18n.t('label.PASSWORD_AGAIN')}
                            placeholder={I18n.t('label.PASSWORD_AGAIN')}
                            onChange={this.handleInputChange}
                            error={this.state.fieldErrors.passwordAgain}
                            required
                        />
                    </Form.Group>
                </Form>
                <Captcha verifyCallback={this.verifyCallback} expiredCallback={this.expiredCallback} />
                <Button primary size="big" onClick={() => this.submit()}>
                    {I18n.t('button.SIGN_UP')}
                </Button>
            </div>
        );
    }
}