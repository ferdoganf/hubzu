import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signOut } from '../../actions/session/Actions';
import { showLoading, hideLoading } from './../../actions/page/Actions';

export default function PageSignOutHoc(ComposedComponent) {
    class PageSignOut extends React.Component {
        componentDidMount() {
            this.props.showLoading();
            let thisRef = this;
            this.props.signOut().then(function (result) {
                thisRef.props.hideLoading();
            });
        }
        render() {
            return <ComposedComponent {...this.props} />
        }
    }
    const mapDispatchToProps = dispatch => {
        return bindActionCreators({ signOut, showLoading, hideLoading }, dispatch);
    };
    return connect(null, mapDispatchToProps)(PageSignOut);
}