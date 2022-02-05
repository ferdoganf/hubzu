import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { Segment, Header } from 'semantic-ui-react';
import { contactus, generalRedirect } from './../../actions/general/Actions';
import { setPageHeader, showErrorListModal, showModal } from './../../actions/page/Actions';
import ContactUsForm from './ContactUsForm';

class ContactUs extends Component {

	componentDidUpdate(prevProps, prevState) {
		if (this.props.shouldRedirect) {
			this.props.generalRedirect(false);
			this.props.showModal(I18n.t("msg.MESSAGE_SENT_SUCCESS_TITLE"), I18n.t("msg.MESSAGE_SENT_SUCCESS_DESC"), '/home');
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		this.props.setPageHeader([I18n.t('menu.CONTACT_US')]);
	}

	render() {
		return (
			<div>
				<Segment padded basic>
					<Segment padded secondary textAlign="left" className="tiny">
						<Header as='h3'>İletişim Formu</Header>
						<ContactUsForm showErrorListModal={this.props.showErrorListModal} showModal={this.props.showModal} contactus={this.props.contactus}></ContactUsForm>
					</Segment>
					<Segment padded secondary textAlign="left" className="tiny" style={{ marginTop: '50px' }}>
						<Header as='h3'>Adres</Header>
					</Segment>
				</Segment>
			</div>
		);
	}
}


const mapStateToProps = state => {
	const { shouldRedirect } = state.generalReducer;
	return {
		shouldRedirect
	};
};


const mapDispatchToProps = dispatch => {
	return bindActionCreators({ contactus, showErrorListModal, showModal, generalRedirect, setPageHeader }, dispatch);
};


const hoc = connect(mapStateToProps, mapDispatchToProps)(ContactUs);

// EXPORT COMPONENT

export { hoc as ContactUs };
