import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { updateSms, metadataRedirect, getSms } from '../../../actions/metadata/Actions';
import SmsUpdateForm from './SmsUpdateForm';

class SmsUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: null,
            route: 1,
            smsInitiated: false
        };
        this.updateSms = this.updateSms.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.metadataRedirect(false);
            this.props.history.push("/admin/sms");
        }

        if (this.props.sms && (this.props.sms.code === this.state.code) && (!this.state.smsInitiated)) {
            this.setState({ smsInitiated: true });
        }
    }

    componentDidMount() {

        let code = null;
        if (this.props.match.params.code) {
            code = this.props.match.params.code.toString();
        }
        if (!code) {
            this.props.history.push("/admin/sms");
        } else {
            this.props.getSms(code);
            this.setState({ code: code });
        }
    }

    updateSms(route, content) {
        this.setState({
            route
        }, () => {
            this.props.updateSms(this.state.code, content);
        });
    }

    render() {
        return (
            <div className='admin' >
                {this.state.smsInitiated ?
                    <SmsUpdateForm key={this.state.code} sms={this.props.sms} history={this.props.history} showErrorListModal={this.props.showErrorListModal} createUpdateAction={this.updateSms} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} />
                    : null
                }
            </div>

        );
    }
}


const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { sms, shouldRedirect } = state.metadataReducer;

    return {
        lastResponseId,
        user,
        sms,
        shouldRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            updateSms,
            getSms,
            metadataRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(SmsUpdate);

export { hoc as SmsUpdate };
