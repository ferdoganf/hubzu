import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { Segment, Form, Button } from 'semantic-ui-react'
import StringUtils from './../../common/StringUtils';
import { signIn } from '../../actions/session/Actions';
import { Redirect } from 'react-router-dom'
import { showErrorListModal } from './../../actions/page/Actions';
import { Link } from 'react-router-dom';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formErrorList: [],
      fieldErrors: {}
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.signInActionHandler = this.signInActionHandler.bind(this);
    this.signInActionHandlerKeyPress = this.signInActionHandlerKeyPress.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  signInActionHandler() {

    this.setState({ formErrorList: [], fieldErrorList: [] });
    var formErrorList = [];
    var fieldErrors = {};

    if ((!this.state.email) || (!this.state.email.trim())) {
      formErrorList.push(I18n.t('validation.EMAIL_ADDRESS_EMPTY'));
      fieldErrors.email = true;
    } else if (!StringUtils.validateEmail(this.state.email.trim())) {
      formErrorList.push(I18n.t('validation.EMAIL_ADDRESS_NOT_VALID'));
      fieldErrors.email = true;
    }

    if ((!this.state.password) || (!this.state.password.trim())) {
      formErrorList.push(I18n.t('validation.PASSWORD_EMPTY'));
      fieldErrors.password = true;
    }

    this.setState({ formErrorList, fieldErrors });
    if (formErrorList.length === 0) {
      this.props.signIn(this.state.email, this.state.password);
    } else {
      this.props.showErrorListModal(formErrorList);
    }

  }

  signInActionHandlerKeyPress(e) {
    if (e.key === 'Enter') {
      this.signInActionHandler();
    }
  }

  render() {
    if ((!this.props.user)) {
      return (
        <div>
          <Segment padded basic>
            <Segment padded secondary className="tiny" textAlign="center">
              <Form style={{ textAlign: 'left' }}>
                <Form.Input id='email' label={I18n.t('label.EMAIL_ADDRESS')} placeholder={I18n.t('label.EMAIL_ADDRESS')} onKeyPress={this.signInActionHandlerKeyPress} onChange={this.onChangeHandler} error={this.state.fieldErrors.email} required />
                <Form.Input id='password' type='password' label={I18n.t('label.PASSWORD')} placeholder={I18n.t('label.PASSWORD')} onKeyPress={this.signInActionHandlerKeyPress} onChange={this.onChangeHandler} error={this.state.fieldErrors.password} required />
              </Form>
              <Button primary size='big' onClick={this.signInActionHandler}>{I18n.t('button.SIGN_IN')}</Button>
              <Link to="/signup" style={{ fontWeight: 'bold', margin: '10px', fontSize: '12px', textDecoration: 'underline' }}>
                {I18n.t('button.SIGN_UP')}
              </Link>
            </Segment>
          </Segment>
        </div>
      );
    } else {
      return (
        <Redirect to={{ pathname: '/', state: { pageReload: true } }} />
      );
    }
  }
}

const mapStateToProps = state => {
  const { user } = state.sessionReducer;
  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signIn, showErrorListModal }, dispatch);
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export { hoc as SignIn };
