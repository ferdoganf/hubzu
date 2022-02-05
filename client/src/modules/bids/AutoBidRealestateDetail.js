/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { setPageHeader } from '../../actions/page/Actions';
import { Segment, Grid, Button, Table, Label } from 'semantic-ui-react'
import { showErrorListModal, showErrorModal, showConfirmModal } from '../../actions/page/Actions';
import { getRealestatePublic } from '../../actions/realestate/Actions';
import { updateAutoBid, getAutoBid, deleteAutoBid, bidRedirect } from '../../actions/bid/Actions';
import NumberFormat from 'react-number-format';
import { getSystemDate } from '../../actions/metadata/Actions';
import { getWarrantedRealestatesOfCurrentBuyer } from '../../actions/buyer/Actions';
import RealestateDetailsPanel from '../../components/realestate/RealestateDetailsPanel';
import CountdownClock from '../../components/realestate/CountdownClock';
import moment from 'moment'

class AutoBidRealestateDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null,
            bidAmount: null,
            timer: null,
            currentBidAmount: null,
            getRealEstateTimer: null,
            bidSetted: false
        };
        this.minusBid = this.minusBid.bind(this);
        this.plusBid = this.plusBid.bind(this);
        this.getRealestate = this.getRealestate.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.realestate) {
            if (this.props.realestate.currentBidAmount && !this.state.currentBidAmount) {
                this.setState({ currentBidAmount: this.props.realestate.currentBidAmount });
            }

            if (!this.state.bidAmount && this.props.buyerAutoBid && this.props.buyerAutoBid.realEstate.code === this.props.realestate.code) {
                this.setState({ bidAmount: this.props.buyerAutoBid.upperLimit });
            }
        }

        if (this.props.shouldRedirect) {
            this.props.bidRedirect(false);
            this.props.history.push("/autobids");
        }

    }

    componentDidMount() {
        let code = null;
        if (this.props.match.params.code) {
            code = this.props.match.params.code.toString();
            if (code) {
                this.setState({ bidAmount: null, realestateCode: code });
            }
        }
        if (!code) {
            this.props.history.push("/");
        } else {
            this.props.getRealestatePublic(code);
            this.props.getAutoBid(code);
            this.props.getWarrantedRealestatesOfCurrentBuyer();
        }

        let timer = setInterval(this.props.getSystemDate, 1000);
        this.setState({ timer });

        let getRealEstateTimer = setInterval(this.getRealestate, 6000);
        this.setState({ getRealEstateTimer });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
        clearInterval(this.state.getRealEstateTimer);
        this.setState({
            realestateCode: null,
            bidAmount: null,
            timer: null,
            currentBidAmount: null,
            getRealEstateTimer: null,
            bidSetted: false
        });
    }

    getRealestate() {
        this.props.getRealestatePublic(this.state.realestateCode, true);
    }

    minusBid() {
        if (this.props.realestate) {
            let currentBid = this.state.bidAmount;
            currentBid = currentBid - this.props.realestate.bidStep;
            let minBid = 0;
            if (this.props.realestate.currentBidAmount) {
                minBid = this.props.realestate.currentBidAmount + this.props.realestate.bidStep;
            } else {
                minBid = this.props.realestate.startingAmount;
            }
            if (currentBid >= minBid) {
                this.setState({ bidAmount: currentBid, bidSetted: true });
            }
        }
    }

    plusBid() {
        if (this.props.realestate) {
            let currentBid = this.state.bidAmount;
            currentBid = currentBid + this.props.realestate.bidStep;
            this.setState({ bidAmount: currentBid, bidSetted: true });
        }
    }

    updateAutoBid() {
        if (!this.props.user) {
            this.props.showErrorModal(I18n.t("validation.SIGNED_IN_TO_CREATE_BID"), '/signin');
        } else {
            if (this.props.user.userType !== 'BUYER') {
                this.props.showErrorModal(I18n.t("validation.BE_BUYER_TO_CREATE_BID"), '/signin');
            } else {

                this.props.showConfirmModal(
                    I18n.t('msg.REALESTATE_UPDATE_AUTO_BID_CONFIRM_TITLE'),
                    I18n.t('msg.REALESTATE_UPDATE_AUTO_BID_CONFIRM_DESC', { upperLimit: this.state.bidAmount }),
                    null,
                    this.props.updateAutoBid,
                    [{ realestateCode: this.state.realestateCode, upperLimit: this.state.bidAmount }]
                )
            }
        }
    }

    deleteAutoBid() {
        if (!this.props.user) {
            this.props.showErrorModal(I18n.t("validation.SIGNED_IN_TO_CREATE_BID"), '/signin');
        } else {
            if (this.props.user.userType !== 'BUYER') {
                this.props.showErrorModal(I18n.t("validation.BE_BUYER_TO_CREATE_BID"), '/signin');
            } else {

                this.props.showConfirmModal(
                    I18n.t('msg.REALESTATE_DELETE_AUTO_BID_CONFIRM_TITLE'),
                    I18n.t('msg.REALESTATE_DELETE_AUTO_BID_CONFIRM_DESC'),
                    null,
                    this.props.deleteAutoBid,
                    [this.state.realestateCode]
                )
            }
        }
    }

    render() {
        const { realestate, systemDate, warrantedRealestates } = this.props;
        let closeForBid = false;
        if (realestate && realestate.realEstateStatus && realestate.realEstateStatus.code === 'STARTED') {
            if (moment.utc(realestate.endDate) < moment.utc(systemDate)) {
                closeForBid = true;
            }
        }
        let warranted = true;
        if (realestate) {
            if (this.props.user) {
                if (this.props.user.userType === 'BUYER') {
                    warranted = warrantedRealestates ? warrantedRealestates.find(e => e.code === realestate.code) : false
                } else {
                    warranted = false;
                }
            }
        }
        return (
            <div className='realestateDetail'>
                <Segment padded='very'>
                    {this.props.realestate ?
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <RealestateDetailsPanel realestate={this.props.realestate}></RealestateDetailsPanel>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <Grid celled>
                                        <Grid.Row>
                                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                                <Grid>
                                                    <Grid.Row>
                                                        <Grid.Column style={{ textAlign: 'center' }} align="center">
                                                            {
                                                                this.props.realestate.realEstateStatus.code === 'ACTIVE' ?
                                                                    <Label size='large' color='orange' >{I18n.t('label.BID_WAITED')}</Label>
                                                                    : this.props.realestate.realEstateStatus.code === 'STARTED' ?
                                                                        <CountdownClock realestate={this.props.realestate} systemDate={this.props.systemDate} />
                                                                        : null
                                                            }
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                        <Grid.Column style={{ textAlign: 'center' }} align="center">
                                                            <Grid style={{ margin: '0px' }} className='ui big form'>
                                                                <Grid.Row >
                                                                    <Grid.Column width={4} style={{ textAlign: 'right', margin: '0px', padding: '0px' }} align="right"><Button disabled={closeForBid} icon='minus' size='large' style={{ margin: '0px 6px 0px 0px', height: '46px' }} onClick={() => this.minusBid()} /></Grid.Column>
                                                                    <Grid.Column width={8} className="ui input" style={{ margin: '0px', padding: '0px' }}>
                                                                        <NumberFormat value={this.state.bidAmount} style={{ width: '100%' }} id='bidAmount' readOnly={true} thousandSeparator={true} prefix={'₺'} decimalScale={0} />
                                                                    </Grid.Column>
                                                                    <Grid.Column width={4} style={{ textAlign: 'left', margin: '0px', padding: '0px' }} align="left"><Button disabled={closeForBid} icon='plus' size='large' style={{ margin: '0px 0px 0px 6px', height: '46px' }} onClick={() => this.plusBid()} /></Grid.Column>
                                                                </Grid.Row></Grid>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row style={{ paddingTop: '0.5em' }}>
                                                        <Grid.Column style={{ textAlign: 'center' }} align="center">
                                                            {
                                                                closeForBid ?
                                                                    <Label style={{ marginBottom: '0.8em', marginTop: '0.8em' }} size='large' color='grey' >{I18n.t('label.END_DATE_PAST_FOR_BID')}</Label>
                                                                    :
                                                                    warranted ?
                                                                        <div>
                                                                            <Button onClick={() => this.updateAutoBid()} style={{ margin: '10px', width: '160px' }} size='medium' primary type='button' content={I18n.t("button.UPDATE_AUTO_BID")}></Button>
                                                                            <Button onClick={() => this.deleteAutoBid()} style={{ margin: '10px', width: '160px' }} size='medium' secondary type='button' content={I18n.t("button.DELETE_AUTO_BID")}></Button>
                                                                        </div>
                                                                        : <div>
                                                                            <Button onClick={() => this.updateAutoBid()} style={{ margin: '10px', width: '240px' }} size='medium' secondary type='button' content={I18n.t("button.ALERT_MESSAGE_TO_WARRANT")}></Button>
                                                                        </div>
                                                            }
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <Table celled striped color='orange'>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.STARTING_AMOUNT")}</Table.Cell>
                                                <Table.Cell>
                                                    <NumberFormat value={this.props.realestate.startingAmount} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />                                                            </Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.BID_STEP")}</Table.Cell>
                                                <Table.Cell>
                                                    <NumberFormat value={this.props.realestate.bidStep} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />                                                            </Table.Cell>
                                            </Table.Row>
                                            {
                                                this.props.realestate.tenderParticipationFee && this.props.realestate.tenderParticipationFee > 0 ?
                                                    <Table.Row>
                                                        <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TENDER_PARTICIPATION_FEE")}</Table.Cell>
                                                        <Table.Cell>
                                                            <NumberFormat value={this.props.realestate.tenderParticipationFee} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />                                                            </Table.Cell>
                                                    </Table.Row>
                                                    : this.props.realestate.depositRate && this.props.realestate.depositRate > 0 ?

                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TENDER_PARTICIPATION_FEE")}</Table.Cell>
                                                            <Table.Cell>
                                                                <NumberFormat value={this.props.realestate.depositRate * this.props.realestate.startingAmount} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                        : null
                                            }
                                            {this.props.realestate.serviceFeeRate ?
                                                <Table.Row>
                                                    <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.SERVICE_FEE_RATE")}</Table.Cell>
                                                    <Table.Cell>
                                                        <NumberFormat value={this.props.realestate.serviceFeeRate} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'%'} />
                                                    </Table.Cell>
                                                </Table.Row>
                                                : null
                                            }
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        : null
                    }
                    <Grid padded stackable columns={3}>
                        <Grid.Column floated='left' textAlign='left'>
                            <Button onClick={() => this.props.history.goBack()} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.PREVIOUS_STEP")}></Button>
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
    const { realestate } = state.realestateReducer;
    const { systemDate } = state.metadataReducer;
    const { buyerAutoBid, shouldRedirect } = state.bidReducer;
    const { warrantedRealestates } = state.buyerReducer;


    return {
        lastResponseId,
        user,
        realestate,
        systemDate,
        buyerAutoBid,
        shouldRedirect,
        warrantedRealestates
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            getRealestatePublic,
            bidRedirect,
            getSystemDate,
            updateAutoBid,
            showErrorModal,
            showConfirmModal,
            getAutoBid,
            deleteAutoBid,
            getWarrantedRealestatesOfCurrentBuyer
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(AutoBidRealestateDetail);

export { hoc as AutoBidRealestateDetail };
