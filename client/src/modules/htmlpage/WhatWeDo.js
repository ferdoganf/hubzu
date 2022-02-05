import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { setPageHeader } from '../../actions/page/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class WhatWeDo extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;

		this.props.setPageHeader([I18n.t('menu.WHAT_WE_DO')]);
	}
	render() {
		return (
			<div>
				<Segment basic padded className="htmlcontent">
					<p>
						Oluşturulan ekosistem ile tüm paydaşlara (mülk sahipleri, yatırımcılar, vd.) kazanç sağlıyoruz. Yarattığımız ekosistem içerisinde;
					</p>
					<Header size="tiny">Danışmanlık</Header>
					<p>
						•	Gayrimenkul Portföyünün detaylı ve gerçekçi analizi
					</p>
					<p>
						•	Swot analizi</p>
					<p>
						•	Big Data Kullanımı ile Pazarlama ve Satış Stratejilerinin belirlenmesi
					</p>
					<Header size="tiny">Mülk Yönetimi</Header>
					<p>•	Tapu Kayıtları, Plan, Proje, Ruhsat Bilgileri Takibi</p>
					<p>•	Pazar Analizi (Değer Artış ve Düşüş Yaşayan Mülklerin Analizi / Gayrimenkulün ve Bulunduğu Bölgenin Swot Analizi /
						Gayrimenkulün Bulunduğu Alanın Pazar Analizi)</p>
					<p>•	Gayrimenkul Takibi (Tahliye ve İşgalden Arındırma / Temizlik / Tadilat-Tamirat (Elektirik, Mekanik ve Mimari işlemler / Resmi
						Kurumlardaki Abonelik ve Aidat Borç Yönetimi)</p>
					<p>•	Yatırım Danışmanlığı (Fizibilite Raporlarının hazırlanması / En İyi ve En Verimli Kullanım Analizi)</p>
					<Header size="tiny">Çözümlerimiz ve Saha Operasyonları</Header>
					<p>•	Saha Çalışması (Gayrimenkullerin Sahada İncelenmesi, detaylı analizi ve teslim alınması)</p>
					<p>•	Çağrı Merkezi</p>
					<p>•	Teklif Yönetimi (Gelen Tekli erin Yönetilmesi, Satış Teminatlarının Alınması, vb.)</p>
					<p>•	Alıcı ve Satıcı Arasında Gayrimenkul Edinim Şartlarının Belirlenmesi ve Devir İşlemlerinin Yürütülmesi)</p>
					<p>•	Kredi Çözümleri</p>
					<p>•	Tapu Devir İşlemleri</p>
				</Segment>
			</div >
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ setPageHeader }, dispatch);
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(WhatWeDo);

// EXPORT COMPONENT

export { hoc as WhatWeDo };
