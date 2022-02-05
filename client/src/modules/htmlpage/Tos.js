import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { setPageHeader } from './../../actions/page/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Tos extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		this.props.setPageHeader([I18n.t('menu.TOS')]);
	}
	render() {
		return (
			<div>
				<Segment basic padded className="htmlcontent">
					<Header size="tiny">Nullam hendrerit urna ut tristique lacinia</Header>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor lacinia lacus et dictum. Phasellus
						condimentum sit amet ex a facilisis. Duis eros ante, ultrices non nibh lacinia, porta scelerisque nunc. Nunc
						efficitur placerat porta. Pellentesque luctus maximus porttitor. Aliquam placerat ipsum sed egestas
						fringilla. Quisque rutrum mi non lobortis scelerisque. Duis velit ipsum, blandit nec aliquet nec, malesuada
						eget sapien. Cras nec suscipit tortor.
					</p>
					<Header size="tiny">Aliquam bibendum</Header>
					<p>
						Duis vel tempus justo. Fusce pulvinar turpis quis scelerisque commodo. Nullam ipsum ex, pharetra nec lorem
						in, consectetur malesuada turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut laoreet
						vel odio vel congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum felis
						eleifend, feugiat sapien id, sollicitudin libero.
					</p>
					<Header size="tiny">How accurate is the information?</Header>
					<p>
						Curabitur sodales mi nec nibh bibendum varius. Praesent et tempor justo. Sed ut justo non libero ultrices
						sagittis. Aliquam consequat sapien blandit risus pretium, eget faucibus nibh condimentum. Nullam convallis
						urna felis, euismod porta lectus mattis in. Proin id mattis mauris, ut tincidunt purus. Maecenas dapibus vel
						nunc nec condimentum. Nullam sit amet finibus ligula. Sed egestas varius justo, vitae molestie quam. Donec
						nisi magna, egestas eget tristique sed, luctus non dolor.
					</p>
					<p>
						Curabitur consectetur eget mauris sed malesuada. Pellentesque tempor nec enim ac aliquet. Nullam quis varius
						nisi. Vestibulum sodales ante dui, id cursus metus ornare in. Vivamus ultricies lacinia nulla quis
						condimentum. In pulvinar elementum eros nec sodales. Quisque a nisl eu metus accumsan ultrices. Aenean
						sagittis dictum suscipit. In auctor risus ligula, vitae hendrerit sem ultrices a.
					</p>
					<Header size="tiny">Etiam vitae eros mollis</Header>
					<p>
						Aliquam mi tellus, placerat at ullamcorper a, volutpat vel orci. Quisque et consequat turpis. Maecenas
						mollis turpis mauris, eget tempus elit venenatis id. Nullam interdum tellus ipsum, vel sagittis nisl
						scelerisque non. Morbi feugiat, est ut imperdiet viverra, enim arcu tempus lectus, eget facilisis risus quam
						sit amet nisi. Suspendisse posuere purus a odio finibus, ut suscipit massa lacinia. Maecenas a libero
						tortor.
					</p>
					<Header size="tiny">Morbi ac arcu vulputate</Header>
					<p>
						If you notice any erroneous or outdated information, you should act to remove that information from the
						source website; you can see the details of the source website next to each result item.
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

const hoc = connect(mapStateToProps, mapDispatchToProps)(Tos);

// EXPORT COMPONENT

export { hoc as Tos };
