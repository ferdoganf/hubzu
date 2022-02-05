/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { setPageHeader } from '../../../actions/page/Actions';
import { Segment, Grid, Button } from 'semantic-ui-react'
import RealestateCreateUpdateStep from './RealestateCreateUpdateStep'
import { showErrorListModal } from '../../../actions/page/Actions';
import { getRealestate, realestateRedirect, updateRealestateStatus } from '../../../actions/realestate/Actions';
import RealestateDetailsPanel from '../../../components/realestate/RealestateDetailsPanel';


class RealestatePublish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null
        };
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
        this.preparePageHeader(null, null);

        let code = null;
        if (this.props.match.params.code) {
            code = this.props.match.params.code.toString();
            if (code) {
                this.setState({ realestateCode: code });
            }
        }
        if (!code) {
            this.props.history.push("/admin/realestate/create");
        } else {
            this.props.getRealestate(code);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            //shouldRedirect
            this.props.realestateRedirect(false);
            this.props.history.push("/admin/realestate/list");
        } else {
            this.preparePageHeader(prevProps, prevState);
        }
    }

    back() {
        this.props.history.push("/admin/realestate/" + this.state.realestateCode + '/photo');
    }

    submit(route) {
        if (this.props.realestateCreated) {
            if (route === -1) {
                this.props.history.push("/admin/realestate/list");
            } else {
                this.props.updateRealestateStatus(this.props.realestateCreated.code, 'ACTIVE');
            }
        }
    }

    render() {
        return (
            <div className='admin' >
                <RealestateCreateUpdateStep step='publishing' />
                <Segment attached padded='very'>
                    {this.state.realestateCode && this.props.realestateCreated ?
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={12} computer={8}>
                                    <RealestateDetailsPanel realestate={this.props.realestateCreated}></RealestateDetailsPanel>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        : null
                    }
                    <Grid padded stackable columns={3}>
                        <Grid.Column floated='left' textAlign='left'>
                            <Button onClick={() => this.back()} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.PREVIOUS_STEP")}></Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>

                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                            <Button onClick={() => this.submit(-1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_PASSIVE")}></Button>
                            <Button onClick={() => this.submit(1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.PUBLISH")}></Button>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div >
        );
    }
}


const mapStateToProps = state => {
    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { realestateCreated, shouldRedirect } = state.realestateReducer;

    return {
        lastResponseId,
        user,
        realestateCreated,
        shouldRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            getRealestate,
            realestateRedirect,
            updateRealestateStatus
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestatePublish);

export { hoc as RealestatePublish };
