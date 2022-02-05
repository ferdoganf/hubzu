import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { Segment, Form, Table, Dropdown } from 'semantic-ui-react'
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { getRealestateMetadata, deleteRealestateSubType } from '../../../actions/metadata/Actions';
import { showConfirmModal } from '../../../actions/page/Actions';

class RealestateSubTypeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realEstateType: null
        };
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.delete = this.delete.bind(this);
    }

    preparePageHeader(prevProps, prevState) {
        if (
            prevProps == null || prevState == null
        ) {
            let sections = [];
            sections.push({ key: 'BCUFbreadcrumb1', content: I18n.t('menu.DATA'), link: true, active: true });
            sections.push({ key: 'BCUFbreadcrumb2', content: I18n.t('menu.REALESTATESUBTYPES') });
            this.props.setPageHeader(sections);
        }
    }

    componentDidMount() {
        this.preparePageHeader();
        this.props.getRealestateMetadata();
    }


    handleDropdownChange(e, result) {
        const { id, value } = result
        this.setState({ [id]: value });
    }

    delete(realestateTypeCode, realestateSubTypeCode) {
        this.props.showConfirmModal(
            I18n.t('msg.REALESTATESUBTYPE_DELETE_CONFIRM_TITLE'),
            I18n.t('msg.REALESTATESUBTYPE_DELETE_CONFIRM_DESC', { realestateTypeCode: I18n.t('label.' + realestateTypeCode), realestateSubTypeCode: realestateSubTypeCode }),
            null,
            this.props.deleteRealestateSubType,
            [realestateTypeCode, realestateSubTypeCode]
        )
    }

    render() {
        let realEstateTypes = []
        if (this.props.realestateMetadata) {
            realEstateTypes = this.props.realestateMetadata.realEstateTypes.map(item => Object.assign({}, { key: item.code, text: I18n.t('label.' + item.code), value: item.code }));
            realEstateTypes.unshift({ key: null, text: I18n.t('label.ALL'), value: null });
        }
        return (
            <div className='admin'>
                <Segment attached padded='very'>
                    <Form size='large'>
                        <Form.Group>
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
                            <Form.Button onClick={() => this.props.history.push("/admin/data/realestatesubtype")} style={{ marginTop: '22px' }} size='large' width={2} fluid primary basic type='button' icon='add' content={I18n.t("button.NEW_REAL_ESTATE_SUB_TYPE")}></Form.Button>
                        </Form.Group>
                    </Form>
                    <div>
                        <Table sortable striped selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        {I18n.t("label.REALESTATE_TYPE")}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        {I18n.t("label.REAL_ESTATE_SUB_TYPE_CODE")}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        {I18n.t("label.REAL_ESTATE_SUB_TYPE_NAME")}
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {
                                <Table.Body>
                                    {
                                        ((this.state.realEstateType === null || this.state.realEstateType === "RESIDENTIAL") && this.props.realestateMetadata && this.props.realestateMetadata.residentialTypes && (this.props.realestateMetadata.residentialTypes.length > 0)) ?
                                            this.props.realestateMetadata.residentialTypes
                                                .map(realEstateSubType => {
                                                    return (
                                                        <Table.Row key={realEstateSubType.code}>
                                                            <Table.Cell singleLine style={{ overflow: 'visible' }}>
                                                                <Dropdown text={I18n.t("label.ACTION_BUTTON")} icon='content' floating labeled button className='icon' style={{ padding: '.58928571em 1.125em .58928571em' }}>
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item text={I18n.t("label.UPDATE")} onClick={() => this.props.history.push("/admin/data/realestatesubtype/RESIDENTIAL/" + realEstateSubType.code)} />
                                                                        <Dropdown.Item error text={I18n.t("label.DELETE")} onClick={() => this.delete("RESIDENTIAL", realEstateSubType.code)} />
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </Table.Cell>
                                                            <Table.Cell>{I18n.t('label.RESIDENTIAL')}</Table.Cell>
                                                            <Table.Cell>{realEstateSubType.code}</Table.Cell>
                                                            <Table.Cell>{realEstateSubType.forcedName ? realEstateSubType.forcedName : I18n.t('label.' + realEstateSubType.code)}</Table.Cell>
                                                        </Table.Row>
                                                    );
                                                })
                                            : null
                                    }
                                    {
                                        ((this.state.realEstateType === null || this.state.realEstateType === "COMMERCIAL") && this.props.realestateMetadata && this.props.realestateMetadata.commercialTypes && (this.props.realestateMetadata.commercialTypes.length > 0)) ?
                                            this.props.realestateMetadata.commercialTypes
                                                .map(realEstateSubType => {
                                                    return (
                                                        <Table.Row key={realEstateSubType.code}>
                                                            <Table.Cell singleLine style={{ overflow: 'visible' }}>
                                                                <Dropdown text={I18n.t("label.ACTION_BUTTON")} icon='content' floating labeled button className='icon' style={{ padding: '.58928571em 1.125em .58928571em' }}>
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item text={I18n.t("label.UPDATE")} onClick={() => this.props.history.push("/admin/data/realestatesubtype/COMMERCIAL/" + realEstateSubType.code)} />
                                                                        <Dropdown.Item error text={I18n.t("label.DELETE")} onClick={() => this.delete("COMMERCIAL", realEstateSubType.code)} />
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </Table.Cell>
                                                            <Table.Cell>{I18n.t('label.COMMERCIAL')}</Table.Cell>
                                                            <Table.Cell>{realEstateSubType.code}</Table.Cell>
                                                            <Table.Cell>{realEstateSubType.forcedName ? realEstateSubType.forcedName : I18n.t('label.' + realEstateSubType.code)}</Table.Cell>
                                                        </Table.Row>
                                                    );
                                                })
                                            : null
                                    }
                                    {
                                        ((this.state.realEstateType === null || this.state.realEstateType === "LAND") && this.props.realestateMetadata && this.props.realestateMetadata.landTypes && (this.props.realestateMetadata.landTypes.length > 0)) ?
                                            this.props.realestateMetadata.landTypes
                                                .map(realEstateSubType => {
                                                    return (
                                                        <Table.Row key={realEstateSubType.code}>
                                                            <Table.Cell singleLine style={{ overflow: 'visible' }}>
                                                                <Dropdown text={I18n.t("label.ACTION_BUTTON")} icon='content' floating labeled button className='icon' style={{ padding: '.58928571em 1.125em .58928571em' }}>
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item text={I18n.t("label.UPDATE")} onClick={() => this.props.history.push("/admin/data/realestatesubtype/LAND/" + realEstateSubType.code)} />
                                                                        <Dropdown.Item error text={I18n.t("label.DELETE")} onClick={() => this.delete("LAND", realEstateSubType.code)} />
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </Table.Cell>
                                                            <Table.Cell>{I18n.t('label.LAND')}</Table.Cell>
                                                            <Table.Cell>{realEstateSubType.code}</Table.Cell>
                                                            <Table.Cell>{realEstateSubType.forcedName ? realEstateSubType.forcedName : I18n.t('label.' + realEstateSubType.code)}</Table.Cell>
                                                        </Table.Row>
                                                    );
                                                })
                                            : null
                                    }
                                </Table.Body>
                            }
                        </Table>
                    </div>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { realestateMetadata } = state.metadataReducer;
    return {
        lastResponseId,
        user,
        realestateMetadata
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            getRealestateMetadata,
            showConfirmModal,
            deleteRealestateSubType
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateSubTypeList);

export { hoc as RealestateSubTypeList };
