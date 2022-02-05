import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { Segment, Form, Table, Dropdown, Pagination, Message } from 'semantic-ui-react'
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { searchBank } from '../../../actions/metadata/Actions';

class BankList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            pageNo: 1,
            pageSize: 10,
            orderBy: 'id',
            orderType: 'desc'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.getBanks();
    }


    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    clearForm() {
        this.setState({
            searchString: '',
        }, () => {
            this.getBanks()
        });
    }

    getBanks() {
        this.props.searchBank({
            searchString: this.state.searchString,
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize,
            orderBy: this.state.orderBy,
            orderType: this.state.orderType
        });
    }

    handlePaginationChange = (e, { activePage }) => {
        if (activePage) {
            this.setState({ pageNo: activePage }, () => {
                this.getBanks();
            });
        }
    }

    update(bankCode) {
        this.props.history.push("/admin/bank/" + bankCode);
    }

    render() {
        const { pageNo, pageSize } = this.state;
        return (
            <div className='admin'>
                <Segment attached padded='very'>
                    <Form size='large'>
                        <Form.Group>
                            <Form.Input
                                onKeyPress={this.onKeyPress}
                                name='searchString'
                                id='searchString'
                                value={this.state.searchString}
                                onChange={this.handleInputChange}
                                width={4}
                                fluid
                                label={I18n.t("label.KEYWORD")} />
                            <Form.Button onClick={() => this.getBanks()} style={{ marginTop: '22px' }} size='large' width={2} fluid primary type='button' icon='search' content={I18n.t("button.SEARCH")}></Form.Button>
                            <Form.Button onClick={() => this.clearForm()} style={{ marginTop: '22px' }} size='large' width={2} fluid secondary type='button' icon='eraser' content={I18n.t("button.CLEAR")}></Form.Button>
                            <Form.Button onClick={() => this.props.history.push("/admin/bank")} style={{ marginTop: '22px' }} size='large' width={2} fluid primary basic type='button' icon='add' content={I18n.t("button.NEW_BANK")}></Form.Button>
                        </Form.Group>
                    </Form>

                    {
                        (this.props.banks && (this.props.banks.length > 0)) ?
                            <div>
                                <Table sortable striped selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.BANK_CODE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.BANK_NAME")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.ENABLED")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.DEPOSIT_RATE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.SERVICE_FEE_RATE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.ALERT_MESSAGE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.FINISHED_AUCTIONS_SHOWN")}
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {this.props.banks
                                            .map(bank => {
                                                return (
                                                    <Table.Row key={bank.code}>
                                                        <Table.Cell singleLine style={{ overflow: 'visible' }}>
                                                            <Dropdown text={I18n.t("label.ACTION_BUTTON")} icon='content' floating labeled button className='icon' style={{ padding: '.58928571em 1.125em .58928571em' }}>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item text={I18n.t("label.UPDATE_INFO")} onClick={() => this.props.history.push("/admin/bank/" + bank.code)} />
                                                                    <Dropdown.Item text={I18n.t("label.UPDATE_CONTRACT")} onClick={() => this.props.history.push("/admin/contract/bank/" + bank.code)} />
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Table.Cell>
                                                        <Table.Cell>{bank.code}</Table.Cell>
                                                        <Table.Cell>{bank.name}</Table.Cell>
                                                        <Table.Cell>{bank.enabled ? I18n.t("label.YES") : I18n.t("label.NO")}</Table.Cell>
                                                        <Table.Cell>{bank.depositRate}</Table.Cell>
                                                        <Table.Cell>{bank.serviceFeeRate}</Table.Cell>
                                                        <Table.Cell>{bank.buyerWarrantAlert}</Table.Cell>
                                                        <Table.Cell>{bank.finishedAuctionsShown ? I18n.t("label.YES") : I18n.t("label.NO")}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                    </Table.Body>
                                </Table>
                                <div align='right'>
                                    <Pagination activePage={pageNo} key='paginationPanel'
                                        onPageChange={this.handlePaginationChange}
                                        totalPages={Math.ceil(this.props.bankCount / pageSize)}
                                    />
                                </div>
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
    const { banks, bankCount } = state.metadataReducer;
    return {
        lastResponseId,
        user,
        banks,
        bankCount
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            searchBank
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BankList);

export { hoc as BankList };
