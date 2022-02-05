import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { updateRealestateSubType, metadataRedirect, getRealestateSubType } from '../../../actions/metadata/Actions';
import RealestateSubTypeCreateUpdateForm from './RealestateSubTypeCreateUpdateForm';
import { getRealestateMetadata } from '../../../actions/metadata/Actions';

class RealestateSubTypeUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realestateTypeCode: null,
            realestateSubTypeCode: null,
            route: 1
        };
        this.updateRealestateSubType = this.updateRealestateSubType.bind(this);
    }

    componentDidMount() {
        let realestateTypeCode = null;
        let realestateSubTypeCode = null;

        if (this.props.match.params.realestateTypeCode) {
            realestateTypeCode = this.props.match.params.realestateTypeCode.toString();
            if (realestateTypeCode) {
                this.setState({ realestateTypeCode: realestateTypeCode });
            }
        }

        if (this.props.match.params.realestateSubTypeCode) {
            realestateSubTypeCode = this.props.match.params.realestateSubTypeCode.toString();
            if (realestateSubTypeCode) {
                this.setState({ realestateSubTypeCode: realestateSubTypeCode });
            }
        }
        if (!realestateTypeCode || !realestateSubTypeCode) {
            this.props.history.push("/admin/data/realestatesubtype/list");
        } else {
            this.props.getRealestateSubType(realestateTypeCode, realestateSubTypeCode);
        }

        if (this.props.realestateMetadata === null) {
            this.props.getRealestateMetadata();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect && this.props.realestateSubTypeCreated) {
            this.props.metadataRedirect(false);
            this.props.history.push("/admin/data/realestatesubtype/list");
        }
    }

    updateRealestateSubType(route, realEstateSubType) {
        this.setState({
            route
        }, () => {
            this.props.updateRealestateSubType(this.state.realestateTypeCode, this.state.realestateSubTypeCode, realEstateSubType);
        });
    }

    render() {
        return (
            <div className='admin' >
                {this.props.realestateSubTypeCreated ?
                    <RealestateSubTypeCreateUpdateForm key={this.props.realestateSubTypeCreated.code} realestateMetadata={this.props.realestateMetadata} realestateSubTypeCreated={this.props.realestateSubTypeCreated} history={this.props.history} showErrorListModal={this.props.showErrorListModal} createUpdateAction={this.updateRealestateSubType} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} />
                    : null
                }
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
            updateRealestateSubType,
            getRealestateSubType,
            metadataRedirect,
            getRealestateMetadata
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateSubTypeUpdate);

export { hoc as RealestateSubTypeUpdate };
