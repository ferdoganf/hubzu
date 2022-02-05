import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Button, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PageHeaderMenuTopDefault extends React.Component {
    render() {
        return (
            <Menu stackable secondary size="huge" className="top">
                <Menu.Item>
                    <Link to="/home" style={{ lineHeight: "1px" }}>
                        <img src="/assets/images/logo.png" alt="hubzu" height="40px" />
                    </Link>
                </Menu.Item>
                <Menu.Menu position="right" style={{ fontSize: "0.8em" }}>
                    <Menu.Item name="sign-in">
                        <Button primary as={Link} to="/signin" style={{ marginRight: '10px', padding: "0.7em" }} size='tiny'>
                            {I18n.t('button.SIGN_IN')}
                        </Button>
                        <Button secondary as={Link} to="/signup" style={{ marginRight: '10px', padding: "0.7em" }} size='tiny'>
                            {I18n.t('button.SIGN_UP')}
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

export default PageHeaderMenuTopDefault;