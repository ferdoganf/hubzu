import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { updateBank, metadataRedirect, getBank } from '../../../actions/metadata/Actions';
import BankCreateUpdateForm from './BankCreateUpdateForm';

class BankUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bankCode: null,
            route: 1
        };
        this.updateBank = this.updateBank.bind(this);
    }

    componentDidMount() {
        let code = null;
        if (this.props.match.params.code) {
            code = this.props.match.params.code.toString();
            if (code) {
                this.setState({ bankCode: code });
            }
        }
        if (!code) {
            this.props.history.push("/admin/bank/list");
        } else {
            this.props.getBank(code);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.metadataRedirect(false);
            this.props.history.push("/admin/bank/list");
        }
    }

    updateBank(route, bank) {
        this.setState({
            route
        }, () => {
            this.props.updateBank(this.state.bankCode, bank);
        });
    }

    render() {
        return (
            <div className='admin' >
                {this.props.bankCreated ?
                    <BankCreateUpdateForm key={this.props.bankCreated.code} bankCreated={this.props.bankCreated} history={this.props.history} showErrorListModal={this.props.showErrorListModal} createUpdateAction={this.updateBank} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} />
                    : null
                }
            </div>

        );
    }
}


const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { bankCreated, shouldRedirect } = state.metadataReducer;

    return {
        lastResponseId,
        user,
        bankCreated,
        shouldRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            updateBank,
            getBank,
            metadataRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BankUpdate);

export { hoc as BankUpdate };
