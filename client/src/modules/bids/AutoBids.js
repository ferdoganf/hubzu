import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { Segment, Table, Message, Dropdown } from 'semantic-ui-react'
import { setPageHeader } from '../../actions/page/Actions';
import { showErrorListModal } from '../../actions/page/Actions';
import { getAutoBidsOfBuyer } from '../../actions/bid/Actions';
import NumberFormat from 'react-number-format';
import moment from 'moment'


class AutoBids extends Component {
    componentDidMount() {
        this.props.getAutoBidsOfBuyer();
        this.props.setPageHeader([I18n.t('menu.MY_AUTO_BIDS')]);
    }
    render() {
        return (
            <div className='admin'>
                <Segment attached padded='very'>
                    {
                        (this.props.buyerAutoBids && (this.props.buyerAutoBids.length > 0)) ?
                            <div>
                                <Table sortable striped selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.REALESTATE_CODE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.DATE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.UPPER_LIMIT")}
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
                                        {this.props.buyerAutoBids
                                            .map(buyerAutoBid => {
                                                return (
                                                    <Table.Row key={buyerAutoBid.id}>
                                                        <Table.Cell singleLine style={{ overflow: 'visible' }}>
                                                            <Dropdown text={I18n.t("label.ACTION_BUTTON")} icon='content' floating labeled button className='icon' style={{ padding: '.58928571em 1.125em .58928571em' }}>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item text={I18n.t("label.UPDATE_INFO")} onClick={() => this.props.history.push("/autobids/" + buyerAutoBid.realEstate.code)} />
                                                                    <Dropdown.Item text={I18n.t("label.DELETE")} onClick={() => this.props.history.push("/autobids/" + buyerAutoBid.realEstate.code)} />
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerAutoBid.realEstate.code)}>{buyerAutoBid.realEstate.code}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerAutoBid.realEstate.code)}>
                                                            {moment.utc(buyerAutoBid.createdDate).format('YYYY-MM-DD HH:mm')}
                                                        </Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerAutoBid.realEstate.code)}>
                                                            <NumberFormat value={buyerAutoBid.upperLimit} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />
                                                        </Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerAutoBid.realEstate.code)}>{buyerAutoBid.realEstate.bank ? buyerAutoBid.realEstate.bank.name : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerAutoBid.realEstate.code)}>{(buyerAutoBid.realEstate.realEstateType) ? I18n.t("label." + buyerAutoBid.realEstate.realEstateType.code) : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerAutoBid.realEstate.code)}>{(buyerAutoBid.realEstate.realEstateSubType) ? I18n.t("label." + buyerAutoBid.realEstate.realEstateSubType.code) : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerAutoBid.realEstate.code)}>{buyerAutoBid.realEstate.title}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerAutoBid.realEstate.code)}>{(buyerAutoBid.realEstate.realEstateAddress && buyerAutoBid.realEstate.realEstateAddress.city) ? buyerAutoBid.realEstate.realEstateAddress.city.name : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerAutoBid.realEstate.code)}>{(buyerAutoBid.realEstate.realEstateAddress && buyerAutoBid.realEstate.realEstateAddress.district) ? buyerAutoBid.realEstate.realEstateAddress.district.name : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push('/realestates/detail/' + buyerAutoBid.realEstate.code)}>{buyerAutoBid.realEstate.realEstateStatus ? I18n.t("label." + buyerAutoBid.realEstate.realEstateStatus.code) : ''}</Table.Cell>
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
    const { buyerAutoBids } = state.bidReducer;
    return {
        lastResponseId,
        user,
        buyerAutoBids
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            getAutoBidsOfBuyer
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(AutoBids);

export { hoc as AutoBids };
