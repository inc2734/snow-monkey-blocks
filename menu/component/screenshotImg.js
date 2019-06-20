'use strict';

import Img from 'react-image';

const { Component } = wp.element;

class ScreenshotImg extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}

	render() {
		let src = this.props.src;
		if ( null === this.props.src ) {
			src = `${ smb.pluginURL }/dist/img/screenshot-none.png`;
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

export { ScreenshotImg };
