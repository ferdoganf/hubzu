import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { createRealestateSubType, metadataRedirect } from '../../../actions/metadata/Actions';
import RealestateSubTypeCreateUpdateForm from './RealestateSubTypeCreateUpdateForm';
import { getRealestateMetadata } from '../../../actions/metadata/Actions';

class RealestateSubTypeCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            route: 1
        };
        this.createRealestateSubType = this.createRealestateSubType.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect && this.props.realestateSubTypeCreated) {
            this.props.metadataRedirect(false);
            this.props.history.push("/admin/data/realestatesubtype/list");
        }
    }

    componentDidMount() {
        if (this.props.realestateMetadata === null) {
            this.props.getRealestateMetadata();
        }
    }

    createRealestateSubType(route, realEstateSubType) {
        this.setState({
            route: route
        }, () => {
            this.props.createRealestateSubType(realEstateSubType);
        });
    }

    render() {
        return (
            <div className='admin' >
                <RealestateSubTypeCreateUpdateForm history={this.props.history} realestateMetadata={this.props.realestateMetadata} showErrorListModal={this.props.showErrorListModal} createUpdateAction={this.createRealestateSubType} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} />
            </div>

        );
    }
}


const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { shouldRedirect, realestateMetadata, realestateSubTypeCreated } = state.metadataReducer;
    return {
        lastResponseId,
        user,
        shouldRedirect,
        realestateSubTypeCreated,
        realestateMetadata
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            createRealestateSubType,
            metadataRedirect,
            getRealestateMetadata
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateSubTypeCreate);

export { hoc as RealestateSubTypeCreate };
