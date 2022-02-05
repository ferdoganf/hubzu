import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { setPageHeader } from '../../../actions/page/Actions';
import { Segment, Form, Table, Dropdown, Pagination, Message } from 'semantic-ui-react'
import { showErrorListModal } from '../../../actions/page/Actions';
import { getRealestateMetadata } from '../../../actions/metadata/Actions';
import { getCities, getDistricts } from '../../../actions/address/Actions';
import { searchRealestate, deleteRealestate, copyRealestate, realestateRedirect } from '../../../actions/realestate/Actions';
import { showConfirmModal } from '../../../actions/page/Actions';


class RealestateList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realestateStatus: null,
            bank: null,
            realEstateType: null,
            searchString: '',
            city: null,
            district: null,
            pageNo: 1,
            pageSize: 10,
            orderBy: 'id',
            orderType: 'desc'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleDropdownChangeCity = this.handleDropdownChangeCity.bind(this);
        this.handleDropdownChangeDistrict = this.handleDropdownChangeDistrict.bind(this);
        this.delete = this.delete.bind(this);
        this.copy = this.copy.bind(this);
    }

    preparePageHeader(prevProps, prevState) {
        let sections = [];
        if (prevProps == null || prevState == null) {
            sections.push({ key: 'RealestateListbreadcrumb1', content: I18n.t('menu.REALESTATE_LIST'), link: true, active: true });
            this.props.setPageHeader(sections);
        } else {
            sections.push({ key: 'RealestateListbreadcrumb1', content: I18n.t('menu.REALESTATE_LIST'), link: true, active: true });

            if (
                (!this.state.realestateStatus)
                && (!this.state.bank)
                && (!this.state.realEstateType)
                && (!this.state.city)
                && (!this.state.district)
                && (!this.state.searchString)
            ) {
                sections.push({ key: 'RealestateListbreadcrumb2', content: I18n.t('label.ALL') });
            } else {
                if (
                    (this.state.realestateStatus !== prevState.realestateStatus)
                    || (this.state.bank !== prevState.bank)
                    || (this.state.realEstateType !== prevState.realEstateType)
                    || (this.state.city !== prevState.city)
                    || (this.state.district !== prevState.district)
                    || (this.state.searchString !== prevState.searchString)
                    || (this.props.districtsVersion !== prevProps.districtsVersion)
                ) {

                    if (this.state.realestateStatus) {
                        sections.push({ key: 'RealestateListbreadcrumb3', content: I18n.t('label.' + this.state.realestateStatus) });
                    }

                    if (this.state.bank && this.props.realestateMetadata.banks) {
                        let bankCode = this.state.bank.toString();
                        var bankObj = this.props.realestateMetadata.banks.find(e => e.code === bankCode);
                        sections.push({ key: 'RealestateListbreadcrumb4', content: bankObj.name });
                    }

                    if (this.state.realEstateType) {
                        sections.push({ key: 'RealestateListbreadcrumb5', content: I18n.t('label.' + this.state.realEstateType) });
                    }

                    if (this.state.city && this.props.cities) {
                        let selectedCity = this.props.cities.find(e => (e && e.code === this.state.city));
                        sections.push({ key: 'RealestateListbreadcrumb6', content: selectedCity ? selectedCity.name : null });
                    }

                    if (this.state.district && this.props.districts && this.state.city) {
                        let selectedDistrict = this.props.districts[this.state.city].find(e => (e && e.code === this.state.district));
                        sections.push({ key: 'RealestateListbreadcrumb7', content: selectedDistrict ? selectedDistrict.name : null });
                    }

                    if (this.state.searchString) {
                        sections.push({ key: 'RealestateListbreadcrumb8', content: I18n.t('label.' + this.state.searchString) });
                    }
                }
            }

            this.props.setPageHeader(sections);
        }
    }

    componentDidMount() {
        this.preparePageHeader(null, null);
        if (this.props.realestateMetadata === null) {
            this.props.getRealestateMetadata();
        }
        if (this.props.cities === null) {
            this.props.getCities();
        }

        this.getRealestates();
    }

    componentDidUpdate(prevProps, prevState) {
        this.preparePageHeader(prevProps, prevState);
        if (this.props.shouldRedirect) {
            this.props.realestateRedirect(false);
            this.getRealestates();
        }
    }



    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    handleDropdownChange(e, result) {
        const { id, value } = result
        this.setState({ [id]: value });
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.getRealestates();
        }
    }

    handleDropdownChangeCity(e, result) {
        this.handleDropdownChange(e, result);
        const { value } = result
        if (!this.props.districts[value]) {
            this.props.getDistricts(value);
        }
    }

    handleDropdownChangeDistrict(e, result) {
        this.handleDropdownChange(e, result);
    }

    clearForm() {
        this.setState({
            realestateStatus: null,
            bank: null,
            realEstateType: null,
            searchString: '',
            city: null,
            district: null
        }, () => {
            this.getRealestates()
        });
    }

    getRealestates() {
        this.props.searchRealestate({
            realEstateStatus: this.state.realestateStatus ? [this.state.realestateStatus] : [],
            bank: this.state.bank,
            realEstateType: this.state.realEstateType,
            searchString: this.state.searchString,
            city: this.state.city,
            district: this.state.district,
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize,
            orderBy: this.state.orderBy,
            orderType: this.state.orderType
        });
    }

    delete(realEstateCode) {
        var realestate = this.props.realestates.find(e => e.code === realEstateCode);
        if (realestate) {
            this.props.showConfirmModal(
                I18n.t('msg.REALESTATE_DELETE_CONFIRM_TITLE'),
                I18n.t('msg.REALESTATE_DELETE_CONFIRM_DESC', { code: realestate.code }),
                null,
                this.props.deleteRealestate,
                [realEstateCode]
            )
        }
    }

    copy(realEstateCode) {
        var realestate = this.props.realestates.find(e => e.code === realEstateCode);
        if (realestate) {
            this.props.showConfirmModal(
                I18n.t('msg.REALESTATE_COPY_CONFIRM_TITLE'),
                I18n.t('msg.REALESTATE_COPY_CONFIRM_DESC', { code: realestate.code }),
                null,
                this.props.copyRealestate,
                [realEstateCode]
            )
        }
    }

    toEditBasic(realEstateCode) {
        var realestate = this.props.realestates.find(e => e.code === realEstateCode);
        if (realestate.realEstateStatus.code === 'DRAFT') {
            this.props.history.push('/admin/realestate/' + realestate.code);
        }
    }


    handlePaginationChange = (e, { activePage }) => {
        if (activePage) {
            this.setState({ pageNo: activePage }, () => {
                this.getRealestates();
            });
        }
    }

    render() {
        let realestateStatus = [];
        let banks = [];
        let realEstateTypes = []

        if (this.props.realestateMetadata) {
            realestateStatus = this.props.realestateMetadata.realEstateStatus.map(item => Object.assign({}, { key: item.code, text: I18n.t('label.' + item.code), value: item.code }));
            realestateStatus.unshift({ key: null, text: I18n.t('label.ALL'), value: null });

            banks = this.props.realestateMetadata.banks.map(item => Object.assign({}, { key: item.code, text: item.name, value: item.code }));
            banks.unshift({ key: null, text: I18n.t('label.ALL'), value: null });

            realEstateTypes = this.props.realestateMetadata.realEstateTypes.map(item => Object.assign({}, { key: item.code, text: I18n.t('label.' + item.code), value: item.code }));
            realEstateTypes.unshift({ key: null, text: I18n.t('label.ALL'), value: null });
        }

        let cities = [];
        if (this.props.cities) {
            cities = this.props.cities.map(city => Object.assign({}, { key: city.code, text: city.name, value: city.code }));
            cities.unshift({ key: null, text: I18n.t('label.ALL'), value: null });
        }

        let districts = [];
        if (this.state.city && this.props.districts && this.props.districtsVersion > 0) {
            if (this.props.districts[this.state.city]) {
                districts = this.props.districts[this.state.city].map(district => Object.assign({}, { key: district.code, text: district.name, value: district.code }));
            }
            districts.unshift({ key: null, text: I18n.t('label.ALL'), value: null });
        }
        const { pageNo, pageSize } = this.state;
        return (
            <div className='admin' >
                <Segment attached padded='very'>
                    <Form size='large'>
                        <Form.Group>
                            <Form.Select
                                onKeyPress={this.onKeyPress}
                                name='realestateStatus'
                                id='realestateStatus'
                                value={this.state.realestateStatus}
                                onChange={this.handleDropdownChange}
                                width={3}
                                fluid
                                placeholder={I18n.t("label.ALL")}
                                label={I18n.t("label.STATUS")}
                                selection
                                options={realestateStatus}
                            />
                            <Form.Select
                                onKeyPress={this.onKeyPress}
                                name='bank'
                                id='bank'
                                value={this.state.bank}
                                onChange={this.handleDropdownChange}
                                width={3}
                                fluid
                                placeholder={I18n.t("label.ALL")}
                                label={I18n.t("label.BANK")}
                                selection
                                options={banks}
                            />
                            <Form.Select
                                onKeyPress={this.onKeyPress}
                                name='realEstateType'
                                id='realEstateType'
                                value={this.state.realEstateType}
                                onChange={this.handleDropdownChange}
                                width={3}
                                fluid
                                placeholder={I18n.t("label.ALL")}
                                label={I18n.t("label.REAL_ESTATE_TYPE")}
                                selection
                                options={realEstateTypes}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Select
                                id='city'
                                name='city'
                                onKeyPress={this.onKeyPress}
                                fluid
                                width={3}
                                options={cities}
                                search
                                placeholder={I18n.t("label.ALL")}
                                label={I18n.t("label.CITY")}
                                value={this.state.city}
                                onChange={this.handleDropdownChangeCity}
                            />
                            <Form.Select
                                id='district'
                                name='district'
                                onKeyPress={this.onKeyPress}
                                fluid
                                width={3}
                                options={districts}
                                search
                                placeholder={I18n.t("label.ALL")}
                                label={I18n.t("label.DISTRICT")}
                                value={this.state.district}
                                onChange={this.handleDropdownChangeDistrict}
                            />
                            <Form.Input
                                onKeyPress={this.onKeyPress}
                                name='searchString'
                                id='searchString'
                                value={this.state.searchString}
                                onChange={this.handleInputChange}
                                width={3}
                                fluid
                                label={I18n.t("label.KEYWORD")} />
                            <Form.Button onClick={() => this.getRealestates()} style={{ marginTop: '22px' }} size='large' width={2} fluid primary type='button' icon='search' content={I18n.t("button.SEARCH")}></Form.Button>
                            <Form.Button onClick={() => this.clearForm()} style={{ marginTop: '22px' }} size='large' width={2} fluid secondary type='button' icon='eraser' content={I18n.t("button.CLEAR")}></Form.Button>
                            <Form.Button onClick={() => this.props.history.push("/admin/realestate")} style={{ marginTop: '22px' }} size='large' width={2} fluid primary basic type='button' icon='add' content={I18n.t("button.NEW_REALESTATE")}></Form.Button>
                        </Form.Group>
                    </Form>

                    {
                        (this.props.realestates && (this.props.realestates.length > 0)) ?
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
                                        {this.props.realestates
                                            .map(realestate => {
                                                return (
                                                    <Table.Row key={realestate.id} warning={realestate.realEstateStatus && realestate.realEstateStatus.code === 'DRAFT'}>
                                                        <Table.Cell singleLine style={{ overflow: 'visible' }}>
                                                            <Dropdown text={I18n.t("label.ACTION_BUTTON")} icon='content' floating labeled button className='icon' style={{ padding: '.58928571em 1.125em .58928571em' }}>
                                                                {
                                                                    (realestate.realEstateStatus && realestate.realEstateStatus.code === 'DRAFT') ?
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item text={I18n.t("label.UPDATE")} onClick={() => this.toEditBasic(realestate.code)} />
                                                                            <Dropdown.Item error text={I18n.t("label.DELETE")} onClick={() => this.delete(realestate.code)} />
                                                                        </Dropdown.Menu>
                                                                        :
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item text={I18n.t("label.REALESTATE_DETAILS")} onClick={() => this.props.history.push("/admin/realestate/" + realestate.code + "/view")} />
                                                                            <Dropdown.Item text={I18n.t("label.ALLBIDS")} onClick={() => this.props.history.push("/admin/realestate/" + realestate.code + "/bids")} />
                                                                            <Dropdown.Item error text={I18n.t("label.DELETE")} onClick={() => this.delete(realestate.code)} />
                                                                            <Dropdown.Item warning text={I18n.t("label.COPY")} onClick={() => this.copy(realestate.code)} />
                                                                        </Dropdown.Menu>
                                                                }
                                                            </Dropdown>
                                                        </Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push("/admin/realestate/" + realestate.code + "/view")}>{realestate.code}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push("/admin/realestate/" + realestate.code + "/view")}>{realestate.bank ? realestate.bank.name : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push("/admin/realestate/" + realestate.code + "/view")}>{(realestate.realEstateType) ? I18n.t("label." + realestate.realEstateType.code) : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push("/admin/realestate/" + realestate.code + "/view")}>{(realestate.realEstateSubType) ? I18n.t("label." + realestate.realEstateSubType.code) : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push("/admin/realestate/" + realestate.code + "/view")}>{realestate.title}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push("/admin/realestate/" + realestate.code + "/view")}>{(realestate.realEstateAddress && realestate.realEstateAddress.city) ? realestate.realEstateAddress.city.name : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push("/admin/realestate/" + realestate.code + "/view")}>{(realestate.realEstateAddress && realestate.realEstateAddress.district) ? realestate.realEstateAddress.district.name : ''}</Table.Cell>
                                                        <Table.Cell onClick={() => this.props.history.push("/admin/realestate/" + realestate.code + "/view")}>{realestate.realEstateStatus ? I18n.t("label." + realestate.realEstateStatus.code) : ''}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                    </Table.Body>
                                </Table>
                                <div align='right'>
                                    <Pagination activePage={pageNo} key='paginationPanel'
                                        onPageChange={this.handlePaginationChange}
                                        totalPages={Math.ceil(this.props.realestateCount / pageSize)}
                                    />
                                </div>
                            </div>
                            :
                            <Message
                                warning
                                content={I18n.t("msg.ACTION_SEARCH_RESULT_EMPTY")}
                            />
                    }

                </Segment >
            </div >

        );
    }
}


const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { realestates, realestateCount, shouldRedirect } = state.realestateReducer;
    const { realestateMetadata } = state.metadataReducer;
    const { cities, districts, districtsVersion } = state.addressReducer;
    return {
        lastResponseId,
        user,
        realestateMetadata,
        cities,
        districts,
        districtsVersion,
        realestates,
        realestateCount,
        shouldRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            getRealestateMetadata,
            showErrorListModal,
            getCities,
            getDistricts,
            searchRealestate,
            showConfirmModal,
            deleteRealestate,
            copyRealestate,
            realestateRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateList);

export { hoc as RealestateList };
