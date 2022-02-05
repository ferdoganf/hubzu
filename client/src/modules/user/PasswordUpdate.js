import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showErrorListModal, showModal } from '../../actions/page/Actions';
import { updateMyPassword, userRedirect } from '../../actions/user/Actions';
import { Form, Header, Segment, Grid, Button } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';
import passwordValidator from 'password-validator';

class PasswordUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            newPassword: '',
            newPasswordAgain: '',
            formErrorList: [],
            fieldErrors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.props.setPageHeader([I18n.t('menu.CHANGE_PASSWORD')]);
    }

    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.userRedirect(false);
            this.props.showModal(I18n.t("msg.UPDATE_MY_PASSWORD_SUCCESS_TITLE"), I18n.t("msg.UPDATE_MY_PASSWORD_SUCCESS_DESC"), '/signin');
        }
    }

    submit() {
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};

        if ((!this.state.password) || (!this.state.password.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.CURRENT_PASSWORD") }));
            fieldErrors.password = true;
        }

        if ((!this.state.newPassword) || (!this.state.newPassword.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.NEW_PASSWORD") }));
            fieldErrors.newPassword = true;
        }

        if ((!this.state.newPasswordAgain) || (!this.state.newPasswordAgain.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.NEW_PASSWORD_AGAIN") }));
            fieldErrors.newPasswordAgain = true;
        }


        if (this.state.newPassword && this.state.newPasswordAgain && (this.state.newPassword !== this.state.newPasswordAgain)) {
            formErrorList.push(I18n.t('validation.PASSWORD_PASSWORD_AGAIN_NOT_EQUAL'));
            fieldErrors.newPassword = true;
            fieldErrors.newPasswordAgain = true;
        }

        if (!fieldErrors.newPassword) {
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

            var checkPasswordResultList = schemaPassword.validate(this.state.newPassword, { list: true });
            if (checkPasswordResultList.length > 0) {
                formErrorList.push(I18n.t('validation.PASSWORD_' + checkPasswordResultList[0]));
                fieldErrors.newPassword = true;
                fieldErrors.newPasswordAgain = true;
            }
        }

        this.setState({ formErrorList, fieldErrors });
        if (formErrorList.length === 0) {
            this.props.updateMyPassword({ password: this.state.password, newPassword: this.state.newPassword });
        } else {
            this.props.showErrorListModal(formErrorList);
        }
    }

    render() {
        return (
            <div className='admin' >
                <Segment padded basic>
                    <Segment padded secondary className="tiny" textAlign="center">
                        <Form style={{ textAlign: 'left' }}>
                            <div>
                                <Header as='h5' dividing>{I18n.t("label.CURRENT_PASSWORD")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                <Form.Group inline className='nonbordered'>
                                    <Form.Input style={{ width: '100%' }} id='password' type="password" value={this.state.password} fluid placeholder={I18n.t("label.CURRENT_PASSWORD")} onChange={this.handleInputChange} error={this.state.fieldErrors.password} />
                                </Form.Group>
                            </div>
                            <div>
                                <Header as='h5' dividing>{I18n.t("label.NEW_PASSWORD")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                <Form.Group inline className='nonbordered'>
                                    <Form.Input style={{ width: '100%' }} id='newPassword' type="password" value={this.state.newPassword} fluid placeholder={I18n.t("label.NEW_PASSWORD")} onChange={this.handleInputChange} error={this.state.fieldErrors.newPassword} />
                                </Form.Group>
                            </div>
                            <div>
                                <Header as='h5' dividing>{I18n.t("label.NEW_PASSWORD_AGAIN")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                <Form.Group inline className='nonbordered'>
                                    <Form.Input style={{ width: '100%' }} id='newPasswordAgain' type="password" value={this.state.newPasswordAgain} fluid placeholder={I18n.t("label.NEW_PASSWORD_AGAIN")} onChange={this.handleInputChange} error={this.state.fieldErrors.newPasswordAgain} />
                                </Form.Group>
                            </div>
                        </Form>
                        <Grid padded stackable columns={3}>
                            <Grid.Column floated='left' textAlign='left' width={4}>
                            </Grid.Column>
                            <Grid.Column textAlign='center' width={4}>
                            </Grid.Column>
                            <Grid.Column floated='right' textAlign='right' width={8}>
                                <Button onClick={() => this.submit()} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.UPDATE")}></Button>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { shouldRedirect } = state.userReducer;

    return {
        lastResponseId,
        user,
        shouldRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            showErrorListModal,
            updateMyPassword,
            userRedirect,
            showModal
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(PasswordUpdate);

export { hoc as PasswordUpdate };