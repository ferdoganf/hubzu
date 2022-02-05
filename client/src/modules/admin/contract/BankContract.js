import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { updateContract, metadataRedirect, getContract, getBank } from '../../../actions/metadata/Actions';
import ContractUpdateForm from './ContractUpdateForm';

class BankContract extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: null,
            route: 1,
            contractInitiated: false
        };
        this.updateContract = this.updateContract.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.metadataRedirect(false);
            this.props.history.push("/admin/bank/list");
        }

        if (this.props.contract && this.props.bankCreated && (this.props.contract.code === this.state.code) && (this.props.bankCreated.code === this.state.code) && (!this.state.contractInitiated)) {
            this.setState({ contractInitiated: true });
        }
    }

    componentDidMount() {

        let code = null;
        if (this.props.match.params.code) {
            code = this.props.match.params.code.toString();
        }
        if (!code) {
            this.props.history.push("/admin/bank/list");
        } else {
            this.props.getContract(code);
            this.props.getBank(code);
            this.setState({ code: code });
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
                    <ContractUpdateForm key={this.state.code} contract={this.props.contract} history={this.props.history} showErrorListModal={this.props.showErrorListModal} createUpdateAction={this.updateContract} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} contractName={this.props.bankCreated ? this.props.bankCreated.name : null} />
                    : null
                }
            </div>

        );
    }
}


const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { contract, shouldRedirect, bankCreated } = state.metadataReducer;

    return {
        lastResponseId,
        user,
        contract,
        bankCreated,
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
            getBank,
            metadataRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BankContract);

export { hoc as BankContract };
