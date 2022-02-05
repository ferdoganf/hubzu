import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';

import { SessionReducer } from './actions/session/Reducer';
import { PageReducer } from './actions/page/Reducer';
import { RealestateReducer } from './actions/realestate/Reducer';
import { AddressReducer } from './actions/address/Reducer';
import { MetadataReducer } from './actions/metadata/Reducer';
import { UserReducer } from './actions/user/Reducer';
import { BuyerReducer } from './actions/buyer/Reducer';
import { VisitorReducer } from './actions/visitor/Reducer';
import { BidReducer } from './actions/bid/Reducer';
import { StatsReducer } from './actions/stats/Reducer';
import { GeneralReducer } from './actions/general/Reducer';
import { ReportReducer } from './actions/report/Reducer';


// EXPORT REDUCER

export const AppReducer = combineReducers({
	i18n: i18nReducer,
	sessionReducer: SessionReducer,
	generalReducer: GeneralReducer,
	pageReducer: PageReducer,
	realestateReducer: RealestateReducer,
	addressReducer: AddressReducer,
	metadataReducer: MetadataReducer,
	userReducer: UserReducer,
	buyerReducer: BuyerReducer,
	visitorReducer: VisitorReducer,
	bidReducer: BidReducer,
	statsReducer: StatsReducer,
	reportReducer: ReportReducer
});
