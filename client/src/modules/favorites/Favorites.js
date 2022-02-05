import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRealestateMetadata, getSystemDate, getSelectedBank, getAllBanks } from '../../actions/metadata/Actions';
import { showErrorListModal, setPageHeader, showErrorModal } from '../../actions/page/Actions';
import { getCities, getDistricts } from '../../actions/address/Actions';
import { searchRealestatePublic } from '../../actions/realestate/Actions';
import RealestatePublicSearchPanel from '../../components/realestate/RealestatePublicSearchPanel';
import { addToFavorites, removeFromFavorites, getFavoritesOfUser } from '../../actions/user/Actions';
import { I18n } from 'react-redux-i18n';

class Favorites extends Component {
	componentDidMount() {
		this.props.setPageHeader([I18n.t('menu.MY_FAVORITES')]);
	}
	render() {
		return (
			<div className='home' >
				<RealestatePublicSearchPanel
					getRealestateMetadata={this.props.getRealestateMetadata}
					getCities={this.props.getRealestateMetadata}
					getDistricts={this.props.getDistricts}
					searchRealestatePublic={this.props.searchRealestatePublic}
					getSystemDate={this.props.getSystemDate}
					realestateMetadata={this.props.realestateMetadata}
					cities={this.props.cities}
					districts={this.props.districts}
					districtsVersion={this.props.districtsVersion}
					realestates={this.props.realestates}
					realestateCount={this.props.realestateCount}
					systemDate={this.props.systemDate}
					user={this.props.user}
					addToFavorites={this.props.addToFavorites}
					removeFromFavorites={this.props.removeFromFavorites}
					userFavorites={this.props.userFavorites}
					getFavoritesOfUser={this.props.getFavoritesOfUser}
					showErrorModal={this.props.showErrorModal}
					history={this.props.history}
					favoritesFilter={true}
					selectedBank={this.props.selectedBank}
					getSelectedBank={this.props.getSelectedBank}
					activeMenuItem={this.props.activeMenuItem}
					getAllBanks={this.props.getAllBanks}
					banks={this.props.banks}
				></RealestatePublicSearchPanel>
			</div >
		);
	}
}


const mapStateToProps = state => {
	const { lastResponseId } = state.pageReducer;
	const { user } = state.sessionReducer;
	const { realestates, realestateCount } = state.realestateReducer;
	const { realestateMetadata, systemDate, selectedBank, banks } = state.metadataReducer;
	const { cities, districts, districtsVersion } = state.addressReducer;
	const { userFavorites } = state.userReducer;
	const { activeMenuItem } = state.pageReducer;


	return {
		lastResponseId,
		user,
		realestateMetadata,
		cities,
		districts,
		districtsVersion,
		realestates,
		realestateCount,
		systemDate,
		userFavorites,
		activeMenuItem,
		selectedBank, banks
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			setPageHeader,
			getRealestateMetadata,
			showErrorListModal,
			getCities,
			getDistricts,
			searchRealestatePublic,
			getSystemDate,
			addToFavorites,
			removeFromFavorites,
			getFavoritesOfUser,
			showErrorModal,
			getSelectedBank, getAllBanks
		},
		dispatch
	);
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(Favorites);

export { hoc as Favorites };
