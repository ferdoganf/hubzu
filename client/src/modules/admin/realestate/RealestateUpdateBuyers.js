import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showConfirmModal } from '../../../actions/page/Actions';
import { getRealestate } from '../../../actions/realestate/Actions';
import { searchBuyer, getWarrantedBuyersOfRealestate, buyerRedirect, updateWarrantedBuyersOfRealestate } from '../../../actions/buyer/Actions';
import RealestateUpdateBuyersForm from './RealestateUpdateBuyersForm'
import { I18n } from 'react-redux-i18n';

class RealestateUpdateBuyers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null
        };
        this.updateWarrantedBuyersOfRealestate = this.updateWarrantedBuyersOfRealestate.bind(this);
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
            this.props.searchBuyer({
                searchString: null,
                pageNo: 1,
                pageSize: 10000,
                orderBy: 'name',
                orderType: 'ASC'
            });
            this.props.getWarrantedBuyersOfRealestate(code);
            this.props.getRealestate(code);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.buyerRedirect(false);
            this.props.history.push('/admin/realestate/' + this.state.realestateCode + '/view');
        }
    }


    updateWarrantedBuyersOfRealestate(buyers) {
        if (this.props.realestateCreated) {
            this.props.showConfirmModal(
                I18n.t('msg.REALESTATE_WARRANTED_BUYERS_UPDATE_CONFIRM_TITLE'),
                I18n.t('msg.REALESTATE_WARRANTED_BUYERS_UPDATE_CONFIRM_DESC', { statusName: I18n.t("label." + this.props.realestateCreated.realEstateStatus.code) }),
                null,
                this.props.updateWarrantedBuyersOfRealestate,
                [this.props.realestateCreated.code, buyers]
            )
        }
    }

    render() {
        return (
            <div className='admin' >
                {this.state.realestateCode && this.props.realestateCreated && this.props.buyers && this.props.warrantedBuyers ?
                    <RealestateUpdateBuyersForm
                        key={this.props.realestateCreated.id + '_' + this.props.warrantedBuyers.join('_')}
                        realestateCreated={this.props.realestateCreated}
                        history={this.props.history} showErrorListModal={this.props.showErrorListModal}
                        updateWarrantedBuyersOfRealestate={this.updateWarrantedBuyersOfRealestate}
                        lastResponseId={this.props.lastResponseId}
                        setPageHeader={this.props.setPageHeader}
                        allBuyers={this.props.buyers}
                        warrantedBuyers={this.props.warrantedBuyers}
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
    const { realestateCreated } = state.realestateReducer;
    const { buyers, buyerCount, warrantedBuyers, shouldRedirect } = state.buyerReducer;
    return {
        lastResponseId,
        user,
        realestateCreated,
        shouldRedirect,
        buyers,
        buyerCount,
        warrantedBuyers
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showConfirmModal,
            getRealestate,
            buyerRedirect,
            updateWarrantedBuyersOfRealestate,
            searchBuyer,
            getWarrantedBuyersOfRealestate
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateUpdateBuyers);

export { hoc as RealestateUpdateBuyers };
