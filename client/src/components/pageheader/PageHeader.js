import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { setLocale } from 'react-redux-i18n';
import { reloadSession, signOut } from '../../actions/session/Actions';
import { Segment, Breadcrumb } from 'semantic-ui-react';
import { showLoading, hideLoading } from './../../actions/page/Actions';
import CookieHelper from '../../common/CookieHelper';
import PageHeaderMenuTopBuyer from './PageHeaderMenuTopBuyer';
import PageHeaderMenuTopDefault from './PageHeaderMenuTopDefault';
import PageHeaderMenuTopAdmin from './PageHeaderMenuTopAdmin';
import PageHeaderMenuTopVisitor from './PageHeaderMenuTopVisitor';
import PageHeaderMenuTopOperation from './PageHeaderMenuTopOperation';


class PageHeader extends Component {
	constructor(props) {
		super(props);
		this.checkSession = this.checkSession.bind(this);
		this.signOutAction = this.signOutAction.bind(this);
		this.state = { timer: null };
	}

	componentDidMount() {
		let timer = setInterval(this.checkSession, 5000);
		this.setState({ timer });
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
	}

	checkSession() {
		let accessToken = CookieHelper.getAccessToken();
		let refreshToken = CookieHelper.getRefreshToken();
		if (!accessToken && refreshToken) {
			console.log('Page reloadSession');
			this.props.reloadSession(refreshToken);
		}
	}

	signOutAction() {
		this.props.showLoading();
		let thisRef = this;
		this.props.signOut().then(function (result) {
			thisRef.props.hideLoading();
		});
	}

	render() {
		return (
			<div className="appheaderPanel">
				<header className="appheader">
					{
						this.props.user ?
							this.props.user.userType === 'ADMIN' ?
								<div style={{ textAlign: 'center' }}>
									<PageHeaderMenuTopAdmin signOutAction={this.signOutAction} activeMenuItem={this.props.activeMenuItem} history={this.props.history} />
								</div>
								:
								this.props.user.userType === 'OPERATION' ?
									<div style={{ textAlign: 'center' }}>
										<PageHeaderMenuTopOperation signOutAction={this.signOutAction} activeMenuItem={this.props.activeMenuItem} history={this.props.history} />
									</div>
									:
									this.props.user.userType === 'BUYER' ?
										<div style={{ textAlign: 'center' }}>
											<PageHeaderMenuTopBuyer signOutAction={this.signOutAction} history={this.props.history} />
										</div>
										: this.props.user.userType === 'VISITOR' ?
											<div style={{ textAlign: 'center' }}>
												<PageHeaderMenuTopVisitor signOutAction={this.signOutAction} history={this.props.history} />
											</div>
											: <div style={{ textAlign: 'center' }}>
												<PageHeaderMenuTopDefault history={this.props.history} />
											</div>
							:
							<div style={{ textAlign: 'center' }}>
								<PageHeaderMenuTopDefault history={this.props.history} />
							</div>
					}
					{this.props.pageHeader && this.props.pageHeader.length > 0 ? (
						<Segment inverted basic>
							<Breadcrumb divider='-' size='big' sections={this.props.pageHeader} />
						</Segment>
					) : null}
				</header>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.sessionReducer;
	const { locale } = state.i18n;
	const { activeMenuItem, pageHeader } = state.pageReducer;
	return {
		user,
		locale,
		activeMenuItem,
		pageHeader
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ setLocale, reloadSession, signOut, showLoading, hideLoading }, dispatch);
};

const hoc = withRouter(connect(mapStateToProps, mapDispatchToProps)(PageHeader));

export { hoc as PageHeader };
