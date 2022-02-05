import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PageHeaderMenuVisitor extends React.Component {
    render() {
        return (
            <Menu compact>
                <Menu.Item as={Link} to="/home" active={this.props.activeMenuItem === '/home'}>
                    {I18n.t('menu.ALL_REAL_ESTATE')}
                </Menu.Item>

                <Menu.Item as={Link} to="/realestates/started" active={this.props.activeMenuItem === '/realestates/started'}>
                    {I18n.t('menu.REALESTATE_STARTED_REAL_ESTATE')}
                </Menu.Item>

                <Menu.Item as={Link} to="/realestates/latest" active={this.props.activeMenuItem === '/realestates/latest'}>
                    {I18n.t('menu.LATESTS_REAL_ESTATE')}
                </Menu.Item>

                <Menu.Item as={Link} to="/realestates/occasion" active={this.props.activeMenuItem === '/realestates/occasion'}>
                    {I18n.t('menu.OCCASION_REAL_ESTATE')}
                </Menu.Item>

                <Menu.Item as={Link} to="/realestates/finished" active={this.props.activeMenuItem === '/realestates/finished'}>
                    {I18n.t('menu.FINISHED_REAL_ESTATE')}
                </Menu.Item>
            </Menu>
        );
    }
}

export default PageHeaderMenuVisitor;