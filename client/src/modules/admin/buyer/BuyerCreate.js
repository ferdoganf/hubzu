import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { createBuyer, buyerRedirect } from '../../../actions/buyer/Actions';
import BuyerCreateUpdateForm from './BuyerCreateUpdateForm';
import BuyerCreateUpdateStep from './BuyerCreateUpdateStep';

class BuyerCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buyerCode: null,
            route: 1
        };
        this.createBuyer = this.createBuyer.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect && this.props.buyerCreated) {
            this.props.buyerRedirect(false);
            if (this.state.route === 1) {
                this.props.history.push('/admin/buyer/' + this.props.buyerCreated.code + '/password');
            } else {
                this.props.history.push("/admin/buyer/list");
            }
        }
    }


    createBuyer(route, buyer) {
        this.setState({
            route: route
        }, () => {
            this.props.createBuyer(buyer);
        });
    }

    render() {
        return (
            <div className='admin' >
                <BuyerCreateUpdateStep step='basic' />
                <BuyerCreateUpdateForm history={this.props.history} showErrorListModal={this.props.showErrorListModal} createUpdateAction={this.createBuyer} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} />
            </div>

        );
    }
}


const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { shouldRedirect, buyerCreated } = state.buyerReducer;

    return {
        lastResponseId,
        user,
        shouldRedirect,
        buyerCreated
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            createBuyer,
            buyerRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BuyerCreate);

export { hoc as BuyerCreate };
