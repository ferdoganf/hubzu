import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPageHeader } from '../../actions/page/Actions';
import { getContract } from '../../actions/metadata/Actions';
import { I18n } from 'react-redux-i18n';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Privacy extends Component {

	constructor(props) {
		super(props);
		this.state = {
			code: 'kvkk',
			route: 1,
			contractInitiated: false
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		this.props.setPageHeader([I18n.t('menu.KVKK')]);
		this.props.getContract(this.state.code);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.contract && (this.props.contract.code === this.state.code) && (!this.state.contractInitiated)) {
			this.setState({ contractInitiated: true });
		}
	}

	render() {
		return (
			<div>
				{this.state.contractInitiated ?
					<p>{
						<ReactQuill
							value={this.props.contract.content}
							readOnly={true}
							theme={"bubble"}
						/>
					}</p>
					: null
				}
			</div>
		);
	}
}

const mapStateToProps = state => {

	const { lastResponseId } = state.pageReducer;
	const { user } = state.sessionReducer;
	const { contract, shouldRedirect } = state.metadataReducer;

	return {
		lastResponseId,
		user,
		contract,
		shouldRedirect
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			setPageHeader,
			getContract
		},
		dispatch
	);
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(Privacy);

export { hoc as Privacy };