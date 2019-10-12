'use strict';

import Img from 'react-image';

import {
	Component,
} from '@wordpress/element';

export default class ScreenshotImg extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}

	render() {
		let src = this.props.src;
		if ( null === this.props.src ) {
			src = `${ smb.pluginUrl }/dist/img/screenshot/none.png`;
		}
		return (
			<Img
				className={ this.props.className }
				src={ src }
				loader={ this.props.loader }
			/>
		);
	}
}
