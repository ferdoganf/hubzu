import React, { Component } from 'react';
import { Segment, Grid, Button, Checkbox, Table } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';

export default class BuyerRealestateWarrantsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRealestates: this.props.warrantedRealestates ? this.props.warrantedRealestates.map(realestate => realestate.code) : []
        };
    }

    submit(route) {
        this.props.updateRealEstateWarrantsOfBuyer(route, { realestates: this.state.selectedRealestates });
    }

    handleSelect = (code) => {
        let selectedRealestates = this.state.selectedRealestates;
        if (selectedRealestates) {
            if (selectedRealestates.includes(code)) {
                selectedRealestates = selectedRealestates.filter(e => e !== code)
            } else {
                selectedRealestates.push(code)
            }
        } else {
            selectedRealestates = [code];
        }
        this.setState({ selectedRealestates });
    }

    render() {
        return (
            <Segment attached padded='very'>
                {
                    (this.props.realestates && (this.props.realestates.length > 0)) ?
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
                                            <Table.Row key={realestate.id}>
                                                <Table.Cell singleLine style={{ overflow: 'visible' }}>
                                                    <Checkbox
                                                        checked={this.state.selectedRealestates ? this.state.selectedRealestates.includes(realestate.code) : false}
                                                        onChange={() => this.handleSelect(realestate.code)}
                                                    />
                                                </Table.Cell>
                                                <Table.Cell onClick={() => this.props.history.push("/admin/realestate/" + realestate.code + "/view")}>{realestate.code}</Table.Cell>
                                                <Table.Cell>{realestate.bank ? realestate.bank.name : ''}</Table.Cell>
                                                <Table.Cell>{(realestate.realEstateType) ? I18n.t("label." + realestate.realEstateType.code) : ''}</Table.Cell>
                                                <Table.Cell>{(realestate.realEstateSubType) ? I18n.t("label." + realestate.realEstateSubType.code) : ''}</Table.Cell>
                                                <Table.Cell>{realestate.title}</Table.Cell>
                                                <Table.Cell>{(realestate.realEstateAddress && realestate.realEstateAddress.city) ? realestate.realEstateAddress.city.name : ''}</Table.Cell>
                                                <Table.Cell>{(realestate.realEstateAddress && realestate.realEstateAddress.district) ? realestate.realEstateAddress.district.name : ''}</Table.Cell>
                                                <Table.Cell>{realestate.realEstateStatus ? I18n.t("label." + realestate.realEstateStatus.code) : ''}</Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                            </Table.Body>
                        </Table>
                        : null
                }
                <Grid padded stackable columns={3}>
                    <Grid.Column floated='left' textAlign='left' width={4}>
                        <Button onClick={() => this.props.history.push('/admin/buyer/' + this.props.buyerCode + '/password')} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.PREVIOUS_STEP")}></Button>
                    </Grid.Column>
                    <Grid.Column textAlign='center' width={4}>
                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right' width={8}>
                        <Button onClick={() => this.props.history.push("/admin/buyer/" + this.props.buyerCode + "/status")} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.SKIP")}></Button>
                        <Button onClick={() => this.submit(-1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_EXIT")}></Button>
                        <Button onClick={() => this.submit(1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_CONTINUE")}></Button>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}