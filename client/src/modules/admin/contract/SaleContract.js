import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { updateContract, metadataRedirect, getContract } from '../../../actions/metadata/Actions';
import ContractUpdateForm from './ContractUpdateForm';
import { I18n } from 'react-redux-i18n';

class SaleContract extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: 'sales',
            route: 1,
            contractInitiated: false
        };
        this.updateContract = this.updateContract.bind(this);
    }

    componentDidMount() {
        this.props.getContract(this.state.code);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.metadataRedirect(false);
            this.props.history.push("/admin/contract/sale");
        }

        if (this.props.contract && (this.props.contract.code === this.state.code) && (!this.state.contractInitiated)) {
            this.setState({ contractInitiated: true });
        }
    }

    updateContract(route, content) {
        this.setState({
            route
        }, () => {
            this.props.updateContract(this.state.code, content);
        });
    }

    render() {
        return (
            <div className='admin' >
                { this.state.contractInitiated ?
                    <ContractUpdateForm key={this.state.code} contract={this.props.contract} history={this.props.history} showErrorListModal={this.props.showErrorListModal} createUpdateAction={this.updateContract} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} contractName={I18n.t('menu.SALESCONTRACT')} />
                    : null
                }
            </div>

        );
    }
}


const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { contract, shouldRedirect } = state.metadataReducer;

    return {
        lastResponseId,
        user,
        contract,
        shouldRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            updateContract,
            getContract,
            metadataRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(SaleContract);

export { hoc as SaleContract };
