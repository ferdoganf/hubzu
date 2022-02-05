import React, { Component } from 'react';
import { Grid, Icon, Label, Header, Button } from 'semantic-ui-react'
import MiniImageSlider from '../../components/image/MiniImageSlider';
import { I18n } from 'react-redux-i18n';
import NumberFormat from 'react-number-format';
import moment from 'moment'
import CountdownClock from './CountdownClock';

class RealEstateGridRow extends Component {

    constructor(props) {
        super(props);
        this.navigateToDetail = this.navigateToDetail.bind(this);
    }

    navigateToDetail() {
        this.props.history.push('/realestates/detail/' + this.props.realestate.code);
    }

    render() {
        const { realestate, systemDate } = this.props;
        let closeForBid = false;
        if (realestate && realestate.realEstateStatus && realestate.realEstateStatus.code === 'STARTED') {
            if (moment.utc(realestate.endDate) < moment.utc(systemDate)) {
                closeForBid = true;
            }
        }

        if (realestate && realestate.realEstateStatus && realestate.realEstateStatus.code !== 'ACTIVE' && realestate.realEstateStatus.code !== 'STARTED') {
            closeForBid = true;
        }

        return (
            <Grid.Row key={realestate.code} style={{ paddingBottom: "0.6em" }}>
                <Grid.Column className="realEstateGridRowColumn">
                    <Grid celled>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={6} computer={3} style={{ padding: "0.4em 0.4em 1.4em 0.4em" }}>
                                <MiniImageSlider images={realestate.photos ? realestate.photos : null}></MiniImageSlider>
                                {
                                    this.props.favorited ?
                                        <Button style={{ fontSize: '0.9rem', width: '124px', padding: '0.7em' }} className='addToFavoritesIcon' onClick={() => this.props.removeFromFavorites(realestate.code)} size='mini' color='red' type='button' content={I18n.t("button.REMOVE_FROM_FAVORITES")}></Button>
                                        :
                                        closeForBid ?
                                            null
                                            :
                                            <Button style={{ fontSize: '0.9rem', width: '124px', padding: '0.7em' }} className='addToFavoritesIcon' onClick={() => this.props.addToFavorites(realestate.code)} size='mini' color='orange' type='button' content={I18n.t("button.ADD_TO_FAVORITES")}></Button>
                                }
                                {closeForBid ?
                                    <Label basic className='closeForBidWatermark' color='grey' horizontal>
                                        {I18n.t("label.FINISHED")}
                                    </Label>
                                    : ''}
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={10} computer={9}>
                                <Grid className='gridRowDetails' onClick={() => this.navigateToDetail()}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header size='tiny' style={{ marginBottom: '4px' }}>{realestate.title + ' (' + realestate.code + ')'}</Header>
                                            <Header size='tiny' style={{ marginTop: '4px' }}>{realestate.bank.name}</Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={6}>
                                            <Header size='tiny' style={{ marginLeft: '-6px' }}><Icon name='map marker alternate' />
                                                {
                                                    realestate.realEstateAddress ?
                                                        (realestate.realEstateAddress.city ? realestate.realEstateAddress.city.name : '') + ' / ' + (realestate.realEstateAddress.district ? realestate.realEstateAddress.district.name : '') +
                                                        (realestate.realEstateAddress.neighborhood ? ' / ' + realestate.realEstateAddress.neighborhood.name : '')
                                                        : ''
                                                }
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                            <Header size='tiny'><Icon name='archive' />{realestate.realEstateType ? I18n.t('label.' + realestate.realEstateType.code) : null} - {realestate.realEstateSubType ? I18n.t('label.' + realestate.realEstateSubType.code) : null}</Header>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            <Header size='tiny'>
                                                <Icon name='clipboard list' />
                                                {
                                                    (realestate.realEstateType.code === 'RESIDENTIAL') ?
                                                        (realestate.numberOfRooms ? realestate.numberOfRooms.code + '  ' : null) +
                                                        (realestate.floorSpaceGross ? (realestate.floorSpaceGross + ' m2') : null)
                                                        :
                                                        (realestate.realEstateType.code === 'COMMERCIAL') ?
                                                            realestate.floorSpaceGross ? (realestate.floorSpaceGross + ' m2') : ''
                                                            :
                                                            (realestate.realEstateType.code === 'LAND') ?
                                                                realestate.floorSpaceNet ? (realestate.floorSpaceNet + ' m2') : null
                                                                : null
                                                }
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column style={{ textAlign: 'center' }} align="center">
                                            {
                                                this.props.realestate.realEstateStatus.code === 'ACTIVE' ?
                                                    null
                                                    : this.props.realestate.realEstateStatus.code === 'STARTED' ?
                                                        <CountdownClock realestate={this.props.realestate} systemDate={this.props.systemDate} />
                                                        : null
                                            }
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={16} computer={4}>
                                <Grid>
                                    <Grid.Row style={{ paddingTop: "0.9em" }}>
                                        <Grid.Column style={{ textAlign: 'center' }} align="center">
                                            <Header size='huge' align="center">
                                                {
                                                    this.props.realestate.realEstateStatus.code === 'ACTIVE' ?
                                                        <Label style={{ marginBottom: '0.8em', marginTop: '0.8em' }} size='large' color='orange' >{I18n.t('label.BID_WAITED')}</Label>
                                                        :
                                                        <Header.Content>
                                                            <Header.Subheader>
                                                                {I18n.t("label.LAST_BID")}
                                                            </Header.Subheader>
                                                            <Icon name='lira sign' />
                                                            <NumberFormat value={this.props.realestate.currentBidAmount ? this.props.realestate.currentBidAmount : this.props.realestate.startingAmount} displayType={'text'} thousandSeparator='.' decimalSeparator=',' />
                                                        </Header.Content>
                                                }
                                            </Header>
                                            <Header size='large' block align="center" style={{ marginTop: '0px' }}>
                                                <Header.Content>
                                                    <Header.Subheader>
                                                        {I18n.t("label.STARTING_AMOUNT")}
                                                    </Header.Subheader>
                                                    <Icon name='lira sign' style={{ fontSize: '1em' }} />
                                                    <NumberFormat value={this.props.realestate.startingAmount} displayType={'text'} thousandSeparator='.' decimalSeparator=',' />
                                                </Header.Content>
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={{ paddingTop: '0.8em' }}>
                                        <Grid.Column style={{ textAlign: 'center' }} align="center">
                                            {
                                                closeForBid ?
                                                    <Label style={{ marginBottom: '0.8em', marginTop: '0.8em' }} size='large' color='grey' >{I18n.t('label.END_DATE_PAST_FOR_BID')}</Label>
                                                    :
                                                    <div>
                                                        <Button onClick={() => this.navigateToDetail()} style={{ width: '100px' }} size='medium' primary type='button' content={I18n.t("button.SET_BID")}></Button>
                                                        {
                                                            this.props.realestate.inAdvance && this.props.realestate.realEstateStatus.code === 'ACTIVE' ?
                                                                < Button onClick={() => this.navigateToDetail()} style={{ width: '100px' }} size='medium' secondary type='button' content={I18n.t("button.BUY_IN_ADVANCE")}></Button>
                                                                : null
                                                        }
                                                    </div>
                                            }
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid.Row >

        );
    }
}

export default RealEstateGridRow;