import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import BuyerCreateUpdateStep from './BuyerCreateUpdateStep'
import { showErrorListModal } from '../../../actions/page/Actions';
import { getBuyer } from '../../../actions/buyer/Actions';
import { activateUser, passivateUser, userRedirect } from '../../../actions/user/Actions';
import { Form, Header, Segment, Grid, Button } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';

class BuyerStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buyerCode: null
        };
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
            this.props.history.push("/admin/buyer/list");
        } else {
            this.preparePageHeader(prevProps, prevState);
        }
    }

    back() {
        this.props.history.push("/admin/buyer/" + this.state.buyerCode + "/realestate/warrants");
    }

    render() {
        return (
            <div className='admin' >
                <BuyerCreateUpdateStep step='status' />
                {this.props.buyerCreated ?
                    <Segment attached padded='very'>
                        <Form>
                            <div>
                                <Header as='h5' dividing>{I18n.t("label.STATUS")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                <Form.Group inline className='nonbordered'>
                                    {I18n.t("label.USER_STATUS_" + this.props.buyerCreated.userStatus.code)}
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
                                {
                                    (this.props.buyerCreated && this.props.buyerCreated.userStatus.code !== 'PASSIVE') ?
                                        <Button onClick={() => this.props.passivateUser(this.props.buyerCreated.code)} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.PASSIVATE")}></Button>
                                        : null
                                }
                                {
                                    (this.props.buyerCreated && this.props.buyerCreated.userStatus.code !== 'ACTIVE') ?
                                        <Button onClick={() => this.props.activateUser(this.props.buyerCreated.code)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.ACTIVATE")}></Button>
                                        : null
                                }
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
    const { buyerCreated, } = state.buyerReducer;
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
            activateUser,
            passivateUser,
            getBuyer,
            userRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BuyerStatus);

export { hoc as BuyerStatus };
