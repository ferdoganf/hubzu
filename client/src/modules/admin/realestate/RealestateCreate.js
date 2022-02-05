import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import RealestateCreateUpdateStep from './RealestateCreateUpdateStep'
import { showErrorListModal } from '../../../actions/page/Actions';
import { createRealestate, realestateRedirect } from '../../../actions/realestate/Actions';
import { getRealestateMetadata, getBank } from '../../../actions/metadata/Actions';
import RealestateCreateUpdateForm from './RealestateCreateUpdateForm';

class RealestateCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null,
            route: 1
        };
        this.createRealEstate = this.createRealEstate.bind(this);
    }

    componentDidMount() {
        if (this.props.realestateMetadata === null) {
            this.props.getRealestateMetadata();
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


    createRealEstate(route, realestate) {
        this.setState({
            route: route,
            realestateCode: realestate.code
        }, () => {
            this.props.createRealestate(realestate);
        });
    }

    render() {
        return (
            <div className='admin' >
                <RealestateCreateUpdateStep step='basic' />
                <RealestateCreateUpdateForm getBank={this.props.getBank} bankCreated={this.props.bankCreated} realestateMetadata={this.props.realestateMetadata} history={this.props.history} showErrorListModal={this.props.showErrorListModal} createUpdateAction={this.createRealEstate} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} />
            </div>

        );
    }
}


const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { shouldRedirect } = state.realestateReducer;
    const { realestateMetadata, bankCreated } = state.metadataReducer;

    return {
        lastResponseId,
        user,
        realestateMetadata,
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
            createRealestate,
            realestateRedirect,
            getBank
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateCreate);

export { hoc as RealestateCreate };
