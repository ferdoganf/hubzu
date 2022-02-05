import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { Segment, Grid, Button, Table } from 'semantic-ui-react'
import { getRealestate } from '../../../actions/realestate/Actions';
import { getBidsOfRealestate } from '../../../actions/bid/Actions';
import { I18n } from 'react-redux-i18n';
import moment from 'moment'
import NumberFormat from 'react-number-format';

class RealestateBids extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null
        };
    }

    preparePageHeader(prevProps, prevState) {
        if (this.props.realestateCreated) {
            if (
                prevProps == null || prevState == null ||
                (this.props.lastResponseId !== prevProps.lastResponseId) ||
                (!prevProps.realestateCreated) ||
                (!prevProps.realestateCreated.realEstateAddress) ||
                (!prevProps.realestateCreated.realEstateAddress.city) ||
                (!prevProps.realestateCreated.realEstateAddress.district) ||
                (this.props.realestateCreated.code !== prevProps.realestateCreated.code) ||
                (this.props.realestateCreated.bank !== prevProps.realestateCreated.bank) ||
                (this.props.realestateCreated.realEstateType !== prevProps.realestateCreated.realEstateType) ||
                (this.props.realestateCreated.realEstateSubType !== prevProps.realestateCreated.realEstateSubType) ||
                ((this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.city && (this.props.realestateCreated.realEstateAddress.city.code !== prevProps.realestateCreated.realEstateAddress.city.code))) ||
                ((this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.district && (this.props.realestateCreated.realEstateAddress.district.code !== prevProps.realestateCreated.realEstateAddress.district.code)))
            ) {
                let sections = [];
                sections.push({ key: 'RUPbreadcrumb1', content: I18n.t('menu.REALESTATE'), link: true, active: true });
                sections.push({ key: 'RUPbreadcrumb2', content: this.props.realestateCreated.code });

                if (this.props.realestateCreated.bank) {
                    sections.push({ key: 'RUPbreadcrumb3', content: this.props.realestateCreated.bank.name });
                }

                if (this.props.realestateCreated && this.props.realestateCreated.realEstateType) {
                    sections.push({ key: 'RUPbreadcrumb4', content: I18n.t('label.' + this.props.realestateCreated.realEstateType.code) });
                }

                if (this.props.realestateCreated && this.props.realestateCreated.realEstateSubType) {
                    sections.push({ key: 'RUPbreadcrumb5', content: I18n.t('label.' + this.props.realestateCreated.realEstateSubType.code) });
                }

                if (this.props.realestateCreated && this.props.realestateCreated && this.props.realestateCreated.realEstateAddress.city) {
                    sections.push({ key: 'RUPbreadcrumb6', content: this.props.realestateCreated.realEstateAddress.city.name });
                }

                if (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.district) {
                    sections.push({ key: 'RUPbreadcrumb7', content: this.props.realestateCreated.realEstateAddress.district.name });
                }
                this.props.setPageHeader(sections);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.preparePageHeader(prevProps, prevState);
    }

    componentDidMount() {
        this.preparePageHeader(null, null);
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
            this.props.getBidsOfRealestate(code);
        }
    }

    back() {
        this.props.history.push('/admin/realestate/' + this.state.realestateCode + '/view');
    }

    render() {
        return (
            <div className='admin' >
                {this.state.realestateCode && this.props.realestateCreated ?
                    <Segment attached padded='very'>
                        {
                            this.props.realestateCreated ?
                                <Table sortable striped selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>
                                                {I18n.t("label.DATE")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.BID_AMOUNT")}
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
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            this.props.realestateBids ?
                                                this.props.realestateBids
                                                    .map(realestateBid => {
                                                        return (
                                                            <Table.Row key={realestateBid.id}>
                                                                <Table.Cell>
                                                                    {moment.utc(realestateBid.createdDate).format('YYYY-MM-DD HH:mm')}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <NumberFormat value={realestateBid.bidAmount} displayType={'text'} thousandSeparator='.' decimalSeparator=',' prefix={'₺'} />
                                                                </Table.Cell>
                                                                <Table.Cell>{realestateBid.buyer.identityNumber}</Table.Cell>
                                                                <Table.Cell>{realestateBid.buyer.name}</Table.Cell>
                                                                <Table.Cell>{realestateBid.buyer.surname}</Table.Cell>
                                                                <Table.Cell>{realestateBid.buyer.emailAddress}</Table.Cell>
                                                                <Table.Cell>{realestateBid.buyer.phone}</Table.Cell>
                                                                <Table.Cell>{realestateBid.buyer.userStatus ? I18n.t("label.USER_STATUS_" + realestateBid.buyer.userStatus.code) : ''}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    })
                                                : null
                                        }
                                    </Table.Body>
                                </Table>
                                :
                                null
                        }
                        <Grid padded stackable columns={3}>
                            <Grid.Column floated='left' textAlign='left'>
                                <Button onClick={() => this.back()} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.PREVIOUS_STEP")}></Button>
                            </Grid.Column>
                            <Grid.Column textAlign='center'>
                            </Grid.Column>
                            <Grid.Column floated='right' textAlign='right'>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { realestateCreated } = state.realestateReducer;
    const { realestateBids } = state.bidReducer;
    return {
        lastResponseId,
        user,
        realestateCreated,
        realestateBids
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            getRealestate,
            getBidsOfRealestate
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateBids);

export { hoc as RealestateBids };
