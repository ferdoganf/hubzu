import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { Segment, Table, Message } from 'semantic-ui-react'
import { setPageHeader } from '../../actions/page/Actions';
import { showErrorListModal } from '../../actions/page/Actions';
import { getBidsOfBuyer } from '../../actions/bid/Actions';
import NumberFormat from 'react-number-format';
import moment from 'moment'


class Bids extends Component {
    componentDidMount() {
        this.props.getBidsOfBuyer();
        this.props.setPageHeader([I18n.t('menu.MY_BIDS')]);
    }
    render() {
        return (
            <div className='admin'>
                <Segment attached padded='very'>
                    {
                        (this.props.buyerBids && (this.props.buyerBids.length > 0)) ?
                            <div>
                                <Table sortable striped selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>
                                                {I18n.t("label.REALESTATE_CODE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.DATE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.BID_AMOUNT")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.BANK")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.REAL_ESTATE_TYPE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.REAL_ESTATE_SUB_TYPE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.REALESTATE_TITLE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.CITY")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.DISTRICT")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.STATUS")}
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {this.props.buyerBids
                                            .map(buyerBid => {
                                                return (
                                                    <Table.Row key={buyerBid.id}>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerBid.realEstate.code)}>{buyerBid.realEstate.code}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerBid.realEstate.code)}>
                                                            {moment.utc(buyerBid.createdDate).format('YYYY-MM-DD HH:mm')}
                                                        </Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerBid.realEstate.code)}>
                                                            <NumberFormat value={buyerBid.bidAmount} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />
                                                        </Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerBid.realEstate.code)}>{buyerBid.realEstate.bank ? buyerBid.realEstate.bank.name : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerBid.realEstate.code)}>{(buyerBid.realEstate.realEstateType) ? I18n.t("label." + buyerBid.realEstate.realEstateType.code) : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerBid.realEstate.code)}>{(buyerBid.realEstate.realEstateSubType) ? I18n.t("label." + buyerBid.realEstate.realEstateSubType.code) : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerBid.realEstate.code)}>{buyerBid.realEstate.title}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerBid.realEstate.code)}>{(buyerBid.realEstate.realEstateAddress && buyerBid.realEstate.realEstateAddress.city) ? buyerBid.realEstate.realEstateAddress.city.name : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerBid.realEstate.code)}>{(buyerBid.realEstate.realEstateAddress && buyerBid.realEstate.realEstateAddress.district) ? buyerBid.realEstate.realEstateAddress.district.name : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerBid.realEstate.code)}>{buyerBid.realEstate.realEstateStatus ? I18n.t("label." + buyerBid.realEstate.realEstateStatus.code) : ''}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                    </Table.Body>
                                </Table>
                            </div>
                            :
                            <Message
                                warning
                                content={I18n.t("msg.ACTION_SEARCH_RESULT_EMPTY")}
                            />
                    }
                </Segment>
            </div >
        );
    }

}

const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { buyerBids } = state.bidReducer;
    return {
        lastResponseId,
        user,
        buyerBids
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            getBidsOfBuyer
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(Bids);

export { hoc as Bids };
