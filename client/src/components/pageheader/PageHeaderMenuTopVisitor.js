import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Button, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CookieHelper from '../../common/CookieHelper';

class PageHeaderMenuTopVisitor extends React.Component {
    render() {
        return (
            <Menu stackable secondary size="huge" className="top">
                <Menu.Item>
                    <Link to="/home" style={{ lineHeight: "1px" }}>
                        <img src="/assets/images/logo.png" alt="hubzu" height="40px" />
                    </Link>
                </Menu.Item>
                <Menu.Menu position="right" style={{ fontSize: "0.8em" }}>
                    <Dropdown item text={I18n.t('menu.MY_ACCOUNT')}>
                        <Dropdown.Menu>
                            <Dropdown.Item className='orangeDropdownItem'>{CookieHelper.getName() + ' ' + CookieHelper.getSurname()}</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.props.history.push('/favorites')}>{I18n.t('menu.MY_FAVORITES')}</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.props.history.push('/password')}>{I18n.t('menu.CHANGE_PASSWORD')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item name="sign-in">
                        <Button secondary onClick={this.props.signOutAction} style={{ marginRight: '10px', padding: "0.7em" }} size='tiny'>
                            {I18n.t('button.SIGN_OUT')}
                        </Button>
                        <Button basic as={Link} to="/contactus" style={{ padding: "0.7em" }} size='tiny'>
                            {I18n.t('button.CONTACT_PAGE')}
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default PageHeaderMenuTopVisitor;