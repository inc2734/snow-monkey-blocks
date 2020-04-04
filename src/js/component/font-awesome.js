'use strict';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Component } from '@wordpress/element';

export default class FontAwesome extends Component {
	render() {
		return <FontAwesomeIcon icon={ this.props.icon } />;
	}
}
