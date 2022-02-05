import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { setPageHeader } from '../../actions/page/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MisionVision extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;

		this.props.setPageHeader([I18n.t('menu.MISISON_VISION')]);
	}
	render() {
		return (
			<div>
				<Segment basic padded className="htmlcontent">
					<Header size="tiny">Gayrimenkulü Nasıl Edinirim?</Header>

					<p>Web sitemize ücretsiz olarak üye olun.</p>

					<p>Sitemizde bulunan gayrimenkullerden size uygun olan taşınmaz hakkında sitede yer alan detaylı bilgileri inceleyin.</p>

					<p>İlgilendiğiniz gayrimenkulü ziyaret ederek yerinde görün ve satış süreçleri hakkında uzmanlarımız ile görüşün bilgi alın.</p>

					<p>İhale şartnamesini imzalayın ve ihaleye katılım koşullarını sağlayın.</p>

					<p>İhale katılım bedelini ilgili hesaba ödeyin.</p>

					<p>Artık ilgilendiğiniz gayrimenkul için ihaleye katılım sağlayarak teklifinizi sunabilirsiniz.</p>

					<p>İhaleyi kazandığınız tutar üzerinden ödemeyi tapu alım esnasında veya öncesinde ödeyerek satış işlemini tamamlayın.</p>
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

const hoc = connect(mapStateToProps, mapDispatchToProps)(MisionVision);

// EXPORT COMPONENT

export { hoc as MisionVision };
