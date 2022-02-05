import React, { Component } from 'react';
import { Segment, Grid, Button, Table, Checkbox } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';

export default class RealestateUpdateBuyersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBuyers: this.props.warrantedBuyers ? this.props.warrantedBuyers.map(buyer => buyer.code) : [],
        };
    }
    handleSelect = (code) => {
        let selectedBuyers = this.state.selectedBuyers;
        if (selectedBuyers) {
            if (selectedBuyers.includes(code)) {
                selectedBuyers = selectedBuyers.filter(e => e !== code)
            } else {
                selectedBuyers.push(code)
            }
        } else {
            selectedBuyers = [code];
        }
        this.setState({ selectedBuyers });
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

    componentDidMount() {
        this.preparePageHeader();
    }

    componentDidUpdate(prevProps, prevState) {
        this.preparePageHeader(prevProps, prevState);
    }

    back() {
        this.props.history.push('/admin/realestate/' + this.props.realestateCreated.code + '/view');
    }


    submit() {
        this.props.updateWarrantedBuyersOfRealestate({ buyers: this.state.selectedBuyers });
    }

    render() {
        return (
            <Segment attached padded='very'>
                {
                    (this.props.realestateCreated && this.props.allBuyers && (this.props.allBuyers.length > 0)) ?
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
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.props.allBuyers
                                    .map(buyer => {
                                        return (
                                            <Table.Row key={buyer.code}>
                                                <Table.Cell singleLine style={{ overflow: 'visible' }}>
                                                    <Checkbox
                                                        checked={this.state.selectedBuyers ? this.state.selectedBuyers.includes(buyer.code) : false}
                                                        onChange={() => this.handleSelect(buyer.code)}
                                                    />
                                                </Table.Cell>
                                                <Table.Cell>{buyer.identityNumber}</Table.Cell>
                                                <Table.Cell>{buyer.name}</Table.Cell>
                                                <Table.Cell>{buyer.surname}</Table.Cell>
                                                <Table.Cell>{buyer.emailAddress}</Table.Cell>
                                                <Table.Cell>{buyer.phone}</Table.Cell>
                                                <Table.Cell>{buyer.userStatus ? I18n.t("label.USER_STATUS_" + buyer.userStatus.code) : ''}</Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
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
                        <Button onClick={() => this.submit()} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE")}></Button>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}