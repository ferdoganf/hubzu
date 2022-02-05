import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Loading } from './components/loading/Loading';
import { ModalPopup } from './components/modal/ModalPopup';
import { PageHeader } from './components/pageheader/PageHeader';
import PageFooter from './components/pagefooter/PageFooter';
import { Home } from './modules/home/Home';
import { Entrance } from './modules/home/Entrance';
import { Favorites } from './modules/favorites/Favorites';
import { Bids } from './modules/bids/Bids';
import { AutoBids } from './modules/bids/AutoBids';
import { AutoBidRealestateDetail } from './modules/bids/AutoBidRealestateDetail';

import { PasswordUpdate } from './modules/user/PasswordUpdate';

import { RealestatesStarted } from './modules/home/RealestatesStarted';
import { RealestatesOccasion } from './modules/home/RealestatesOccasion';
import { RealestatesLatest } from './modules/home/RealestatesLatest';
import { RealestatesFinished } from './modules/home/RealestatesFinished';

import { SignIn } from './modules/signin/SignIn';
import { SignUp } from './modules/signup/SignUp';
import { SignUpVerify } from './modules/signup/SignUpVerify';
import { ContactUs } from './modules/contactus/ContactUs';

import { RealestateCreate } from './modules/admin/realestate/RealestateCreate';
import { RealestateUpdateDetails } from './modules/admin/realestate/RealestateUpdateDetails';
import { RealestateUpdateAddress } from './modules/admin/realestate/RealestateUpdateAddress';
import { RealestateUpdatePhoto } from './modules/admin/realestate/RealestateUpdatePhoto';
import { RealestatePublish } from './modules/admin/realestate/RealestatePublish';
import { RealestateList } from './modules/admin/realestate/RealestateList';
import { RealestateUpdate } from './modules/admin/realestate/RealestateUpdate';
import { RealestateDetail as AdminRealestateDetail } from './modules/admin/realestate/RealestateDetail';
import { RealestateUpdateStatus } from './modules/admin/realestate/RealestateUpdateStatus';
import { RealestateUpdateEndDate } from './modules/admin/realestate/RealestateUpdateEndDate';
import { RealestateUpdateBuyers } from './modules/admin/realestate/RealestateUpdateBuyers';
import { RealestateFavorites } from './modules/admin/realestate/RealestateFavorites';
import { RealestateBids } from './modules/admin/realestate/RealestateBids';

import { RealestateDetail } from './modules/realestate/RealestateDetail';

import { BuyerList } from './modules/admin/buyer/BuyerList';
import { BuyerCreate } from './modules/admin/buyer/BuyerCreate';
import { BuyerUpdate } from './modules/admin/buyer/BuyerUpdate';
import { BuyerPassword } from './modules/admin/buyer/BuyerPassword';
import { BuyerStatus } from './modules/admin/buyer/BuyerStatus';
import { BuyerRealestateWarrants } from './modules/admin/buyer/BuyerRealestateWarrants';


import { BankList } from './modules/admin/bank/BankList';
import { BankCreate } from './modules/admin/bank/BankCreate';
import { BankUpdate } from './modules/admin/bank/BankUpdate';


import { RealestateSubTypeList } from './modules/admin/data/RealestateSubTypeList';
import { RealestateSubTypeCreate } from './modules/admin/data/RealestateSubTypeCreate';
import { RealestateSubTypeUpdate } from './modules/admin/data/RealestateSubTypeUpdate';

import { SaleContract } from './modules/admin/contract/SaleContract';
import { BankContract } from './modules/admin/contract/BankContract';
import { SmsList } from './modules/admin/content/SmsList';
import { SmsUpdate } from './modules/admin/content/SmsUpdate';
import { KVKKInformationText } from './modules/admin/contract/KVKKInformationText';
import { BidEvaluationReportList } from './modules/admin/content/BidEvaluationReportList';


import { RealEstateStatusReport } from './modules/admin/report/RealEstateStatusReport';



import { Privacy } from './modules/htmlpage/Privacy';
import { Tos } from './modules/htmlpage/Tos';
import { AboutUs } from './modules/htmlpage/AboutUs';
import { WhatWeDo } from './modules/htmlpage/WhatWeDo';
import { MisionVision } from './modules/htmlpage/MisionVision';
import { KVKK } from './modules/htmlpage/KVKK';
import { How } from './modules/htmlpage/How';


import PageInit from './components/page/PageInitHoc';
import PageSignOut from './components/page/PageSignOutHoc';
import PageRequireSession from './components/page/PageRequireSessionHoc';



