import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import BuyerCreateUpdateStep from './BuyerCreateUpdateStep'
import { showErrorListModal } from '../../../actions/page/Actions';
import { getBuyer } from '../../../actions/buyer/Actions';
import { updatePassword, userRedirect } from '../../../actions/user/Actions';
import { Form, Header, Segment, Grid, Button } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';

class BuyerPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buyerCode: null,
            password: '',
            passwordAgain: '',
            route: 1,
            formErrorList: [],
            fieldErrors: {}
        };
        this.updateBuyerPassword = this.updateBuyerPassword.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        let code = null;
        if (this.props.match.params.code) {
            code = this.props.match.params.code.toString();
            if (code) {
                this.setState({ buyerCode: code });
            }
        }
        if (!code) {
            this.props.history.push("/admin/buyer/list");
        } else {
            this.props.getBuyer(code);
        }


        this.preparePageHeader();
    }

    preparePageHeader(prevProps, prevState) {

        if (
            prevProps == null || prevState == null ||
            (this.props.lastResponseId !== prevProps.lastResponseId) ||
            (this.props.buyerCreated && this.props.buyerCreated.code !== prevProps.buyerCreated.code)
        ) {
            let sections = [];
            sections.push({ key: 'BCUFbreadcrumb1', content: I18n.t('menu.BUYER'), link: true, active: true });

            if (this.props.buyerCreated && this.props.buyerCreated.identityNumber) {
                sections.push({ key: 'BCUFbreadcrumb2', content: this.props.buyerCreated.identityNumber });
            }
            if (this.props.buyerCreated && this.props.buyerCreated.name) {
                sections.push({ key: 'BCUFbreadcrumb3', content: this.props.buyerCreated.name });
            }

            if (this.props.buyerCreated && this.props.buyerCreated.surname) {
                sections.push({ key: 'BCUFbreadcrumb4', content: this.props.buyerCreated.surname });
            }

            if (this.props.buyerCreated && this.props.buyerCreated.emailAddress) {
                sections.push({ key: 'BCUFbreadcrumb5', content: this.props.buyerCreated.emailAddress });
            }

            this.props.setPageHeader(sections);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.userRedirect(false);
            if (this.state.route === 1) {
                this.props.history.push("/admin/buyer/" + this.state.buyerCode + "/realestate/warrants");
            } else {
                this.props.history.push("/admin/buyer/list");
            }
        } else {
            this.preparePageHeader(prevProps, prevState);
        }
    }

    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    updateBuyerPassword(route) {
        this.setState({
            route
        }, () => {
            this.props.updatePassword(this.state.buyerCode, { password: this.state.password });
        });
    }

    back() {
        this.props.history.push("/admin/buyer/" + this.state.buyerCode);
    }

    submit(route) {
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};

        if ((!this.state.password) || (!this.state.password.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.PASSWORD") }));
            fieldErrors.password = true;
        }

        if ((!this.state.passwordAgain) || (!this.state.passwordAgain.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.PASSWORD_AGAIN") }));
            fieldErrors.passwordAgain = true;
        }

        if (this.state.password && this.state.passwordAgain && (this.state.password !== this.state.passwordAgain)) {
            formErrorList.push(I18n.t('validation.PASSWORD_PASSWORD_AGAIN_NOT_EQUAL'));
            fieldErrors.password = true;
            fieldErrors.passwordAgain = true;
        }

        this.setState({ formErrorList, fieldErrors });
        if (formErrorList.length === 0) {
            this.updateBuyerPassword(route);
        } else {
            this.props.showErrorListModal(formErrorList);
        }
    }

    render() {
        return (
            <div className='admin' >
                <BuyerCreateUpdateStep step='password' />
                {this.props.buyerCreated ?
                    <Segment attached padded='very'>
                        <Form>
                            <div>
                                <Header as='h5' dividing>{I18n.t("label.PASSWORD")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                <Form.Group inline className='nonbordered'>
                                    <Form.Input style={{ width: '100%' }} id='password' value={this.state.password} fluid placeholder={I18n.t("label.PASSWORD")} onChange={this.handleInputChange} error={this.state.fieldErrors.password} />
                                </Form.Group>
                            </div>
                            <div>
                                <Header as='h5' dividing>{I18n.t("label.PASSWORD_AGAIN")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                <Form.Group inline className='nonbordered'>
                                    <Form.Input style={{ width: '100%' }} id='passwordAgain' value={this.state.passwordAgain} fluid placeholder={I18n.t("label.PASSWORD_AGAIN")} onChange={this.handleInputChange} error={this.state.fieldErrors.passwordAgain} />
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
                                <Button onClick={() => this.props.history.push("/admin/buyer/" + this.state.buyerCode + "/realestate/warrants")} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.SKIP")}></Button>
                                <Button onClick={() => this.submit(-1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_EXIT")}></Button>
                                <Button onClick={() => this.submit(1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_CONTINUE")}></Button>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    : null
                }
            </div>

        );
    }
}

const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { buyerCreated } = state.buyerReducer;
    const { shouldRedirect } = state.userReducer;
    return {
        lastResponseId,
        user,
        buyerCreated,
        shouldRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            updatePassword,
            getBuyer,
            userRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BuyerPassword);

export { hoc as BuyerPassword };
