import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import RealestateCreateUpdateStep from './RealestateCreateUpdateStep';
import RealestateUpdateDetailsForm from './RealestateUpdateDetailsForm';
import { showErrorListModal } from '../../../actions/page/Actions';
import { getRealestate, updateRealestateDetails, realestateRedirect } from '../../../actions/realestate/Actions';
import { getRealestateMetadata } from '../../../actions/metadata/Actions';

class RealestateUpdateDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null,
            route: 1
        };
        this.updateRealestateDetails = this.updateRealestateDetails.bind(this);
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
            this.props.history.push("/admin/realestate/create");
        } else {
            this.props.getRealestate(code);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.shouldRedirect) {
            this.props.realestateRedirect(false);
            if (this.state.route === 1) {
                this.props.history.push('/admin/realestate/' + this.state.realestateCode + '/address');
            } else {
                this.props.history.push("/admin/realestate/list");

            }
        }
    }

    updateRealestateDetails(route, realestate) {
        this.setState({
            route
        }, () => {
            this.props.updateRealestateDetails(this.props.realestateCreated.code, this.props.realestateCreated.realEstateType.code, realestate);
        });
    }

    render() {
        return (
            <div className='admin' >
                <RealestateCreateUpdateStep step='details' />
                {this.state.realestateCode && this.props.realestateCreated && this.props.realestateMetadata && (this.state.realestateCode === this.props.realestateCreated.code) ?
                    <RealestateUpdateDetailsForm key={this.props.realestateCreated.id} realestateCreated={this.props.realestateCreated} realestateMetadata={this.props.realestateMetadata} history={this.props.history} showErrorListModal={this.props.showErrorListModal} updateRealEstate={this.updateRealestateDetails} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader} />
                    : null
                }
            </div>
        );
    }
}


const mapStateToProps = state => {
    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { realestateCreated, shouldRedirect } = state.realestateReducer;
    const { realestateMetadata } = state.metadataReducer;
    return {
        lastResponseId,
        user,
        realestateMetadata,
        realestateCreated,
        shouldRedirect
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            getRealestateMetadata,
            showErrorListModal,
            updateRealestateDetails,
            getRealestate,
            realestateRedirect
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateUpdateDetails);

export { hoc as RealestateUpdateDetails };
