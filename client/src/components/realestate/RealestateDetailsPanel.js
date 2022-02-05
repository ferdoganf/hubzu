import React from "react";
import { I18n } from 'react-redux-i18n';
import { Grid, Header, Icon, Segment, Button } from 'semantic-ui-react'
import ResidentialRealestateDetailsListTable from './ResidentialRealestateDetailsListTable';
import CommercialRealestateDetailsListTable from './CommercialRealestateDetailsListTable';
import LandRealestateDetailsListTable from './LandRealestateDetailsListTable';
import MiniImageSlider from '../../components/image/MiniImageSlider';
import GoogleMapContainer from '../../components/maps/GoogleMapContainer';

export default class RealestateDetailsPanel extends React.Component {

    toEditBasic() {
        if (this.props.realestate.realEstateStatus.code === 'PASSIVE' || this.props.realestate.realEstateStatus.code === 'DRAFT') {
            this.props.history.push('/admin/realestate/' + this.props.realestate.code);
        } else {
            this.props.showErrorModal(I18n.t("validation.REALESTATE_STATUS_NOT_VALID_FOR_UPDATE"));
        }
    }

    toEditDetail() {
        if (this.props.realestate.realEstateStatus.code === 'PASSIVE' || this.props.realestate.realEstateStatus.code === 'DRAFT') {
            this.props.history.push('/admin/realestate/' + this.props.realestate.code + '/details');
        } else {
            this.props.showErrorModal(I18n.t("validation.REALESTATE_STATUS_NOT_VALID_FOR_UPDATE"));
        }
    }

    toEditPhotos() {
        if (this.props.realestate.realEstateStatus.code === 'PASSIVE' || this.props.realestate.realEstateStatus.code === 'DRAFT') {
            this.props.history.push('/admin/realestate/' + this.props.realestate.code + '/photo');
        } else {
            this.props.showErrorModal(I18n.t("validation.REALESTATE_STATUS_NOT_VALID_FOR_UPDATE"));
        }
    }

    toEditAddress() {
        if (this.props.realestate.realEstateStatus.code === 'PASSIVE' || this.props.realestate.realEstateStatus.code === 'DRAFT') {
            this.props.history.push('/admin/realestate/' + this.props.realestate.code + '/address');
        } else {
            this.props.showErrorModal(I18n.t("validation.REALESTATE_STATUS_NOT_VALID_FOR_UPDATE"));
        }
    }

