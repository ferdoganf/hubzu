import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { setPageHeader } from './../../actions/page/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AboutUs extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;

		this.props.setPageHeader([I18n.t('menu.ABOUT_US')]);
	}
	render() {
		return (
			<div>
				<Segment basic padded className="htmlcontent">
					<Header size="tiny">Ekibimiz</Header>
					<p>
						Ekibimizde yer alan şehir plancıları, mimarlar, inşaat mühendisleri,
						iktisatçılar ve gayrimenkul değerleme uzmanları ile birlikte
						oluşturduğumuz multi disipliner bir anlayışla Kurumsal rmaların
						portföylerinde yer alan gayrimenkullerin teknolojik altyapı ve yapay
						zeka kullanımı ile gayrimenkul ekosistemini (danışmanlık, yönetim,
						pazarlama ve satış süreci) oluşturmak ve rmalara kaynak sağlamak
						hede yle kurulduk.
					</p>
				</Segment>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ setPageHeader }, dispatch);
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(AboutUs);

// EXPORT COMPONENT

export { hoc as AboutUs };
