import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { Segment, Grid, Button, Table, Form, Header } from 'semantic-ui-react'
import { getRealestate } from '../../../actions/realestate/Actions';
import { getDirectBidsOfRealestate, createDirectBid } from '../../../actions/bid/Actions';
import { I18n } from 'react-redux-i18n';
import moment from 'moment'
import NumberFormat from 'react-number-format';
import axios from 'axios';
import CookieHelper from '../../../common/CookieHelper';
import { saveAs } from 'file-saver';

class BidEvaluationReportList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null,

            identityNumber: '',
            name: '',
            surname: '',
            emailAddress: '',
            phoneCountryCode: '90',
            phone: '',
            bidAmount: 0,
            description: '',
            formErrorList: [],
            fieldErrors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    clearForm() {
        this.setState({
            identityNumber: '',
            name: '',
            surname: '',
            emailAddress: '',
            phoneCountryCode: '90',
            phone: '',
            bidAmount: 0,
            description: '',
            formErrorList: [],
            fieldErrors: {}
        });
    }

    addBid() {
        this.props.createDirectBid({
            bid: { realestateCode: this.state.realestateCode, bidAmount: this.state.bidAmount },
            buyer: {
                identityNumber: this.state.identityNumber,
                name: this.state.name,
                surname: this.state.surname,
                emailAddress: this.state.emailAddress,
                phoneCountryCode: this.state.phoneCountryCode,
                phone: this.state.phone
            },
            description: this.state.description
        });
        this.clearForm();
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
                sections.push({ key: 'RUPbreadcrumb1', content: I18n.t('menu.BID_EVALUATION_REPORT'), link: true, active: true });
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
            this.props.getDirectBidsOfRealestate(code);
        }
    }

    back() {
        this.props.history.push('/admin/realestate/' + this.state.realestateCode + '/view');
    }

    getBidEvaluationReport(bidId) {
        const request = {
            url: "/rest/secure/report/realestate/" + this.state.realestateCode + "/directbid/" + bidId + "/evaluationreport",
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + CookieHelper.getAccessToken()
            },
            responseType: 'blob'

        };
        const newRequest = Object.assign({}, request);
        newRequest.withCredentials = true;
        axios(newRequest).then(
            (response) => {
                saveAs(new Blob([response.data]), this.state.realestateCode + '_' + bidId + "_EvaluationReport.pdf");
            },
            (error) => {
            }
        );
    }

    render() {
        return (
            <div className='admin' >
                {this.state.realestateCode && this.props.realestateCreated ?
                    <Segment attached padded='very'>
                        <Form>

                            <Grid columns={3}>
                                <Grid.Row>
                                    <Grid.Column width={5}>
                                        <div>
                                            <Header as='h5' dividing>{I18n.t("label.IDENTITY_NUMBER")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                            <Form.Group inline className={this.state.fieldErrors.identityNumber ? 'ui field error nonbordered' : 'nonbordered'}>
                                                <NumberFormat style={{ width: '100%' }} id='identityNumber' placeholder={I18n.t("label.IDENTITY_NUMBER")}
                                                    onValueChange={(values) => {
                                                        const { value } = values;
                                                        this.setState({ identityNumber: value });
                                                    }} value={this.state.identityNumber} format="###########" isNumericString={true} thousandSeparator={false} decimalScale={0} allowNegative={false} />

                                            </Form.Group>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <div>
                                            <Header as='h5' dividing>{I18n.t("label.NAME")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                            <Form.Group inline className='nonbordered'>
                                                <Form.Input style={{ width: '100%' }} id='name' value={this.state.name} fluid placeholder={I18n.t("label.NAME")} onChange={this.handleInputChange} error={this.state.fieldErrors.name} />
                                            </Form.Group>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <div>
                                            <Header as='h5' dividing>{I18n.t("label.SURNAME")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                            <Form.Group inline className='nonbordered'>
                                                <Form.Input style={{ width: '100%' }} id='surname' value={this.state.surname} fluid placeholder={I18n.t("label.SURNAME")} onChange={this.handleInputChange} error={this.state.fieldErrors.surname} />
                                            </Form.Group>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={5}>
                                        <div>
                                            <Header as='h5' dividing>{I18n.t("label.EMAIL_ADDRESS")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                            <Form.Group inline className='nonbordered'>
                                                <Form.Input style={{ width: '100%' }} id='emailAddress' value={this.state.emailAddress} fluid placeholder={I18n.t("label.EMAIL_ADDRESS")} onChange={this.handleInputChange} error={this.state.fieldErrors.emailAddress} />
                                            </Form.Group>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <div>
                                            <Header as='h5' dividing>{I18n.t("label.PHONE_NUMBER")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                            <Form.Group inline className={this.state.fieldErrors.phone ? 'ui field error nonbordered' : 'nonbordered'}>
                                                <NumberFormat style={{ width: '100%' }} id='phone' placeholder={I18n.t("label.PHONE_NUMBER")}
                                                    onValueChange={(values) => {
                                                        const { value } = values;
                                                        this.setState({ phone: value });
                                                    }} value={this.state.phone} format="0 ### ### ### ### ###" isNumericString={true} thousandSeparator={false} decimalScale={0} allowNegative={false} />
                                            </Form.Group>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <div>
                                            <Header as='h5' dividing>{I18n.t("label.BID_AMOUNT")}<span style={{ color: '#DB2828' }}>*</span></Header>
                                            <NumberFormat style={{ width: '100%' }} id='bidAmount' placeholder={I18n.t("label.BID_AMOUNT")}
                                                onValueChange={(values) => {
                                                    const { floatValue } = values;
                                                    this.setState({ bidAmount: floatValue });
                                                }} value={this.state.bidAmount} thousandSeparator={true} prefix={'₺'} decimalScale={0} />
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={10}>
                                        <div>
                                            <Header as='h5' dividing>{I18n.t("label.DESCRIPTION")}</Header>
                                            <Form.Group inline className='nonbordered'>
                                                <Form.TextArea id='description' value={this.state.description} rows={2} placeholder={I18n.t("label.DESCRIPTION")} onChange={this.handleInputChange} error={this.state.fieldErrors.description} />
                                            </Form.Group>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Form.Group>
                                            <Form.Button style={{ width: '160px', marginTop: '30px' }} onClick={() => this.clearForm()} size='large' secondary type='button' icon='eraser' content={I18n.t("button.CLEAR")}></Form.Button>
                                            <Form.Button style={{ width: '160px', marginTop: '30px' }} onClick={() => this.addBid()} size='large' primary basic type='button' icon='add' content={I18n.t("button.ADD_BID")}></Form.Button>
                                        </Form.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
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
                                                {I18n.t("label.BID_EVALUATION_REPORT")}
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
                                                                <Table.Cell><Button style={{ float: 'left', width: '80px' }} size='small' onClick={() => this.getBidEvaluationReport(realestateBid.id)} secondary basic type='button' icon='download' content={I18n.t("button.DOWNLOAD")}></Button></Table.Cell>
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
            getDirectBidsOfRealestate,
            createDirectBid
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BidEvaluationReportList);

export { hoc as BidEvaluationReportList };