    render() {
        let address = [];
        if (this.props.realestate) {
            if (this.props.realestate.realEstateAddress.city) {
                address.push(this.props.realestate.realEstateAddress.city.name);
            }
            if (this.props.realestate.realEstateAddress.district) {
                address.push(this.props.realestate.realEstateAddress.district.name);
            }

            if (this.props.realestate.realEstateAddress.neighborhood) {
                address.push(this.props.realestate.realEstateAddress.neighborhood.name);
            }
            if (this.props.realestate.realEstateAddress.addressText) {
                address.push(this.props.realestate.realEstateAddress.addressText);
            }
        }

        return (
            <Grid>
                {this.props.editable ?
                    <Grid.Row style={{ paddingBottom: '0em' }}>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Button style={{ float: 'right' }} size='small' onClick={() => this.toEditBasic()} primary basic type='button' icon='edit' content={I18n.t("button.UPDATE")}></Button>
                        </Grid.Column>
                    </Grid.Row>
                    : null
                }
                <Grid.Row >
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <Segment>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column mobile={16} tablet={16} computer={16}>
                                        <Header size='small'>
                                            <Header.Content>{this.props.realestate.title}</Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row >
                                    <Grid.Column mobile={16} tablet={16} computer={16}>
                                        <Header size='tiny'>
                                            <Icon name='barcode' />
                                            <Header.Content>{this.props.realestate.code}</Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row >
                                    <Grid.Column mobile={16} tablet={16} computer={16}>
                                        <Header size='tiny'>
                                            <Icon name='tags' />
                                            <Header.Content>{I18n.t('label.' + this.props.realestate.realEstateType.code)} - {this.props.realestate.realEstateSubType ? (this.props.realestate.realEstateSubType.forcedName ? this.props.realestate.realEstateSubType.forcedName : I18n.t('label.' + this.props.realestate.realEstateSubType.code)) : ''}</Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row >
                                    <Grid.Column mobile={16} tablet={16} computer={16}>
                                        <Header size='tiny'>
                                            <Icon name='map marker alternate' />
                                            <Header.Content>
                                                {address.join(', ')}
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                {
                                    this.props.realestate.realEstateAddress && this.props.realestate.realEstateAddress.parcelSearchUrl ?
                                        <Grid.Row >
                                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                                <Header size='tiny'>
                                                    <Icon name='map outline' />
                                                    <Header.Content>
                                                        <Button basic style={{ padding: "0.7em", fontWeight: 'bold' }} size='tiny'>
                                                            <a target="_blank" rel="noopener noreferrer" href={this.props.realestate.realEstateAddress.parcelSearchUrl} >Parsel Sorgula</a>
                                                        </Button>
                                                    </Header.Content>
                                                </Header>
                                            </Grid.Column>
                                        </Grid.Row>
                                        : null
                                }

                                <Grid.Row>
                                    <Grid.Column width={16}>{this.props.realestate.description}</Grid.Column>
                                </Grid.Row>
                                <Grid.Row >
                                    <Grid.Column mobile={16} tablet={16} computer={16}>
                                        <Header size='tiny'>
                                            <Header.Content>
                                                <img src={"/assets/banks/" + this.props.realestate.bank.code + ".jpg"} alt={this.props.realestate.bank.code} width="32%" />
                                            </Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                {this.props.editable ?
                    <Grid.Row style={{ paddingBottom: '0em' }}>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Button style={{ float: 'right' }} size='small' onClick={() => this.toEditDetail()} primary basic type='button' icon='edit' content={I18n.t("button.UPDATE")}></Button>
                        </Grid.Column>
                    </Grid.Row>
                    : null
                }
                <Grid.Row >
                    <Grid.Column mobile={16} tablet={16} computer={16}>

                        {(this.props.realestate.realEstateType.code === 'RESIDENTIAL') ?
                            <ResidentialRealestateDetailsListTable realestate={this.props.realestate} />
                            : (this.props.realestate.realEstateType.code === 'COMMERCIAL') ?
                                <CommercialRealestateDetailsListTable realestate={this.props.realestate} />
                                :
                                (this.props.realestate.realEstateType.code === 'LAND') ?
                                    <LandRealestateDetailsListTable realestate={this.props.realestate} />
                                    : null
                        }
                    </Grid.Column>
                </Grid.Row>
                {this.props.editable && this.props.realestate.photos ?
                    <Grid.Row style={{ paddingBottom: '0em' }}>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Button style={{ float: 'right' }} size='small' onClick={() => this.toEditPhotos()} primary basic type='button' icon='edit' content={I18n.t("button.UPDATE")}></Button>
                        </Grid.Column>
                    </Grid.Row>
                    : null
                }
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <MiniImageSlider images={this.props.realestate.photos ? this.props.realestate.photos : null}></MiniImageSlider>
                    </Grid.Column>
                </Grid.Row>
                {this.props.editable && this.props.realestate.realEstateAddress ?
                    <Grid.Row style={{ paddingBottom: '0em' }}>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Button style={{ float: 'right' }} size='small' onClick={() => this.toEditAddress()} primary basic type='button' icon='edit' content={I18n.t("button.UPDATE")}></Button>
                        </Grid.Column>
                    </Grid.Row>
                    : null
                }
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        {
                            (this.props.realestate.realEstateAddress && this.props.realestate.realEstateAddress.latitude && this.props.realestate.realEstateAddress.longitude) ?
                                <GoogleMapContainer
                                    latInitial={this.props.realestate.realEstateAddress.latitude ? this.props.realestate.realEstateAddress.latitude : 41.015137}
                                    lngInitial={this.props.realestate.realEstateAddress.longitude ? this.props.realestate.realEstateAddress.longitude : 28.979530}
                                    lat={this.props.realestate.realEstateAddress.latitude ? this.props.realestate.realEstateAddress.latitude : 41.015137}
                                    lng={this.props.realestate.realEstateAddress.longitude ? this.props.realestate.realEstateAddress.longitude : 28.979530} />
                                : null
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}