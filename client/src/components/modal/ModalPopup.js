import React from 'react';
import { Modal, Button, List, Header, Icon } from 'semantic-ui-react';
import { hideModal } from '../../actions/page/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';
import ReactHtmlParser from 'react-html-parser';


class ModalPopup extends React.Component {

	acceptAndHide() {
		if (this.props.modalOnCloseAction) {
			this.modalOnCloseAction(this.props.modalOnCloseAction, this.props.modalOnCloseActionArgs);
		}
		this.props.hideModal();

	}

	modalOnCloseAction(callback, args) {
		callback.apply(this, args);
	}

	render() {
		return (
			<div>
				{this.props.modalVisible ? (
					this.props.modalType === 'error' ? (
						<Modal size="tiny" open={this.props.modalVisible} onClose={this.props.hideModal}>
							<Header as="h3">
								<Icon name="exclamation triangle" color="red" />
								<Header.Content>{I18n.t('error.title')}</Header.Content>
							</Header>
							<Modal.Content>
								{this.props.errorList && this.props.errorList.length ? (
									<List items={this.props.errorList} bulleted />
								) : (
										<p>{ReactHtmlParser(this.props.error)}</p>
									)}
							</Modal.Content>
							<Modal.Actions>
								<Button onClick={this.props.hideModal} content={I18n.t('button.CLOSE')} />
							</Modal.Actions>
						</Modal>
					) : this.props.modalType === 'confirm' ? (
						<Modal size="tiny" open={this.props.modalVisible} onClose={this.props.hideModal}>
							<Header as="h3">

								<Icon name="warning circle" color="yellow" />
								<Header.Content>{this.props.modalTitle}</Header.Content>
							</Header>
							<Modal.Content>
								<p>{this.props.modalDesc}</p>
							</Modal.Content>
							<Modal.Actions>
								<Button onClick={this.props.hideModal} secondary content={I18n.t('button.NO')} />
								<Button onClick={() => this.acceptAndHide()} primary content={I18n.t('button.YES')} />
							</Modal.Actions>
						</Modal>
					) : (
								<Modal size="tiny" open={this.props.modalVisible} onClose={this.props.hideModal}>
									<Header as="h3">
										<Icon name="info circle" color="green" />
										<Header.Content>{this.props.modalTitle}</Header.Content>
									</Header>
									<Modal.Content>
										<p>{ReactHtmlParser(this.props.modalDesc)}</p>
									</Modal.Content>
									<Modal.Actions>
										<Button onClick={this.props.hideModal} content={I18n.t('button.CLOSE')} />
									</Modal.Actions>
								</Modal>
							)
				) : this.props.modalOnCloseRedirect ? (
					<Redirect to={this.props.modalOnCloseRedirect} />
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { modalType, errorList, error, modalVisible, modalTitle, modalDesc, modalOnCloseRedirect, modalOnCloseAction, modalOnCloseActionArgs } = state.pageReducer;
	return { modalType, errorList, error, modalVisible, modalTitle, modalDesc, modalOnCloseRedirect, modalOnCloseAction, modalOnCloseActionArgs };
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ hideModal }, dispatch);
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(ModalPopup);

// EXPORT COMPONENT

export { hoc as ModalPopup };
