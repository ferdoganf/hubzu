import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Icon, Step } from 'semantic-ui-react'

class BuyerCreateUpdateStep extends React.Component {
    render() {
        return (
            <Step.Group attached='top' widths={5}>
                <Step active={this.props.step === 'basic'}>
                    <Icon name='user' />
                    <Step.Content>
                        <Step.Title>{I18n.t("label.BASIC")}</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={this.props.step === 'password'} >
                    <Icon name='key' />
                    <Step.Content>
                        <Step.Title>{I18n.t("label.PASSWORD")}</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={this.props.step === 'realestatewarrants'}>
                    <Icon name='clipboard check' />
                    <Step.Content>
                        <Step.Title>{I18n.t("label.REALESTATE_WARRANTS")}</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={this.props.step === 'status'}>
                    <Icon name='toggle on' />
                    <Step.Content>
                        <Step.Title>{I18n.t("label.STATUS")}</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
        );
    }
}

export default BuyerCreateUpdateStep;
