import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../../actions/page/Actions';
import RealestateCreateUpdateStep from './RealestateCreateUpdateStep'
import { showErrorListModal } from '../../../actions/page/Actions';
import { getRealestate, realestateRedirect, updateAddress } from '../../../actions/realestate/Actions';
import { getCities, getDistricts, getNeighborhoods } from '../../../actions/address/Actions';
import RealestateUpdateAddressForm from './RealestateUpdateAddressForm'

class RealestateUpdateAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null,
            route: null
        };
        this.updateAddress = this.updateAddress.bind(this);
    }


    componentDidMount() {
        if (this.props.cities === null) {
            this.props.getCities();
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
                this.props.history.push('/admin/realestate/' + this.state.realestateCode + '/photo');
            } else {
                this.props.history.push("/admin/realestate/list");

            }
        }
    }

    updateAddress(route, addressRequest) {
        this.setState({
            route
        }, () => {
            this.props.updateAddress(this.props.realestateCreated.code, addressRequest);
        });
    }

    render() {
        return (
            <div className='admin' >
                <RealestateCreateUpdateStep step='address' />
                {this.state.realestateCode && this.props.realestateCreated && this.props.cities && (this.state.realestateCode === this.props.realestateCreated.code) ?
                    <RealestateUpdateAddressForm key={this.props.realestateCreated.id} realestateCreated={this.props.realestateCreated} realestateMetadata={this.props.realestateMetadata} history={this.props.history} showErrorListModal={this.props.showErrorListModal} updateAddress={this.updateAddress} lastResponseId={this.props.lastResponseId} setPageHeader={this.props.setPageHeader}
                        cities={this.props.cities}
                        districts={this.props.districts}
                        districtsVersion={this.props.districtsVersion}
                        neighborhoods={this.props.neighborhoods}
                        neighborhoodsVersion={this.props.neighborhoodsVersion}
                        getDistricts={this.props.getDistricts}
                        getNeighborhoods={this.props.getNeighborhoods}
                    />
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
    const { cities, districts, districtsVersion, neighborhoods, neighborhoodsVersion } = state.addressReducer;

    return {
        lastResponseId,
        user,
        realestateCreated,
        shouldRedirect,
        cities,
        districts,
        districtsVersion,
        neighborhoods,
        neighborhoodsVersion
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            getRealestate,
            realestateRedirect,
            getCities,
            getDistricts,
            getNeighborhoods,
            updateAddress
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateUpdateAddress);

export { hoc as RealestateUpdateAddress };
