import React, { Component } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';
import DateTimeUtils from './../../common/DateTimeUtils';
import moment from 'moment'

class CountdownClock extends Component {
    render() {
        let dateTimeDiff = null
        if (this.props.realestate) {
            if (this.props.realestate.realEstateStatus && this.props.realestate.realEstateStatus.code === 'STARTED') {
                dateTimeDiff = DateTimeUtils.diffBetweenDateTimes(moment.utc(this.props.realestate.endDate), moment.utc(this.props.systemDate));
            }
        }
        return (
            <Grid align='center'>
                <Grid.Row>
                    <Grid.Column width={3}><Icon name='clock outline' size='huge' /></Grid.Column>
                    <Grid.Column width={2} style={{ paddingTop: '6px' }}>
                        <Header
                            as='h2'
                            content={dateTimeDiff.days}
                            subheader={I18n.t('label.DAYS')}
                        />

                    </Grid.Column>
                    <Grid.Column width={1} style={{ paddingTop: '6px' }}>
                        <Header
                            as='h2'
                            content=':'
                        />
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingTop: '6px' }}>
                        <Header
                            as='h2'
                            content={dateTimeDiff.hours}
                            subheader={I18n.t('label.HOURS')}
                        />
                    </Grid.Column>
                    <Grid.Column width={1} style={{ paddingTop: '6px' }}>
                        <Header
                            as='h2'
                            content=':'
                        />
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingTop: '6px' }}>
                        <Header
                            as='h2'
                            content={dateTimeDiff.minutes}
                            subheader={I18n.t('label.MINUTES')}
                        />
                    </Grid.Column>
                    <Grid.Column width={1} style={{ paddingTop: '6px' }}>
                        <Header
                            as='h2'
                            content=':'
                        />
                    </Grid.Column>
                    <Grid.Column width={2} style={{ paddingTop: '6px' }}>
                        <Header
                            as='h2'
                            content={dateTimeDiff.seconds}
                            subheader={I18n.t('label.SECONDS')}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        );
    }
}
export default CountdownClock;