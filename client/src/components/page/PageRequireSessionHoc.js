import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showLoading, hideLoading } from './../../actions/page/Actions';
import CookieHelper from '../../common/CookieHelper';

export default function PageRequireSessionHoc(ComposedComponent) {
    class PageRequireSession extends React.Component {
        componentDidMount() {
            let accessToken = CookieHelper.getAccessToken();
            let refreshToken = CookieHelper.getRefreshToken();
            if ((!accessToken) && (!refreshToken)) {
                this.props.history.push('/');
            }
        }
        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    const mapStateToProps = state => {
        const { user } = state.sessionReducer;
        return {
            user
        };
    };

    const mapDispatchToProps = dispatch => {
        return bindActionCreators({ showLoading, hideLoading }, dispatch);
    };

    return connect(mapStateToProps, mapDispatchToProps)(PageRequireSession);
}