'use strict';

import CategoriesList from './categories-list';

import {
	Component,
} from '@wordpress/element';

export default class extends Component {
	componentDidMount() {
		setTimeout( () => new CategoriesList( this.ulRef ), 0 );
	}

	render() {
		return (
			<ul className="smb-categories-list__list" ref={ ( ref ) => this.ulRef = ref }>
				{ this.props.articleCategoriesList }
			</ul>
		);
	}
}
