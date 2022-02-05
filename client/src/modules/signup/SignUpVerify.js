import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createVisitorVerify, visitorRedirect } from '../../actions/visitor/Actions';
import { Redirect } from 'react-router-dom'
import { showModal } from '../../actions/page/Actions';
import { I18n } from 'react-redux-i18n';

class SignUpVerify extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (this.props.shouldRedirect) {
      this.props.visitorRedirect(false);
      this.props.showModal(I18n.t("msg.VISITOR_CREATED_VERIFY_SUCCESS_TITLE"), I18n.t("msg.VISITOR_CREATED_VERIFY_SUCCESS_DESC"), '/signin');
    }
  }

  componentDidMount() {
    let code = null;
    if (this.props.match.params.code) {
      code = this.props.match.params.code.toString();
    }
    if (!code) {
      this.props.history.push("/");
    } else {
      this.props.createVisitorVerify(code);
    }
  }

  render() {
    if ((!this.props.user)) {
      return (
        <div>
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
  return bindActionCreators({ createVisitorVerify, showModal, visitorRedirect }, dispatch);
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(SignUpVerify);

export { hoc as SignUpVerify };
