/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { setPageHeader } from '../../actions/page/Actions';
import { Segment, Grid, Button, Header, Icon, Label, Modal, Table } from 'semantic-ui-react'
import { showErrorListModal, showErrorModal, showConfirmModal, showModal } from '../../actions/page/Actions';
import { realestateRedirect, getRealestatePublic, getRealestateDepositAmount, getRealestateCurrentBidAmount } from '../../actions/realestate/Actions';
import { createBid, createAutoBid, buyInAdvance } from '../../actions/bid/Actions';
import NumberFormat from 'react-number-format';
import { getSystemDate } from '../../actions/metadata/Actions';
import { getWarrantedRealestatesOfCurrentBuyer } from '../../actions/buyer/Actions';
import RealestateDetailsPanel from '../../components/realestate/RealestateDetailsPanel';
import CountdownClock from '../../components/realestate/CountdownClock';
import moment from 'moment'
import axios from 'axios';
import { saveAs } from 'file-saver';
import CookieHelper from '../../common/CookieHelper';
import { showLoading, hideLoading } from './../../actions/page/Actions';

class RealestateDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null,
            bidAmount: null,
            timer: null,
            currentBidAmount: null,
            getRealEstateTimer: null,
            bidSetted: false,
            modalVisible: false
        };
        this.minusBid = this.minusBid.bind(this);
        this.plusBid = this.plusBid.bind(this);
        this.getRealestateCurrentBidAmount = this.getRealestateCurrentBidAmount.bind(this);

        this.getSalesContract = this.getSalesContract.bind(this);
        this.getBankContract = this.getBankContract.bind(this);

        this.showAlertMessage = this.showAlertMessage.bind(this);
        this.hideAlertMessage = this.hideAlertMessage.bind(this);
    }

    getSalesContract() {
        this.props.showLoading();
        let thisRef = this;
        const request = {
            url: "/rest/secure/metadata/contracts/sales/" + this.state.realestateCode + "/pdf",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
            },
            responseType: 'blob'

        };

        const newRequest = Object.assign({}, request);
        newRequest.withCredentials = true;
        axios(newRequest).then(
            (response) => {
                saveAs(new Blob([response.data]), "Satış_Sözleşmesi.pdf");
                thisRef.props.hideLoading();
            },
            (error) => {
                thisRef.props.hideLoading();
            }
        );
    }

    getBankContract() {
        this.props.showLoading();
        let thisRef = this;
        const request = {
            url: "/rest/secure/metadata/contracts/" + this.props.realestate.bank.code + "/" + this.state.realestateCode + "/pdf",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
            },
            responseType: 'blob'

        };

        const newRequest = Object.assign({}, request);
        newRequest.withCredentials = true;
        axios(newRequest).then(
            (response) => {
                saveAs(new Blob([response.data]), this.props.realestate.bank.code + "_Banka_Sözleşmesi.pdf");
                thisRef.props.hideLoading();
            },
            (error) => {
                thisRef.props.hideLoading();
            }
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.realestate) {
            if (this.props.realestate.currentBidAmount && (!this.state.bidSetted)) {
                if ((!this.state.bidAmount) || (!this.state.currentBidAmount)) {
                    this.setState({ bidAmount: this.props.realestate.currentBidAmount + this.props.realestate.bidStep, currentBidAmount: this.props.realestate.currentBidAmount });
                } else if (this.state.currentBidAmount < this.props.realestate.currentBidAmount) {
                    this.setState({ bidAmount: this.props.realestate.currentBidAmount + this.props.realestate.bidStep, currentBidAmount: this.props.realestate.currentBidAmount });
                }
            } else if (!this.state.bidAmount) {
                this.setState({ bidAmount: this.props.realestate.startingAmount });
            }
        }

        if (!prevProps.user && this.props.user && !this.props.warrantedRealestates) {
            this.props.getWarrantedRealestatesOfCurrentBuyer();
        }
    }

    componentDidMount() {
        let code = null;
        if (this.props.match.params.code) {
            code = this.props.match.params.code.toString();
        }
        if (!code) {
            this.props.history.push("/");
        } else {
            this.props.getRealestatePublic(code).then(
                (response) => {
                    this.setState({ bidAmount: null, currentBidAmount: null, bidSetted: false, realestateCode: code });
                    if (this.props.user) {
                        this.props.getWarrantedRealestatesOfCurrentBuyer();
                    }
                    this.props.getRealestateDepositAmount(code);
                    let timer = setInterval(this.props.getSystemDate, 1000);
                    this.setState({ timer });

                    let getRealEstateTimer = setInterval(this.getRealestateCurrentBidAmount, 6000);
                    this.setState({ getRealEstateTimer });
                },
                (error) => {
                }
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
        clearInterval(this.state.getRealEstateTimer);
    }

    getRealestateCurrentBidAmount() {
        this.props.getRealestateCurrentBidAmount(this.state.realestateCode, true);
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

    buyInAdvance() {
        if (!this.props.user) {
            this.props.showErrorModal(I18n.t("validation.SIGNED_IN_TO_BUY_IN_ADVANCE"), '/signin');
        } else {
            if (this.props.user.userType !== 'BUYER') {
                this.props.showErrorModal(I18n.t("validation.BE_BUYER_TO_BUY_IN_ADVANCE"), '/signin');
            } else {

                this.props.showConfirmModal(
                    I18n.t('msg.REALESTATE_BUY_IN_ADVANCE_CONFIRM_TITLE'),
                    I18n.t('msg.REALESTATE_BUY_IN_ADVANCE_CONFIRM_DESC', { inAdvanceAmount: this.props.realestate.inAdvanceAmount }),
                    null,
                    this.props.buyInAdvance,
                    [{ realestateCode: this.state.realestateCode }]
                )
            }
        }
    }

    setBid() {
        if (!this.props.user) {
            this.props.showErrorModal(I18n.t("validation.SIGNED_IN_TO_CREATE_BID"), '/signin');
        } else {
            if (this.props.user.userType !== 'BUYER') {
                this.props.showErrorModal(I18n.t("validation.BE_BUYER_TO_CREATE_BID"), '/signin');
            } else {


                this.props.showConfirmModal(
                    I18n.t('msg.REALESTATE_CREATE_BID_CONFIRM_TITLE'),
                    I18n.t('msg.REALESTATE_CREATE_BID_CONFIRM_DESC', { realestateCode: this.state.realestateCode, bidAmount: this.state.bidAmount }),
                    null,
                    this.props.createBid,
                    [{ realestateCode: this.state.realestateCode, bidAmount: this.state.bidAmount }]
                )
            }
        }
    }

    setAutoBid() {
        if (!this.props.user) {
            this.props.showErrorModal(I18n.t("validation.SIGNED_IN_TO_CREATE_BID"), '/signin');
        } else {
            if (this.props.user.userType !== 'BUYER') {
                this.props.showErrorModal(I18n.t("validation.BE_BUYER_TO_CREATE_BID"), '/signin');
            } else {

                this.props.showConfirmModal(
                    I18n.t('msg.REALESTATE_CREATE_AUTO_BID_CONFIRM_TITLE'),
                    I18n.t('msg.REALESTATE_CREATE_AUTO_BID_CONFIRM_DESC', { upperLimit: this.state.bidAmount }),
                    null,
                    this.props.createAutoBid,
                    [{ realestateCode: this.state.realestateCode, upperLimit: this.state.bidAmount }]
                )
            }
        }
    }

    showAlertMessage() {
        this.setState({ modalVisible: true });
        //this.props.showModal(I18n.t('msg.ALERT_MESSAGE_TO_WARRANT'), this.props.realestate.buyerWarrantAlert.replace('{DepositAmount}', this.props.realestateDepositAmount) + '\n\n <a target="_blank" style="color:#DB2828" href="/cdn/contracts/' + this.props.realestate.bank.code + '.pdf">Satış Sözleşmesi</a>');
    }

    hideAlertMessage() {
        this.setState({ modalVisible: false });
        console.log(this.state.modalVisible);
        //this.props.showModal(I18n.t('msg.ALERT_MESSAGE_TO_WARRANT'), this.props.realestate.buyerWarrantAlert.replace('{DepositAmount}', this.props.realestateDepositAmount) + '\n\n <a target="_blank" style="color:#DB2828" href="/cdn/contracts/' + this.props.realestate.bank.code + '.pdf">Satış Sözleşmesi</a>');
    }

    render() {
        const { realestate, systemDate, warrantedRealestates } = this.props;
        let closeForBid = false;
        if (realestate && realestate.realEstateStatus && realestate.realEstateStatus.code === 'STARTED') {
            if (moment.utc(realestate.endDate) < moment.utc(systemDate)) {
                closeForBid = true;
            }
        }
        if (realestate && realestate.realEstateStatus && realestate.realEstateStatus.code !== 'ACTIVE' && realestate.realEstateStatus.code !== 'STARTED') {
            closeForBid = true;
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
                                            <Grid.Column mobile={16} tablet={16} computer={16} >
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

                                                    <Grid.Row>
                                                        <Grid.Column style={{ textAlign: 'center' }} align="center">
                                                            <Header size='huge' align="center" style={{ marginTop: '0px' }}>
                                                                <Header.Content >
                                                                    <Header.Subheader>
                                                                        {I18n.t("label.LAST_BID")}
                                                                    </Header.Subheader>
                                                                    <Icon name='lira sign' />
                                                                    <NumberFormat value={this.props.realestate.currentBidAmount ? this.props.realestate.currentBidAmount : this.props.realestate.startingAmount} displayType={'text'} thousandSeparator='.' decimalSeparator=',' />
                                                                </Header.Content>
                                                            </Header>
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
                                                                            <Button onClick={() => this.setBid()} style={{ margin: '10px', width: '160px' }} size='medium' primary type='button' content={I18n.t("button.SET_BID")}></Button>
                                                                            <Button onClick={() => this.setAutoBid()} style={{ margin: '10px', width: '160px' }} size='medium' secondary type='button' content={I18n.t("button.SET_AUTO_BID")}></Button>
                                                                        </div>
                                                                        : <div>
                                                                            <Button onClick={() => this.showAlertMessage()} style={{ margin: '10px', width: '240px' }} size='medium' secondary type='button' content={I18n.t("button.ALERT_MESSAGE_TO_WARRANT")}></Button>
                                                                            {this.state.modalVisible ?
                                                                                <Modal size="tiny" open={this.state.modalVisible} onClose={this.hideAlertMessage}>
                                                                                    <Header as="h3">
                                                                                        <Icon name="info circle" color="green" />
                                                                                        <Header.Content>{I18n.t('msg.ALERT_MESSAGE_TO_WARRANT')}</Header.Content>
                                                                                    </Header>
                                                                                    <Modal.Content>
                                                                                        <p>{this.props.realestate.buyerWarrantAlert.replace('{DepositAmount}', this.props.realestateDepositAmount)}</p>
                                                                                        <p><a style={{ color: '#DB2828' }} onClick={() => this.getSalesContract()}>Satış Sözleşmesi</a> </p>
                                                                                        <p><a style={{ color: '#DB2828' }} onClick={() => this.getBankContract()}>Banka Sözleşmesi</a> </p>
                                                                                    </Modal.Content>
                                                                                    <Modal.Actions>
                                                                                        <Button onClick={this.hideAlertMessage} content={I18n.t('button.CLOSE')} />
                                                                                    </Modal.Actions>
                                                                                </Modal>
                                                                                : null}
                                                                        </div>
                                                            }
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
                                    {
                                        this.props.realestate.inAdvance && this.props.realestate.realEstateStatus.code === 'ACTIVE' && !closeForBid ?
                                            <Grid celled style={{ marginTop: '1.6em' }}>
                                                <Grid.Row>
                                                    <Grid.Column style={{ textAlign: 'center' }} align="center">
                                                        <Header size='huge' align="center" style={{ marginTop: '6px' }}>
                                                            <Header.Content>
                                                                <Header.Subheader>
                                                                    {I18n.t("label.IN_ADVANCE_AMOUNT")}
                                                                </Header.Subheader>
                                                                <Icon name='lira sign' />
                                                                <NumberFormat value={this.props.realestate.inAdvanceAmount} displayType={'text'} thousandSeparator='.' decimalSeparator=',' />
                                                            </Header.Content>
                                                        </Header>
                                                        <div>
                                                            {
                                                                warranted ?
                                                                    <div>
                                                                        <Button onClick={() => this.buyInAdvance()} style={{ margin: '10px', width: '160px' }} size='medium' primary type='button' content={I18n.t("button.BUY_IN_ADVANCE")}></Button></div>
                                                                    : <div>
                                                                        <Button onClick={() => this.showAlertMessage()} style={{ margin: '10px', width: '240px' }} size='medium' secondary type='button' content={I18n.t("button.ALERT_MESSAGE_TO_WARRANT")}></Button>
                                                                    </div>
                                                            }

                                                        </div>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                            : null
                                    }

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
    const { realestate, shouldRedirect, realestateDepositAmount } = state.realestateReducer;
    const { systemDate } = state.metadataReducer;
    const { warrantedRealestates } = state.buyerReducer;

    return {
        lastResponseId,
        user,
        realestate,
        shouldRedirect,
        systemDate,
        warrantedRealestates,
        realestateDepositAmount
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            getRealestatePublic,
            realestateRedirect,
            getSystemDate,
            createBid,
            createAutoBid,
            showErrorModal,
            showConfirmModal,
            getWarrantedRealestatesOfCurrentBuyer,
            showModal,
            getRealestateDepositAmount,
            getRealestateCurrentBidAmount,
            buyInAdvance,
            showLoading,
            hideLoading
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateDetail);

export { hoc as RealestateDetail };
