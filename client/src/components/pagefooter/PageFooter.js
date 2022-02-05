import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { useLocation } from 'react-router-dom';

const FooterComponent = () => {
	const location = useLocation();
	if ((location.pathname && (location.pathname !== '/')) && (location.pathname !== '')) {
		return (
			<div className="appfooter">
				<Menu widths={4} stackable secondary inverted size="tiny">
					<Menu.Item as={Link} to="/aboutus" style={{ fontWeight: 'bold', fontSize: '14px' }}>
						{I18n.t('menu.ABOUT_US')}
					</Menu.Item>
					<Menu.Item as={Link} to="/whatwedo" style={{ fontWeight: 'bold', fontSize: '14px' }}>
						{I18n.t('menu.WHAT_WE_DO')}
					</Menu.Item>
					<Menu.Item as={Link} to="/how" style={{ fontWeight: 'bold', fontSize: '14px' }}>
						{I18n.t('menu.HOW')}
					</Menu.Item>
					<Menu.Item as={Link} to="/privacy" style={{ fontWeight: 'bold', fontSize: '14px' }}>
						{I18n.t('menu.PRIVACY')}
					</Menu.Item>
				</Menu>
			</div>
		);
	} else {
		return null;
	}

}

class PageFooter extends Component {
	render() {
		return (
			<FooterComponent />
		);
	}
}

export default PageFooter;
