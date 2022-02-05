import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment } from 'semantic-ui-react'
import { createVisitor, visitorRedirect } from '../../actions/visitor/Actions';
import { Redirect } from 'react-router-dom'
import { showErrorListModal, showModal } from '../../actions/page/Actions';
import SignUpForm from './SignUpForm';
import { I18n } from 'react-redux-i18n';

class SignUp extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (this.props.shouldRedirect) {
      this.props.visitorRedirect(false);
      this.props.showModal(I18n.t("msg.VISITOR_CREATED_SUCCESS_TITLE"), I18n.t("msg.VISITOR_CREATED_SUCCESS_DESC"), '/signin');
    }
  }

  render() {
    if ((!this.props.user)) {
      return (
        <div>
          <Segment padded basic>
            <Segment padded secondary textAlign="center" className="tiny">
              <SignUpForm showErrorListModal={this.props.showErrorListModal} showModal={this.props.showModal} createVisitor={this.props.createVisitor}></SignUpForm>
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
  const { shouldRedirect } = state.visitorReducer;
  return {
    user,
    shouldRedirect
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createVisitor, showErrorListModal, showModal, visitorRedirect }, dispatch);
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export { hoc as SignUp };
