import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { createBank, metadataRedirect } from '../../../actions/metadata/Actions';
import BankCreateUpdateForm from './BankCreateUpdateForm';

class BankCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bankCode: null,
            route: 1
        };
        this.createBank = this.createBank.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect && this.props.bankCreated) {
            this.props.metadataRedirect(false);
            this.props.history.push("/admin/bank/list");
        }
    }


    createBank(route, bank) {
        this.setState({
            route: route
        }, () => {
            this.props.createBank(bank);
        });
    }

    render() {
        return (
            <div className='admin' >
                <BankCreateUpdateForm history={this.props.history} showErrorListModal={this.props.showErrorListModal} createUpdateAction={this.createBank} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} />
            </div>

        );
    }
}


const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { shouldRedirect, bankCreated } = state.metadataReducer;

    return {
        lastResponseId,
        user,
        shouldRedirect,
        bankCreated
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            createBank,
            metadataRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BankCreate);

export { hoc as BankCreate };
