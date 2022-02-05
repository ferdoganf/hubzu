import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import RealestateCreateUpdateStep from './RealestateCreateUpdateStep'
import { showErrorListModal } from '../../../actions/page/Actions';
import { updateRealestate, realestateRedirect, getRealestate } from '../../../actions/realestate/Actions';
import { getRealestateMetadata, getBank } from '../../../actions/metadata/Actions';
import RealestateCreateUpdateForm from './RealestateCreateUpdateForm';

class RealestateUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null,
            route: 1
        };
        this.updateRealestate = this.updateRealestate.bind(this);
    }

    componentDidMount() {
        if (this.props.realestateMetadata === null) {
            this.props.getRealestateMetadata();
        }
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
            if (this.state.route === 1) {
                this.props.history.push('/admin/realestate/' + this.state.realestateCode + '/details');
            } else {
                this.props.history.push("/admin/realestate/list");
            }
        }
    }

    updateRealestate(route, realestate) {
        let oldRealEstateCode = this.state.realestateCode;
        this.setState({
            route: route,
            realestateCode: realestate.code
        }, () => {
            this.props.updateRealestate(oldRealEstateCode, realestate);
        });
    }

    render() {
        return (
            <div className='admin' >
                <RealestateCreateUpdateStep step='basic' />
                {this.state.realestateCode && this.props.realestateCreated && this.props.realestateMetadata && (this.state.realestateCode === this.props.realestateCreated.code) ?
                    <RealestateCreateUpdateForm getBank={this.props.getBank} bankCreated={this.props.bankCreated} key={this.props.realestateCreated.id} realestateCreated={this.props.realestateCreated} realestateMetadata={this.props.realestateMetadata} history={this.props.history} showErrorListModal={this.props.showErrorListModal} createUpdateAction={this.updateRealestate} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} />
                    : null
                }
            </div>

        );
    }
}


const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { realestateMetadata, bankCreated } = state.metadataReducer;
    const { realestateCreated, shouldRedirect } = state.realestateReducer;

    return {
        lastResponseId,
        user,
        realestateMetadata,
        realestateCreated,
        shouldRedirect,
        bankCreated
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            getRealestateMetadata,
            showErrorListModal,
            updateRealestate,
            getRealestate,
            realestateRedirect,
            getBank
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateUpdate);

export { hoc as RealestateUpdate };
