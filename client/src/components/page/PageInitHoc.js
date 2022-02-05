import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reloadSession, loadSession, signOut } from '../../actions/session/Actions';
import { showLoading, hideLoading } from './../../actions/page/Actions';
import { setActiveMenuItem, setPageHeader } from '../../actions/page/Actions';
import { setDefaultLocale } from "react-datepicker";
import tr from 'date-fns/locale/tr';
import CookieHelper from '../../common/CookieHelper';

setDefaultLocale(tr);

export default function PageInitHoc(ComposedComponent) {
	class PageInit extends React.Component {

		componentDidMount() {
			this.props.setActiveMenuItem(this.props.location.pathname);


			let accessToken = CookieHelper.getAccessToken();
			let refreshToken = CookieHelper.getRefreshToken();

			if (!accessToken && refreshToken) {
				this.props.reloadSession(refreshToken);
			} else if (!this.props.user && accessToken) {
				this.props.loadSession();
			} else if (this.props.user && !accessToken && !refreshToken) {
				this.props.showLoading();
				let thisRef = this;
				this.props.signOut().then(function (result) {
					thisRef.props.hideLoading();
				});
			}
		}

		componentWillUnmount() {
			this.props.setPageHeader([]);
		}

		render() {
			return <ComposedComponent {...this.props} />;
		}
	}

	const mapStateToProps = state => {
		const { user } = state.sessionReducer;
		return {
			user
		};
	};

	const mapDispatchToProps = dispatch => {
		return bindActionCreators(
			{ reloadSession, loadSession, signOut, showLoading, hideLoading, setActiveMenuItem, setPageHeader },
			dispatch
		);
	};

	return connect(mapStateToProps, mapDispatchToProps)(PageInit);
}
