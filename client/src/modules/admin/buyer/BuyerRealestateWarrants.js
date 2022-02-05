import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showConfirmModal } from '../../../actions/page/Actions';
import { getWarrantedRealestatesOfBuyer, buyerRedirect, updateRealEstateWarrantsOfBuyer, getBuyer } from '../../../actions/buyer/Actions';
import BuyerRealestateWarrantsForm from './BuyerRealestateWarrantsForm'
import { I18n } from 'react-redux-i18n';
import BuyerCreateUpdateStep from './BuyerCreateUpdateStep'
import { searchRealestate } from '../../../actions/realestate/Actions';


class BuyerRealestateWarrants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buyerCode: null,
            route: 1
        };
        this.updateRealEstateWarrantsOfBuyer = this.updateRealEstateWarrantsOfBuyer.bind(this);
    }

    preparePageHeader(prevProps, prevState) {
        if (
            prevProps == null || prevState == null ||
            (this.props.lastResponseId !== prevProps.lastResponseId) ||
            (this.props.buyerCreated && this.props.buyerCreated.code !== prevProps.buyerCreated.code)
        ) {
            let sections = [];
            sections.push({ key: 'BCUFbreadcrumb1', content: I18n.t('menu.BUYER'), link: true, active: true });

            if (this.props.buyerCreated && this.props.buyerCreated.identityNumber) {
                sections.push({ key: 'BCUFbreadcrumb2', content: this.props.buyerCreated.identityNumber });
            }
            if (this.props.buyerCreated && this.props.buyerCreated.name) {
                sections.push({ key: 'BCUFbreadcrumb3', content: this.props.buyerCreated.name });
            }

            if (this.props.buyerCreated && this.props.buyerCreated.surname) {
                sections.push({ key: 'BCUFbreadcrumb4', content: this.props.buyerCreated.surname });
            }

            if (this.props.buyerCreated && this.props.buyerCreated.emailAddress) {
                sections.push({ key: 'BCUFbreadcrumb5', content: this.props.buyerCreated.emailAddress });
            }

            this.props.setPageHeader(sections);
        }
    }

    componentDidMount() {
        let code = null;
        if (this.props.match.params.code) {
            code = this.props.match.params.code.toString();
            if (code) {
                this.setState({ buyerCode: code });
            }
        }
        if (!code) {
            this.props.history.push("/admin/buyer/list");
        } else {
            this.props.searchRealestate({
                realEstateStatus: ['PASSIVE', 'ACTIVE', 'STARTED'],
                pageNo: 1,
                pageSize: 10000,
                orderBy: 'code',
                orderType: 'ASC'
            });
            this.props.getWarrantedRealestatesOfBuyer(code);
            this.props.getBuyer(code);
        }
        this.preparePageHeader();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.buyerRedirect(false);

            if (this.state.route === 1) {
                this.props.history.push('/admin/buyer/' + this.state.buyerCode + '/status');
            } else {
                this.props.history.push("/admin/buyer/list");
            }

        } else {
            this.preparePageHeader(prevProps, prevState);
        }
    }

    updateRealEstateWarrantsOfBuyer(route, realestates) {
        this.setState({
            route
        }, () => {
            if (this.props.buyerCreated) {
                this.props.showConfirmModal(
                    I18n.t('msg.BUYER_WARRANTED_REALESTATES_UPDATE_CONFIRM_TITLE'),
                    I18n.t('msg.BUYER_WARRANTED_REALESTATES_UPDATE_CONFIRM_DESC', { statusName: I18n.t("label." + this.props.buyerCreated.code) }),
                    null,
                    this.props.updateRealEstateWarrantsOfBuyer,
                    [this.props.buyerCreated.code, realestates]
                )
            }
        });
    }

    render() {
        return (
            <div className='admin' >
                <BuyerCreateUpdateStep step='realestatewarrants' />
                {this.state.buyerCode && this.props.realestates && this.props.warrantedRealestates ?
                    <BuyerRealestateWarrantsForm
                        key={this.props.buyerCode + '_' + this.props.warrantedRealestates.join('_')}
                        history={this.props.history}
                        showErrorListModal={this.props.showErrorListModal}
                        updateRealEstateWarrantsOfBuyer={this.updateRealEstateWarrantsOfBuyer}
                        lastResponseId={this.props.lastResponseId}
                        setPageHeader={this.props.setPageHeader}
                        realestates={this.props.realestates}
                        warrantedRealestates={this.props.warrantedRealestates}
                        buyerCode={this.state.buyerCode}
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
    const { realestates, realestateCount } = state.realestateReducer;
    const { warrantedRealestates, shouldRedirect, buyerCreated } = state.buyerReducer;
    return {
        lastResponseId,
        user,
        shouldRedirect,
        realestates,
        realestateCount,
        warrantedRealestates,
        buyerCreated
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showConfirmModal,
            buyerRedirect,
            updateRealEstateWarrantsOfBuyer,
            searchRealestate,
            getWarrantedRealestatesOfBuyer,
            getBuyer
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BuyerRealestateWarrants);

export { hoc as BuyerRealestateWarrants };
