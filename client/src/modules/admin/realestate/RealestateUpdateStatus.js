import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showConfirmModal } from '../../../actions/page/Actions';
import { getRealestate, realestateRedirect, updateRealestateStatus } from '../../../actions/realestate/Actions';
import RealestateUpdateStatusForm from './RealestateUpdateStatusForm'
import { I18n } from 'react-redux-i18n';

class RealestateUpdateStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null
        };
        this.updateRealestateStatus = this.updateRealestateStatus.bind(this);
    }


    componentDidMount() {
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
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.realestateRedirect(false);
            this.props.history.push('/admin/realestate/' + this.state.realestateCode + '/view');
        }
    }


    updateRealestateStatus(status) {
        if (this.props.realestateCreated && this.props.realestateCreated.realEstateStatus) {
            if (status !== this.props.realestateCreated.realEstateStatus.code) {
                this.props.showConfirmModal(
                    I18n.t('msg.REALESTATE_STATUS_UPDATE_CONFIRM_TITLE'),
                    I18n.t('msg.REALESTATE_STATUS_UPDATE_CONFIRM_DESC', { statusName: I18n.t("label." + this.props.realestateCreated.realEstateStatus.code) }),
                    null,
                    this.props.updateRealestateStatus,
                    [this.props.realestateCreated.code, status]
                )
            } else {
                this.props.history.push('/admin/realestate/' + this.state.realestateCode + '/view');
            }
        }
    }

    render() {
        return (
            <div className='admin' >
                {this.state.realestateCode && this.props.realestateCreated ?
                    <RealestateUpdateStatusForm
                        key={this.props.realestateCreated.id}
                        realestateCreated={this.props.realestateCreated}
                        history={this.props.history} showErrorListModal={this.props.showErrorListModal}
                        updateRealestateStatus={this.updateRealestateStatus}
                        lastResponseId={this.props.lastResponseId}
                        setPageHeader={this.props.setPageHeader}
                    />
                    : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { realestateCreated, shouldRedirect } = state.realestateReducer;

    return {
        lastResponseId,
        user,
        realestateCreated,
        shouldRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showConfirmModal,
            getRealestate,
            realestateRedirect,
            updateRealestateStatus
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateUpdateStatus);

export { hoc as RealestateUpdateStatus };
