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
		if ( this.props.src === null ) {
			src = `${ smb.pluginURL }/assets/screenshot-none.png`;
		}
		return (
			<Img
				src={ src }
				loader={ this.props.loader }
			/>
		);
	}
}

export { ScreenshotImg };
