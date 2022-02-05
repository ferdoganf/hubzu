import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { Segment, Form, Table, Dropdown, Pagination, Message } from 'semantic-ui-react'
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { searchBuyer, deleteBuyer, buyerRedirect } from '../../../actions/buyer/Actions';
import { showConfirmModal } from '../../../actions/page/Actions';
import moment from 'moment'
import { getUserMetadata } from '../../../actions/metadata/Actions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class BuyerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userStatus: null,
            searchString: '',
            startDate: null,
            endDate: null,
            pageNo: 1,
            pageSize: 10,
            orderBy: 'id',
            orderType: 'desc'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    handleStartDate(value) {
        this.setState({ startDate: value });
    }

    handleEndDate(value) {
        this.setState({ endDate: value });
    }

    componentDidMount() {
        if (this.props.userMetadata === null) {
            this.props.getUserMetadata();
        }
        this.getBuyers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.buyerRedirect(false);
            this.getBuyers();
        }
    }


    handleDropdownChange(e, result) {
        const { id, value } = result
        this.setState({ [id]: value });
    }

    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    clearForm() {
        this.setState({
            searchString: '',
        }, () => {
            this.getBuyers()
        });
    }

    getBuyers() {
        this.props.searchBuyer({
            searchString: this.state.searchString,
            userStatus: this.state.userStatus,
            startDate: this.state.startDate ? moment(this.state.startDate).format("YYYY-MM-DD") : null,
            endDate: this.state.endDate ? moment(this.state.endDate).format("YYYY-MM-DD") : null,
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize,
            orderBy: this.state.orderBy,
            orderType: this.state.orderType
        });


    }

    handlePaginationChange = (e, { activePage }) => {
        if (activePage) {
            this.setState({ pageNo: activePage }, () => {
                this.getBuyers();
            });
        }
    }

    update(buyerCode) {
        this.props.history.push("/admin/buyer/" + buyerCode);
    }

    delete(buyerCode) {
        var buyer = this.props.buyers.find(e => e.code === buyerCode);
        if (buyer) {
            this.props.showConfirmModal(
                I18n.t('msg.BUYER_DELETE_CONFIRM_TITLE'),
                I18n.t('msg.BUYER_DELETE_CONFIRM_DESC', { name: buyer.name, surname: buyer.surname }),
                null,
                this.props.deleteBuyer,
                [buyerCode]
            )
        }
    }

    render() {
        let userStatus = [];
        if (this.props.userMetadata) {
            userStatus = this.props.userMetadata.userStatus.map(item => Object.assign({}, { key: item.code, text: I18n.t('label.USER_STATUS_' + item.code), value: item.code }));
            userStatus.unshift({ key: null, text: I18n.t('label.ALL'), value: null });
        }


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
                            <Form.Select
                                onKeyPress={this.onKeyPress}
                                name='userStatus'
                                id='userStatus'
                                value={this.state.userStatus}
                                onChange={this.handleDropdownChange}
                                width={4}
                                fluid
                                placeholder={I18n.t("label.ALL")}
                                label={I18n.t("label.STATUS")}
                                selection
                                options={userStatus}
                            />


                        </Form.Group>
                        <Form.Group style={{ verticalAlign: 'right' }}>
                            <Form.Field width={2}>
                                <label>{I18n.t("label.REGISTRATION_DATE_START")}</label>
                                <DatePicker selected={this.state.startDate} onChange={(date) => this.handleStartDate(date)} />
                            </Form.Field>
                            <Form.Field width={2}>
                                <label>{I18n.t("label.REGISTRATION_DATE_END")}</label>
                                <DatePicker selected={this.state.endDate} onChange={(date) => this.handleEndDate(date)} />
                            </Form.Field>
                            <Form.Button onClick={() => this.getBuyers()} style={{ marginTop: '22px' }} size='large' width={2} fluid primary type='button' icon='search' content={I18n.t("button.SEARCH")}></Form.Button>
                            <Form.Button onClick={() => this.clearForm()} style={{ marginTop: '22px' }} size='large' width={2} fluid secondary type='button' icon='eraser' content={I18n.t("button.CLEAR")}></Form.Button>
                            <Form.Button onClick={() => this.props.history.push("/admin/buyer")} style={{ marginTop: '22px' }} size='large' width={2} fluid primary basic type='button' icon='add' content={I18n.t("button.NEW_BUYER")}></Form.Button>
                        </Form.Group>
                    </Form>

                    {
                        (this.props.buyers && (this.props.buyers.length > 0)) ?
                            <div>
                                <Table sortable striped selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.IDENTITY_NUMBER")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.NAME")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.SURNAME")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.EMAIL_ADDRESS")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.PHONE_NUMBER")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.STATUS")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.REGISTRATION_DATE")}
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {this.props.buyers
                                            .map(buyer => {
                                                return (
                                                    <Table.Row key={buyer.code}>
                                                        <Table.Cell singleLine style={{ overflow: 'visible' }}>
                                                            <Dropdown text={I18n.t("label.ACTION_BUTTON")} icon='content' floating labeled button className='icon' style={{ padding: '.58928571em 1.125em .58928571em' }}>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item text={I18n.t("label.UPDATE_INFO")} onClick={() => this.props.history.push("/admin/buyer/" + buyer.code)} />
                                                                    <Dropdown.Item text={I18n.t("label.UPDATE_PASSWORD")} onClick={() => this.props.history.push("/admin/buyer/" + buyer.code + '/password')} />
                                                                    <Dropdown.Item text={I18n.t("label.UPDATE_BUYER_REALESTATE_WARRANTS")} onClick={() => this.props.history.push("/admin/buyer/" + buyer.code + '/realestate/warrants')} />
                                                                    <Dropdown.Item text={I18n.t("label.UPDATE_STATUS")} onClick={() => this.props.history.push("/admin/buyer/" + buyer.code + '/status')} />
                                                                    <Dropdown.Item error text={I18n.t("label.DELETE")} onClick={() => this.delete(buyer.code)} />
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Table.Cell>
                                                        <Table.Cell>{buyer.identityNumber}</Table.Cell>
                                                        <Table.Cell>{buyer.name}</Table.Cell>
                                                        <Table.Cell>{buyer.surname}</Table.Cell>
                                                        <Table.Cell>{buyer.emailAddress}</Table.Cell>
                                                        <Table.Cell>{buyer.phone}</Table.Cell>
                                                        <Table.Cell>{buyer.userStatus ? I18n.t("label.USER_STATUS_" + buyer.userStatus.code) : ''}</Table.Cell>
                                                        <Table.Cell>{buyer.createdDate ? moment.utc(buyer.createdDate).local().format('YYYY-MM-DD HH:mm') : ''}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                    </Table.Body>
                                </Table>
                                <div align='right'>
                                    <Pagination activePage={pageNo} key='paginationPanel'
                                        onPageChange={this.handlePaginationChange}
                                        totalPages={Math.ceil(this.props.buyerCount / pageSize)}
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
    const { buyers, buyerCount, shouldRedirect } = state.buyerReducer;
    const { userMetadata } = state.metadataReducer;
    return {
        lastResponseId,
        user,
        buyers,
        buyerCount,
        shouldRedirect,
        userMetadata
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            searchBuyer,
            showConfirmModal,
            deleteBuyer,
            buyerRedirect,
            getUserMetadata
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BuyerList);

export { hoc as BuyerList };
