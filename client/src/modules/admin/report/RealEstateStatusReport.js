import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { Segment, Form, Table, Pagination, Message } from 'semantic-ui-react'
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { getRealEstateStatusChanges, reportRedirect } from '../../../actions/report/Actions';
import { showConfirmModal } from '../../../actions/page/Actions';
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class RealEstateStatusReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            startDate: new Date(),
            endDate: new Date(),
            pageNo: 1,
            pageSize: 10,
            orderBy: 'id',
            orderType: 'desc'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    preparePageHeader(prevProps, prevState) {
        if (
            prevProps == null || prevState == null
        ) {
            let sections = [];
            sections.push({ key: 'BCUFbreadcrumb1', content: I18n.t('menu.REAL_ESTATE_STATUS_REPORT'), link: true, active: true });
            this.props.setPageHeader(sections);
        }
    }

    handleStartDate(value) {
        this.setState({ startDate: value });
    }

    handleEndDate(value) {
        this.setState({ endDate: value });
    }

    componentDidMount() {
        this.preparePageHeader();
        this.getRealEstateStatusReport();
    }

    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    clearForm() {
        this.setState({
            searchString: '',
            startDate: new Date(),
            endDate: new Date(),
        }, () => {
            this.getRealEstateStatusReport()
        });
    }

    getRealEstateStatusReport() {
        this.props.getRealEstateStatusChanges({
            searchString: this.state.searchString,
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
                this.getRealEstateStatusReport();
            });
        }
    }

    render() {
        const { pageNo, pageSize } = this.state;
        return (
            <div className='admin'>
                <Segment attached padded='very'>
                    <Form size='large'>
                        <Form.Group style={{ verticalAlign: 'right' }}>
                            <Form.Input
                                onKeyPress={this.onKeyPress}
                                name='searchString'
                                id='searchString'
                                value={this.state.searchString}
                                onChange={this.handleInputChange}
                                width={3}
                                fluid
                                placeholder={I18n.t("label.REALESTATE_KEYWORD")}
                                label={I18n.t("label.REALESTATE_KEYWORD")} />
                            <Form.Field width={2}>
                                <label>{I18n.t("label.REGISTRATION_DATE_START")}</label>
                                <DatePicker selected={this.state.startDate} onChange={(date) => this.handleStartDate(date)} />
                            </Form.Field>
                            <Form.Field width={2}>
                                <label>{I18n.t("label.REGISTRATION_DATE_END")}</label>
                                <DatePicker selected={this.state.endDate} onChange={(date) => this.handleEndDate(date)} />
                            </Form.Field>
                            <Form.Button onClick={() => this.getRealEstateStatusReport()} style={{ marginTop: '22px' }} size='large' width={2} fluid primary type='button' icon='search' content={I18n.t("button.SEARCH")}></Form.Button>
                            <Form.Button onClick={() => this.clearForm()} style={{ marginTop: '22px' }} size='large' width={2} fluid secondary type='button' icon='eraser' content={I18n.t("button.CLEAR")}></Form.Button>
                        </Form.Group>
                    </Form>

                    {
                        (this.props.realestatesStatusChanges && (this.props.realestatesStatusChanges.length > 0)) ?
                            <div>
                                <Table sortable striped selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>
                                                {I18n.t("label.REALESTATE_CODE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.BANK")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.REAL_ESTATE_TYPE")}
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
                                                {I18n.t("label.OLD_STATUS")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.NEW_STATUS")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.DATE")}
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {this.props.realestatesStatusChanges
                                            .map(item => {
                                                return (
                                                    <Table.Row key={item.id}>
                                                        <Table.Cell>{item.realEstateCode}</Table.Cell>
                                                        <Table.Cell>{item.bankName}</Table.Cell>
                                                        <Table.Cell>{item.realEstateTypeCode ? I18n.t("label." + item.realEstateTypeCode) : ''}</Table.Cell>
                                                        <Table.Cell>{item.title}</Table.Cell>
                                                        <Table.Cell>{item.cityName}</Table.Cell>
                                                        <Table.Cell>{item.districtName}</Table.Cell>
                                                        <Table.Cell>{item.realEstateStatusCodeOld ? I18n.t("label." + item.realEstateStatusCodeOld) : ''}</Table.Cell>
                                                        <Table.Cell>{item.realEstateStatusCodeNew ? I18n.t("label." + item.realEstateStatusCodeNew) : ''}</Table.Cell>
                                                        <Table.Cell>{item.createdDate ? moment.utc(item.createdDate).local().format('YYYY-MM-DD HH:mm') : ''}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                    </Table.Body>
                                </Table>
                                <div align='right'>
                                    <Pagination activePage={pageNo} key='paginationPanel'
                                        onPageChange={this.handlePaginationChange}
                                        totalPages={Math.ceil(this.props.realestatesStatusChangesCount / pageSize)}
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
    const { realestatesStatusChanges, realestatesStatusChangesCount, shouldRedirect } = state.reportReducer;
    return {
        lastResponseId,
        user,
        realestatesStatusChanges,
        realestatesStatusChangesCount,
        shouldRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            getRealEstateStatusChanges,
            showConfirmModal,
            reportRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealEstateStatusReport);

export { hoc as RealEstateStatusReport };
