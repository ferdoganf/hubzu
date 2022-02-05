import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { setPageHeader } from '../../actions/page/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class KVKK extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		this.props.setPageHeader([I18n.t('menu.PRIVACY')]);
	}
	render() {
		return (
			<div>
				<Segment basic padded className="htmlcontent">
					<p>İşbu Aydınlatma Metninin amacı, KVKK’nin 10. maddesi ile veri sorumlularına getirilen aydınlatma yükümlülüğünün yerine getirilmesidir.Aydınlatma Metni vasıtasıyla Şirket, Siteye üye olan kişilerin (<b>“Üye”</b>) üye olma iradeleri doğrultusunda paylaşmış oldukları kişisel verileri toplama, işleme amaçları, hukukî nedenleri ve Üyenin hakları konularında Üyeleri şeffaf ve açık bir biçimde bilgilendirmektedir.Üyelere ait kişisel verilerin korunması ve her halükârda gizli tutulması hususları, Şirket için azami önemi haiz bir husustur.Mevzuat hükümlerine uygun bir biçimde Şirket ile çalışanları ve servis sağlayıcıları tarafından Sitenin sunduğu hizmetler sağlanırken gerekli gizliliğe riayet edilmesi ve ilgili verilerin saklanması hususunda makul teknik ve idari önlemler alınmaya çalışılmaktadır.</p>
					<p>Sitenin durumun özelliğine göre diğer internet sitelerine yönlendirmelerde bulunması halinde, bu sitelerin veri koruma hükümlerine uygun olup olmamaları hususunda hiçbir Şirket herhangi bir taahhütte bulunmamaktadır.Şirket, link veya benzeri başka yöntemlerle bağlantı verdiği sitelerin içeriklerinden hiçbir zaman sorumlu değildir.</p>
					<p>Şirket tarafından toplanan ve işlenen, Üyelere ait kişisel veriler (<b>“Kişisel Veriler”</b>): </p>

					<table border="1px">
						<tr><td><b>Genel Nitelikli Kişisel Veri Kategorisi</b></td><td><b>Kişisel Verinin İçeriği</b></td></tr>
						<tr><td><b>Kimlik Bilgisi</b></td><td>Ad-soyad, T.C.kimlik numarası, pasaport numarası, mavi kart kimlik numarası, doğum tarihi, doğum yeri, uyruk, cinsiyeti.</td></tr>
						<tr><td><b>İletişim Bilgisi</b></td><td>Telefon numarası (sabit ve/veya mobil), açık adres bilgisi, ülke, e-posta adresi.</td></tr>
						<tr><td><b>Müşteri İşlem Bilgisi</b></td><td>Sitenin sağlamış olduğu hizmetlerin kullanımına yönelik kayıtlar ile müşterinin ürün ve hizmetleri kullanımı için gerekli olan talimatları ve talepleri gibi bilgiler.</td></tr>
						<tr><td><b>İşlem Güvenliği Bilgisi</b></td><td>Ticari faaliyetlerimizi yürütürken teknik, idarî, hukukî ve ticarî güvenliğimizi sağlamamız için işlenen kişisel verileriniz.</td></tr>
						<tr><td><b>Hukuki İşlem ve Uyum Bilgisi</b></td><td>Hukuken alacaklarımızın ve haklarımızın tespiti, takibi ve borçlarımızın ifası ile kanunî yükümlülüklerimiz ve Şirket politikalarına uyum kapsamında işlenen kişisel veriler.</td></tr>
					</table>
					<Header size="tiny">1. Kişisel Verilerin İşlenmesi</Header>
					<p>Kişisel verilerin işlenmesi, kişisel verilerin tamamen ve kısmen otomatik olan (çerezler) ya da herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilmesi, kaydedilmesi, depolanması, muhafaza edilmesi, değiştirilmesi, yeniden düzenlenmesi, açıklanması, aktarılması, devralınması, elde edilebilir hale getirilmesi, sınıflandırılması ya da kullanılmasının engellenmesi gibi kişilere ait veriler üzerinde gerçekleştirilen her türlü işlemi ifade etmektedir.</p>
					<Header size="tiny">2. Kişisel Verilerin Toplanma Yöntemleri</Header>
					<p>Kişisel Verileriniz Sitenin sağamış olduğu hizmetlerden yararlanmanız amacı başta olmak üzere Aydınlatma Metninin 3. maddesinde bahsi geçen amaçlarla KVKK’de öngörülen ilkelere uygun bir biçimde otomatik ya da otomatik olmayan yollarla doğrudan tarafınızdan sözlü veya fiziksel olarak sağlanan bilgilerle, üyelik bilgi formu, posta ve elektronik posta kanallarıyla toplanmaktadır.</p>
					<Header size="tiny">3. Kişisel Verilerinizin İşlenme Amacı ve Aktarılacağı 3. Kişiler</Header>
					<p>3.1.Kişisel Verileriniz Sitede sağlanan hizmetlerin yerine getirilebilmesi, hizmet satış süreçlerinin yürütülmesi, hizmet satış sonrası destek hizmetlerinin yürütülmesi, hizmet operasyon süreçlerinin yürütülmesi, Üye ilişkileri yönetim süreçlerinin yürütülmesi, sözleşme süreçlerinin yürütülmesi, Üyelere daha iyi hizmet sunabilmesi, bilgi güvenliği süreçlerinin yürütülmesi, faaliyetlerin mevzuata uygun bir şekilde yürütülmesi amaçlarıyla ayrıca izin verilmiş olması durumunda pazarlama faaliyetlerinde kullanılabilmesi, hizmet teklifi, her türlü bilgilendirme, reklam-tanıtım, promosyon, satış, pazarlama, üyelik uygulamaları, modelleme, raporlama, skorlama, internet sitesinin kullanımını kolaylaştırılması, Üyelerin ilgi alanlarına ve tercihlerine yönelik tarafımızca veya iştiraklerimiz tarafından yapılacak geliştirme çalışmalarında kullanılmak üzere işlenebilecektir.Site üzerinde yapılan hareketler, çerezler ve benzeri yöntemlerle izlenebilecek, istatistiki amaçlarla kullanılabilecek ve bu hareketlerin kaydı tutulabilecektir.Ancak buna ek olarak önemle belirtmek isteriz ki, internet sitemize üyelik, ürün veya hizmetlerimizin satın alınması ve bilgi güncelleme amaçlı girilen bilgiler ile kredi kartı ve banka kartlarına ait gizli bilgiler, diğer internet kullanıcıları tarafından görüntülenemez.</p>
					<p>Üyelik kapsamında Şirket ile paylaştığınız bilgileriniz, buna ek olarak hizmet alımlarınız sırasında çerezler ve benzeri yöntemler aracılığı edinilen bilgiler, Şirket, mevcut ve ilerideki iştiraklerimiz, bağlı şirketlerimiz, hissedarlarımız, iş ortaklarımız, haleflerimiz, hizmet ve faaliyetlerimiz ile yan hizmetlerimizi yürütmek üzere hizmet aldığımız, işbirliği yaptığımız, yurt içinde faaliyet gösteren program ortağı kuruluşlar ve diğer üçüncü kişiler (hukuk ve vergi danışmanlarımız, bankalar, bağımsız denetçiler dahil ve fakat bunlarla sınırlı olmamak üzere, sizlere hizmet sunabilmemiz için işbirliği yaptığımız veya yapabileceğimiz hizmet tedarikçilerimiz) ve/veya bunların belirleyecekleri üçüncü kişiler/kuruluşlar tarafından muhtelif mal ve hizmetlerin sağlanması ve her türlü bilgilendirme, reklam-tanıtım, promosyon, satış, pazarlama ve üyelik uygulamaları amaçlı yapılacak elektronik ve diğer ticari-sosyal iletişimler için, belirtilenler ve halefleri nezdinde süresiz olarak veya öngörecekleri süre ile kayda alınabilecek, basılı/manyetik arşivlerde saklanabilecek, gerekli görülen hallerde güncellenebilecek, paylaşılabilecek, aktarılabilecek, transfer edilebilecek, kullanılabilecek ve KVKK 5. ve 6. Maddesinde belirtilen Kişisel Veri işleme şartları ve amaçları dahilinde işlenebilecektir.Buna ek olarak, Kanun dahil ilgili mevzuat hükümleri dahilinde zorunlu olması durumunda bazı uygulamalar ve işlemler için ilave izniniz de gerekebilecektir.Bu durumlarda sizlerle iletişime geçilecek ve sizlerin açık rızaları rica edilecektir.Bu verilere ek olarak, bizlere iletmiş olduğunuz Kişisel Verileriniz hukukun gerekli kıldığı durumlarda resmî kurum/kuruluşlar, mahkemeler tarafından talep edilmesi halinde ilgili merci ve mahkemelere iletilebilecektir.</p>
					<Header size="tiny">4. Veri Sahibi Sıfatıyla Üyelerin Hakları</Header>
					<p>4.1.İşbu Aydınlatma Metninde belirtilen amaçlar ve kişisel verilerin işlenme yöntemleri kapsamında bizimle paylaşmış olduğunuz Kişisel Verileriniz üzerinde KVKK 11. Madde uyarınca sahip olduğunuz haklar aşağıdaki gibidir: </p>
					<p>• Kişisel veri işlenip işlenmediğini öğrenme,</p>
					<p>• Kişisel veriler işlenmişse buna ilişkin bilgi talep etme,</p>
					<p>• Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</p>
					<p>• Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</p>
					<p>• Kişisel verilerin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme,</p>
					<p>• KVKK 7. Maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,</p>
					<p>• Kişisel verilerin aktarıldığı üçüncü kişilerin de Kişisel Verilerinizi düzeltmesinin, silmesinin veya yok etmesinin bildirilmesini isteme,</p>
					<p>• İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</p>
					<p>• Kişisel verilerin kanuna aykırı olarak islenmesi sebebiyle zarara uğraması halinde zararın giderilmesini talep etme.</p>
					<p>4.2.KVKK 11. Maddede sayılan ve Aydınlatma Metni 4. Maddede bahsi geçen haklarınızı kullanmak Şirkete başvuruda bulunabilirsiniz.Başvurunuzda,</p>
					<p>• Adınız, soyadsız ve başvuru yazılı ise imzanız,</p>
					<p>• Türkiye Cumhuriyeti vatandaşları için T.C.kimlik numarası, yabancılar için uyruğu, pasaport numarası veya varsa kimlik numarası,</p>
					<p>• Tebligata esas yerleşim yeri veya iş yeri adresi, varsa bildirime esas e-posta adresi,</p>
					<p>• Telefon ve faks numarası,</p>
					<p>• Talep konusu,</p>
					<p>hususları belirtilmesi gerektiği gibi, konuya ilişkin bilgi ve belgeler başvuruya eklenmelidir.</p>
					<p>4.3.Aydınlatma Metni 4.2.Madde kapsamında gerçekleştireceğiniz başvuruyu Muallimköy Mahallesi,  Deniz Caddesi, Muallimköy T.G.B.1.Etap Sitesi, 1.1.C1 Blok No: 143/8 İç Kapı No: Z01 Gebze-Kocaeli adresine bizzat elden iletebilir, noter kanalıyla veya KVKK’de belirtilen diğer yöntemler ile de gönderebilir veya ilgili formu <b>info@gmail.com</b> e-posta adresimize güvenli elektronik imzalı olarak iletebilirsiniz.Şirket, talebiniz üzerine talebinizi kabul eder veya gerekçesini açıklayarak reddeder ve cevabını ilgili kişiye yazılı olarak veya elektronik ortamda bildirir.Başvuruda yer alan talebin kabul edilmesi halinde Şirket tarafından gereği yerine getirilir.Başvurunuzun Şirketin hatasından kaynaklanması ve sizden bir ücret tahsil edilmesi halinde alınan ücret size iade edilecektir.</p>
					<p>4.4.Kişisel Veri sahipleri olarak, KVKK 11. Madde belirtilen haklarınıza ilişkin taleplerinizi söz konusu yöntemlerle Şirkete iletmeniz durumunda, Şirketimiz talebin niteliğine göre talebi en kısa sürede ve en geç otuz gün içinde ücretsiz olarak sonuçlandıracaktır.Ancak, işlemin ayrıca bir maliyeti gerektirmesi halinde Kişisel Verileri Koruma Kurulunca belirlenen tarifedeki ücret alınabilir.</p>
					<Header size="tiny">Çerezler</Header>
					<p>İnternet sitemizde IP adresi, kullanılan tarayıcı, bilgisayarınızdaki işletim sistemi, internet bağlantınız, site kullanımları hakkındaki bilgiler gibi belirli verileri otomatik olarak elde etmemize yardımcı olan çerezler bulunmaktadır.Söz konusu çerezler bir internet sayfası sunucusu tarafından sabit sürücünüze iletilen küçük metin dosyalarıdır ve sitemizde bulunan çerezler, bilgisayarınız için zararlı sayılabilecek virüsler göndermek için kullanılmamaktadır.</p>
					<p>Çerezler genellikle bilgisayarınızda bulunarak, internet sitemizde yapmış olduğunuz işlemler, gezintileriniz esnasındaki tıklamalarınızın kaydedilmesi yolu ile internet sitesini hangi zaman dilimi içerisinde, ne kadar süre ile kaç kişinin kullandığı, bir kişinin internet sitesini hangi amaçlarla, kaç kez ziyaret ettiği ve site üzerinde ne kadar vakit harcadığı hakkında istatistiksel bilgileri elde etmek ve kullanıcı sayfalarından dinamik olarak reklam ve içerik üretilmesine yardımcı olmak amacı ile sağlanmaktadır.İnternet sitemizi kullanarak kullanılan çerezleri onaylamış olursunuz.Şirket, söz konusu çerezler aracılığı ile verilerinizi işleyebilir ve elde edilen bilgileri analiz etme amacı ile bu kapsamda yurtiçinde üçüncü kişilere aktarabilir.</p>
					<p>Çerezler tarafından verileriniz toplanmadan internet sitemizi görüntülemek istiyorsanız seçiminizi cihazınızın/tarayıcınızın ayarlarından her zaman değiştirebilirsiniz.Çerezlerin kullanımını durdurduğunuzda internet sitemizde her türlü işlemi yapamayacağınızı (açık artırmada teklif vermek gibi), belirli özelliklerinin çalışmayabileceğini lütfen unutmayınız.</p>
					<Header size="tiny">Kişisel Verilerinizin İşlenmesine İlişkin Açık Rıza Beyanı</Header>
					<Header size="tiny">İşverenin İştiraklerine ve Hissedarlarına Veri Aktarımına İlişkin Açık Rıza Beyanı</Header>
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

const hoc = connect(mapStateToProps, mapDispatchToProps)(KVKK);

// EXPORT COMPONENT

export { hoc as KVKK };
