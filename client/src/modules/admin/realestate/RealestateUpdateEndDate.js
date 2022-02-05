import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showConfirmModal } from '../../../actions/page/Actions';
import { getRealestate, realestateRedirect, updateRealestateEndDate } from '../../../actions/realestate/Actions';
import RealestateUpdateEndDateForm from './RealestateUpdateEndDateForm'
import { I18n } from 'react-redux-i18n';

class RealestateUpdateEndDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null
        };
        this.updateRealestateEndDate = this.updateRealestateEndDate.bind(this);
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


    updateRealestateEndDate(endDate) {
        if (this.props.realestateCreated && this.props.realestateCreated.endDate) {
            if (endDate !== this.props.realestateCreated.realEstateStatus.endDate) {
                this.props.showConfirmModal(
                    I18n.t('msg.REALESTATE_ENDDATE_UPDATE_CONFIRM_TITLE'),
                    I18n.t('msg.REALESTATE_ENDDATE_UPDATE_CONFIRM_DESC'),
                    null,
                    this.props.updateRealestateEndDate,
                    [this.props.realestateCreated.code, endDate]
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
                    <RealestateUpdateEndDateForm
                        key={this.props.realestateCreated.id}
                        realestateCreated={this.props.realestateCreated}
                        history={this.props.history} showErrorListModal={this.props.showErrorListModal}
                        updateRealestateEndDate={this.updateRealestateEndDate}
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
            updateRealestateEndDate
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateUpdateEndDate);

export { hoc as RealestateUpdateEndDate };
