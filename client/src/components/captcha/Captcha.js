import React, { Component } from 'react';
import Recaptcha from 'react-grecaptcha';

class Captcha extends Component {
    render() {
        return (
            <Recaptcha
                style={this.props.style}
                sitekey="6LeLC-IZAAAAAJS49lWAT7anrfWdwje6vt7DYK7o"
                callback={this.props.verifyCallback}
                expiredCallback={this.props.expiredCallback}
                locale='en-US'
                className="field"
            />
        );
    }

}
export default Captcha;