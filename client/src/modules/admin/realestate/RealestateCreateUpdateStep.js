import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Icon, Step } from 'semantic-ui-react'

class RealestateCreateUpdateStep extends React.Component {
    render() {
        return (
            <Step.Group attached='top' widths={5}>
                <Step active={this.props.step === 'basic'}>
                    <Icon name='th large' />
                    <Step.Content>
                        <Step.Title>{I18n.t("label.BASIC")}</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={this.props.step === 'details'} >
                    <Icon name='th' />
                    <Step.Content>
                        <Step.Title>{I18n.t("label.DETAIL")}</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={this.props.step === 'address'}>
                    <Icon name='map marker alternate' />
                    <Step.Content>
                        <Step.Title>{I18n.t("label.ADDRESS")}</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={this.props.step === 'photo'}>
                    <Icon name='photo' />
                    <Step.Content>
                        <Step.Title>{I18n.t("label.PHOTO")}</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={this.props.step === 'publishing'}>
                    <Icon name='video play' />
                    <Step.Content>
                        <Step.Title>{I18n.t("label.PUBLISHING")}</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
        );
    }
}

export default RealestateCreateUpdateStep;
