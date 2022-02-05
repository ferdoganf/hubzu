import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';
import { Grid, Button, Table } from 'semantic-ui-react'
import axios from 'axios';
import CookieHelper from '../../../common/CookieHelper';
import { saveAs } from 'file-saver';


class RealestateReportsPanel extends Component {
    constructor(props) {
        super(props);
        this.getAuctionResultReport = this.getAuctionResultReport.bind(this);
        this.getSalesContract = this.getSalesContract.bind(this);
        this.getBankContract = this.getBankContract.bind(this);
    }

    getAuctionResultReport() {

        const request = {
            url: "/rest/secure/report/realestate/" + this.props.realestate.code + "/auctionresultreport",
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
                saveAs(new Blob([response.data]), this.props.realestate.code + "_AuctionResultReport.pdf");
            },
            (error) => {
            }
        );
    }

    getSalesContract() {
        this.props.showLoading();
        let thisRef = this;
        const request = {
            url: "/rest/secure/metadata/contracts/sales/" + this.props.realestate.code + "/pdf",
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
                saveAs(new Blob([response.data]), "Satış_Sözleşmesi.pdf");
                thisRef.props.hideLoading();
            },
            (error) => {
                thisRef.props.hideLoading();
            }
        );
    }

    getBankContract() {
        this.props.showLoading();
        let thisRef = this;
        const request = {
            url: "/rest/secure/metadata/contracts/" + this.props.realestate.bank.code + "/" + this.props.realestate.code + "/pdf",
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
                saveAs(new Blob([response.data]), this.props.realestate.bank.code + "_Banka_Sözleşmesi.pdf");
                thisRef.props.hideLoading();
            },
            (error) => {
                thisRef.props.hideLoading();
            }
        );
    }

    render() {
        return (
            <Table celled striped color='orange'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2' textAlign="center" style={{ padding: '0.4em', verticalAlign: 'bottom' }}>
                            <Grid padded stackable columns={3}>
                                <Grid.Column floated='left' textAlign='left'>
                                </Grid.Column>
                                <Grid.Column textAlign='center' style={{ padding: '6px 0px 0px 0px' }}>
                                    {I18n.t("label.REPORTS_AND_FORMS")}
                                </Grid.Column>
                                <Grid.Column floated='right' textAlign='right' style={{ padding: '0px 0px 0px 0px' }}>
                                </Grid.Column>
                            </Grid>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.AUCTION_RESULT_REPORT")}</Table.Cell>
                        <Table.Cell>
                            <Button style={{ float: 'left', width: '80px' }} size='small' onClick={() => this.getAuctionResultReport()} secondary basic type='button' icon='download' content={I18n.t("button.DOWNLOAD")}></Button>
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.SALES_CONTRACT")}</Table.Cell>
                        <Table.Cell>
                            <Button style={{ float: 'left', width: '80px' }} size='small' onClick={() => this.getSalesContract()} secondary basic type='button' icon='download' content={I18n.t("button.DOWNLOAD")}></Button>
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.BANK_CONTRACT")}</Table.Cell>
                        <Table.Cell>
                            <Button style={{ float: 'left', width: '80px' }} size='small' onClick={() => this.getBankContract()} secondary basic type='button' icon='download' content={I18n.t("button.DOWNLOAD")}></Button>
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell collapsing style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{I18n.t("label.BID_EVALUATION_REPORT")}</Table.Cell>
                        <Table.Cell>
                            <Button style={{ float: 'left', width: '80px' }} size='small' onClick={() => this.props.history.push('/admin/realestate/' + this.props.realestate.code + '/bidevaluationreport')} secondary basic type='button' icon='folder open' content={I18n.t("button.OPEN")}></Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table >
        );
    }
}

export default RealestateReportsPanel;