class AppRouter extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Loading />
					<ModalPopup />
					<PageHeader />
					<div className="body">
						<Switch>
							<Route exact path="/" component={PageInit(Entrance)} />
							<Route exact path="/home" component={PageInit(Home)} />
							<Route exact path="/home/:keyword" component={PageInit(Home)} />
							<Route exact path="/realestates/started" component={PageInit(RealestatesStarted)} />
							<Route exact path="/realestates/latest" component={PageInit(RealestatesLatest)} />
							<Route exact path="/realestates/occasion" component={PageInit(RealestatesOccasion)} />
							<Route exact path="/realestates/finished" component={PageInit(RealestatesFinished)} />

							<Route exact path="/signin" component={PageSignOut(SignIn)} />
							<Route exact path="/signup" component={PageSignOut(SignUp)} />
							<Route exact path="/signup/verify/:code" component={PageSignOut(SignUpVerify)} />
							<Route exact path="/contactus" component={PageInit(ContactUs)} />
							<Route exact path="/privacy" component={PageInit(Privacy)} />
							<Route exact path="/tos" component={PageInit(Tos)} />
							<Route exact path="/aboutus" component={PageInit(AboutUs)} />
							<Route exact path="/whatwedo" component={PageInit(WhatWeDo)} />
							<Route exact path="/misionvision" component={PageInit(MisionVision)} />
							<Route exact path="/kvkk" component={PageInit(KVKK)} />
							<Route exact path="/how" component={PageInit(How)} />


							<Route exact path="/favorites" component={PageRequireSession(PageInit(Favorites))} />
							<Route exact path="/bids" component={PageRequireSession(PageInit(Bids))} />
							<Route exact path="/autobids" component={PageRequireSession(PageInit(AutoBids))} />
							<Route exact path="/autobids/:code" component={PageRequireSession(PageInit(AutoBidRealestateDetail))} />
							<Route exact path="/password" component={PageRequireSession(PageInit(PasswordUpdate))} />

							<Route exact path="/admin/realestate/list" component={PageRequireSession(PageInit(RealestateList))} />
							<Route exact path="/admin/realestate" component={PageRequireSession(PageInit(RealestateCreate))} />
							<Route exact path="/admin/realestate/:code" component={PageRequireSession(PageInit(RealestateUpdate))} />
							<Route exact path="/admin/realestate/:code/details" component={PageRequireSession(PageInit(RealestateUpdateDetails))} />
							<Route exact path="/admin/realestate/:code/address" component={PageRequireSession(PageInit(RealestateUpdateAddress))} />
							<Route exact path="/admin/realestate/:code/photo" component={PageRequireSession(PageInit(RealestateUpdatePhoto))} />
							<Route exact path="/admin/realestate/:code/publish" component={PageRequireSession(PageInit(RealestatePublish))} />
							<Route exact path="/admin/realestate/:code/view" component={PageRequireSession(PageInit(AdminRealestateDetail))} />
							<Route exact path="/admin/realestate/:code/status" component={PageRequireSession(PageInit(RealestateUpdateStatus))} />
							<Route exact path="/admin/realestate/:code/buyers" component={PageRequireSession(PageInit(RealestateUpdateBuyers))} />
							<Route exact path="/admin/realestate/:code/favorites" component={PageRequireSession(PageInit(RealestateFavorites))} />
							<Route exact path="/admin/realestate/:code/bids" component={PageRequireSession(PageInit(RealestateBids))} />
							<Route exact path="/admin/realestate/:code/enddate" component={PageRequireSession(PageInit(RealestateUpdateEndDate))} />

							<Route exact path="/admin/buyer/list" component={PageRequireSession(PageInit(BuyerList))} />
							<Route exact path="/admin/buyer" component={PageRequireSession(PageInit(BuyerCreate))} />
							<Route exact path="/admin/buyer/:code" component={PageRequireSession(PageInit(BuyerUpdate))} />
							<Route exact path="/admin/buyer/:code/password" component={PageRequireSession(PageInit(BuyerPassword))} />
							<Route exact path="/admin/buyer/:code/status" component={PageRequireSession(PageInit(BuyerStatus))} />
							<Route exact path="/admin/buyer/:code/realestate/warrants" component={PageRequireSession(PageInit(BuyerRealestateWarrants))} />
							<Route exact path="/admin/contract/sale" component={PageRequireSession(PageInit(SaleContract))} />
							<Route exact path="/admin/contract/bank/:code" component={PageRequireSession(PageInit(BankContract))} />

							<Route exact path="/admin/bank/list" component={PageRequireSession(PageInit(BankList))} />
							<Route exact path="/admin/bank" component={PageRequireSession(PageInit(BankCreate))} />
							<Route exact path="/admin/bank/:code" component={PageRequireSession(PageInit(BankUpdate))} />

							<Route exact path="/admin/data/realestatesubtype/list" component={PageRequireSession(PageInit(RealestateSubTypeList))} />
							<Route exact path="/admin/data/realestatesubtype" component={PageRequireSession(PageInit(RealestateSubTypeCreate))} />
							<Route exact path="/admin/data/realestatesubtype/:realestateTypeCode/:realestateSubTypeCode" component={PageRequireSession(PageInit(RealestateSubTypeUpdate))} />

							<Route exact path="/admin/sms" component={PageRequireSession(PageInit(SmsList))} />
							<Route exact path="/admin/sms/:code" component={PageRequireSession(PageInit(SmsUpdate))} />
							<Route exact path="/admin/kvkk" component={PageRequireSession(PageInit(KVKKInformationText))} />
							<Route exact path="/admin/realestate/:code/bidevaluationreport" component={PageRequireSession(PageInit(BidEvaluationReportList))} />


							<Route exact path="/admin/reports/realestatestatus" component={PageRequireSession(PageInit(RealEstateStatusReport))} />

							<Route exact path="/realestates/detail/:code" component={PageInit(RealestateDetail)} />
							<Route component={PageInit(Entrance)} />
						</Switch>
					</div>
					<PageFooter />
				</div>
			</BrowserRouter>
		);
	}
}
export default AppRouter;

