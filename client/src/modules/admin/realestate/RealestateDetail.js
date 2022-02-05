/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { setPageHeader } from '../../../actions/page/Actions';
import { Segment, Grid, Button, Table, Radio } from 'semantic-ui-react'
import { showErrorListModal, showErrorModal } from '../../../actions/page/Actions';
import { getRealestate, realestateRedirect } from '../../../actions/realestate/Actions';
import { getRealestateBuyersWarrants, getRealestateBuyersFavorites, getRealestateBids, getRealestateUserViews } from '../../../actions/stats/Actions';
import RealestateDetailsPanel from '../../../components/realestate/RealestateDetailsPanel';
import NumberFormat from 'react-number-format';
import RealestateReportsPanel from './RealestateReportsPanel';
import { showLoading, hideLoading } from '../../../actions/page/Actions';

import moment from 'moment'

class RealestateDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null
        };
    }



    componentDidMount() {
        let code = null;
        if (this.props.match.params.code) {
            code = this.props.match.params.code.toString();
            if (code) {
                this.setState({ realestateCode: code });
            }
        }
        if (!code) {
            this.props.history.push("/admin/realestate/list");
        } else {
            this.props.getRealestate(code);
            this.props.getRealestateBuyersWarrants(code);
            this.props.getRealestateBuyersFavorites(code);
            this.props.getRealestateBids(code);
            this.props.getRealestateUserViews(code);
        }
    }

    back() {
        this.props.history.push("/admin/realestate/list");
    }

    render() {
        return (
            <div className='admin' >
                <Segment attached padded='very'>
                    {this.state.realestateCode && this.props.realestateCreated ?
                        <Grid>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={12} computer={8}>
                                    <RealestateDetailsPanel realestate={this.props.realestateCreated} editable={true} history={this.props.history} showErrorModal={this.props.showErrorModal}></RealestateDetailsPanel>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={12} computer={8}>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Table celled striped color='orange'>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell colSpan='1' textAlign="center" style={{ padding: '0.4em', verticalAlign: 'bottom' }}>
                                                                <Grid padded stackable columns={3}>
                                                                    <Grid.Column floated='left' textAlign='left'>
                                                                    </Grid.Column>
                                                                    <Grid.Column textAlign='center' style={{ padding: '6px 0px 0px 0px' }}>
                                                                        {I18n.t("label.STATUS")}
                                                                    </Grid.Column>
                                                                    <Grid.Column floated='right' textAlign='right' style={{ padding: '0px 0px 0px 0px' }}>
                                                                        <Button style={{ float: 'right' }} size='small' onClick={() => this.props.history.push("/admin/realestate/" + this.props.realestateCreated.code + "/status")} primary basic type='button' icon='edit' content={I18n.t("button.UPDATE")}></Button>
                                                                    </Grid.Column>
                                                                </Grid>
                                                            </Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label." + this.props.realestateCreated.realEstateStatus.code)}</Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </Grid.Column>
                                        </Grid.Row>


                                        <Grid.Row>
                                            <Grid.Column>
                                                <Table celled striped color='orange'>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell colSpan='3' textAlign="center" style={{ padding: '0.4em', verticalAlign: 'bottom' }}>
                                                                <Grid padded stackable>
                                                                    <Grid.Column textAlign='center' style={{ padding: '6px 0px 0px 0px' }}>
                                                                        {I18n.t("label.AUCTION")}
                                                                    </Grid.Column>
                                                                </Grid>
                                                            </Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.AUCTION_DATE")}</Table.Cell>
                                                            <Table.Cell colSpan='2'>
                                                                {this.props.realestateCreated.auctionDate ? moment.utc(this.props.realestateCreated.auctionDate).local().format('YYYY-MM-DD HH:mm') : ''}
                                                            </Table.Cell>

                                                        </Table.Row>

                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.AUCTION_START_DATE")}</Table.Cell>
                                                            <Table.Cell colSpan='2'>
                                                                {this.props.realestateCreated.startDate ? moment.utc(this.props.realestateCreated.startDate).local().format('YYYY-MM-DD HH:mm') : ''}
                                                            </Table.Cell>
                                                        </Table.Row>

                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.AUCTION_END_DATE")}</Table.Cell>
                                                            <Table.Cell>
                                                                {this.props.realestateCreated.endDate ? moment.utc(this.props.realestateCreated.endDate).local().format('YYYY-MM-DD HH:mm') : ''}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {
                                                                    this.props.realestateCreated.endDate ?
                                                                        <Button style={{ float: 'right' }} size='tiny' onClick={() => this.props.history.push("/admin/realestate/" + this.props.realestateCreated.code + "/enddate")} primary basic type='button' icon='edit' content={I18n.t("button.UPDATE")}></Button>
                                                                        : null
                                                                }
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Table celled striped color='orange'>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell colSpan='2' textAlign="center" style={{ padding: '0.4em', verticalAlign: 'bottom' }}>
                                                                <Grid padded stackable columns={3}>
                                                                    <Grid.Column floated='left' textAlign='left'>
                                                                    </Grid.Column>
                                                                    <Grid.Column textAlign='center' style={{ padding: '6px 0px 0px 0px' }}>
                                                                        {I18n.t("label.BIDS")}
                                                                    </Grid.Column>
                                                                    <Grid.Column floated='right' textAlign='right' style={{ padding: '0px 0px 0px 0px' }}>
                                                                        <Button style={{ float: 'right' }} size='small' onClick={() => this.props.history.push("/admin/realestate/" + this.props.realestateCreated.code + "/bids")} primary basic type='button' icon='zoom in' content={I18n.t("button.WITH_DETAILS")}></Button>
                                                                    </Grid.Column>
                                                                </Grid>
                                                            </Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.STARTING_AMOUNT")}</Table.Cell>
                                                            <Table.Cell>
                                                                <NumberFormat value={this.props.realestateCreated.startingAmount} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.BID_STEP")}</Table.Cell>
                                                            <Table.Cell>
                                                                <NumberFormat value={this.props.realestateCreated.bidStep} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TENDER_PARTICIPATION_FEE")}</Table.Cell>
                                                            <Table.Cell>
                                                                <NumberFormat value={this.props.realestateCreated.tenderParticipationFee} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.DEPOSIT_RATE")}</Table.Cell>
                                                            <Table.Cell>
                                                                <NumberFormat value={this.props.realestateCreated.depositRate} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'%'} />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.SERVICE_FEE_RATE")}</Table.Cell>
                                                            <Table.Cell>
                                                                <NumberFormat value={this.props.realestateCreated.serviceFeeRate} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'%'} />
                                                            </Table.Cell>
                                                        </Table.Row>

                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.IN_ADVANCE")}</Table.Cell>
                                                            <Table.Cell>
                                                                <Radio toggle
                                                                    checked={this.props.realestateCreated.inAdvance}
                                                                />
                                                            </Table.Cell>
                                                        </Table.Row>

                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.IN_ADVANCE_AMOUNT")}</Table.Cell>
                                                            <Table.Cell>
                                                                <NumberFormat value={this.props.realestateCreated.inAdvanceAmount} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />
                                                            </Table.Cell>
                                                        </Table.Row>


                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.LAST_BID")}</Table.Cell>
                                                            <Table.Cell>
                                                                {
                                                                    this.props.realestateCreated.currentBidAmount ?
                                                                        <NumberFormat value={this.props.realestateCreated.currentBidAmount} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />
                                                                        : null
                                                                }
                                                            </Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_BID_COUNT_12")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateBidsStats.last12}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_BID_COUNT_24")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateBidsStats.last24}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_BID_COUNT")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateBidsStats.total}</Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Table celled striped color='orange'>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell colSpan='2' textAlign="center" style={{ padding: '0.4em', verticalAlign: 'bottom' }}>
                                                                <Grid padded stackable columns={3}>
                                                                    <Grid.Column floated='left' textAlign='left'>
                                                                    </Grid.Column>
                                                                    <Grid.Column textAlign='center' style={{ padding: '6px 0px 0px 0px' }}>
                                                                        {I18n.t("label.WARRANTED_BUYERS")}
                                                                    </Grid.Column>
                                                                    <Grid.Column floated='right' textAlign='right' style={{ padding: '0px 0px 0px 0px' }}>
                                                                        <Button style={{ float: 'right' }} size='small' onClick={() => this.props.history.push("/admin/realestate/" + this.props.realestateCreated.code + "/buyers")} primary basic type='button' icon='edit' content={I18n.t("button.UPDATE")}></Button>
                                                                    </Grid.Column>
                                                                </Grid>
                                                            </Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.WARRANTED_BUYERS_NUMBER")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateBuyersWarrantsStats.warranted}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_ACTIVE_BUYERS_NUMBER")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateBuyersWarrantsStats.active}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_BUYERS_NUMBER")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateBuyersWarrantsStats.total}</Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Table celled striped color='orange'>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell colSpan='2' textAlign="center" style={{ padding: '0.4em', verticalAlign: 'bottom' }}>
                                                                <Grid padded stackable columns={3}>
                                                                    <Grid.Column floated='left' textAlign='left'>
                                                                    </Grid.Column>
                                                                    <Grid.Column textAlign='center' style={{ padding: '6px 0px 0px 0px' }}>
                                                                        {I18n.t("label.FAVOURITES")}
                                                                    </Grid.Column>
                                                                    <Grid.Column floated='right' textAlign='right' style={{ padding: '0px 0px 0px 0px' }}>
                                                                        <Button style={{ float: 'right' }} size='small' onClick={() => this.props.history.push("/admin/realestate/" + this.props.realestateCreated.code + "/favorites")} primary basic type='button' icon='zoom in' content={I18n.t("button.WITH_DETAILS")}></Button>
                                                                    </Grid.Column>
                                                                </Grid>
                                                            </Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_FAVOURITES_COUNT_12")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateBuyersFavoritesStats.last12}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_FAVOURITES_COUNT_24")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateBuyersFavoritesStats.last24}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_FAVOURITES_COUNT")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateBuyersFavoritesStats.total}</Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Table celled striped color='orange'>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell colSpan='2' textAlign="center" style={{ padding: '0.4em', verticalAlign: 'bottom' }}>
                                                                <Grid padded stackable columns={3}>
                                                                    <Grid.Column floated='left' textAlign='left'>
                                                                    </Grid.Column>
                                                                    <Grid.Column textAlign='center' style={{ padding: '6px 0px 0px 0px' }}>
                                                                        {I18n.t("label.VIEWS")}
                                                                    </Grid.Column>
                                                                    <Grid.Column floated='right' textAlign='right' style={{ padding: '0px 0px 0px 0px' }}>
                                                                    </Grid.Column>
                                                                </Grid>
                                                            </Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_VIEWS_COUNT_12")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateUserViewsStats.last12}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_VIEWS_COUNT_12_IP_FILTERED")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateUserViewsStats.last12IpFiltered}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_VIEWS_COUNT_24")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateUserViewsStats.last24}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_VIEWS_COUNT_24_IP_FILTERED")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateUserViewsStats.last24IpFiltered}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_VIEWS_COUNT")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateUserViewsStats.total}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.TOTAL_VIEWS_COUNT_IP_FILTERED")}</Table.Cell>
                                                            <Table.Cell>{this.props.realestateUserViewsStats.totalIpFiltered}</Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <RealestateReportsPanel realestate={this.props.realestateCreated} showLoading={this.props.showLoading}
                                                    hideLoading={this.props.hideLoading} history={this.props.history}></RealestateReportsPanel>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
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
                            {
                                /*
                                <Button onClick={() => this.submit(-1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_PASSIVE")}></Button>
                                <Button onClick={() => this.submit(1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.PUBLISH")}></Button>
                                */
                            }
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
    const { realestateBuyersWarrantsStats, realestateBuyersFavoritesStats, realestateBidsStats, realestateUserViewsStats } = state.statsReducer;


    return {
        lastResponseId,
        user,
        realestateCreated,
        shouldRedirect,
        realestateBuyersWarrantsStats,
        realestateBuyersFavoritesStats,
        realestateBidsStats,
        realestateUserViewsStats
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            getRealestate,
            realestateRedirect,
            getRealestateBuyersWarrants,
            getRealestateBuyersFavorites,
            getRealestateBids,
            getRealestateUserViews,
            showErrorModal,
            showLoading,
            hideLoading
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateDetail);

export { hoc as RealestateDetail };
