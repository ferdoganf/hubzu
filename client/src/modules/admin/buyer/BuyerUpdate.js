import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import BuyerCreateUpdateStep from './BuyerCreateUpdateStep'
import { showErrorListModal } from '../../../actions/page/Actions';
import { updateBuyer, buyerRedirect, getBuyer } from '../../../actions/buyer/Actions';
import BuyerCreateUpdateForm from './BuyerCreateUpdateForm';

class BuyerUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buyerCode: null,
            route: 1
        };
        this.updateBuyer = this.updateBuyer.bind(this);
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
            this.props.getBuyer(code);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.buyerRedirect(false);
            if (this.state.route === 1) {
                this.props.history.push('/admin/buyer/' + this.state.buyerCode + '/password');
            } else {
                this.props.history.push("/admin/buyer/list");
            }
        }
    }

    updateBuyer(route, buyer) {
        this.setState({
            route
        }, () => {
            this.props.updateBuyer(this.state.buyerCode, buyer);
        });
    }

    render() {
        return (
            <div className='admin' >
                <BuyerCreateUpdateStep step='basic' />
                {this.props.buyerCreated ?
                    <BuyerCreateUpdateForm key={this.props.buyerCreated.code} buyerCreated={this.props.buyerCreated} history={this.props.history} showErrorListModal={this.props.showErrorListModal} createUpdateAction={this.updateBuyer} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} />
                    : null
                }
            </div>

        );
    }
}


const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { buyerCreated, shouldRedirect } = state.buyerReducer;

    return {
        lastResponseId,
        user,
        buyerCreated,
        shouldRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            updateBuyer,
            getBuyer,
            buyerRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BuyerUpdate);

export { hoc as BuyerUpdate };
