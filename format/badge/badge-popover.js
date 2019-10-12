'use strict';

import {
	withState,
} from '@wordpress/compose';

import {
	ColorPalette,
	URLPopover,
} from '@wordpress/editor';

export default withState( {
	color: undefined,
} )( ( { onChangeColor, color, setState } ) => {
	let currentColor;

	//@see https://jsfiddle.net/Mottie/xcqpF/1/light/
	const rgb2hex = ( rgb ) => {
		rgb = rgb.match( /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i );

		if ( rgb && rgb.length === 4 ) {
			rgb.shift();
			return '#' + rgb.map( ( value ) => ( '0' + parseInt( value, 10 ).toString( 16 ) ).slice( -2 ) ).join( '' );
		}

		return false;
	};

	const getPopoverAnchorRect = () => {
		const selection = window.getSelection();
		if ( 1 > selection.rangeCount || 'Range' !== selection.type ) {
			return {};
		}

		const range = selection.getRangeAt( 0 );

		const startContainer = range.startContainer;
		let currentNode = startContainer.nextElementSibling || startContainer;
		while ( currentNode.nodeType !== window.Node.ELEMENT_NODE ) {
			currentNode = currentNode.parentNode;
		}

		if ( currentNode.closest ) {
			const badge = currentNode.closest( '.smb-badge' );
			if ( badge ) {
				const backgroundColor = document.defaultView.getComputedStyle( badge, null ).backgroundColor;
				currentColor = rgb2hex( backgroundColor );
			}
		}

		return range.getBoundingClientRect();
	};

	const anchorRect = getPopoverAnchorRect();

	return (
		<URLPopover
			className="smb-badge-popover"
			focusOnMount={ false }
			anchorRect={ anchorRect }
		>
			<div className="smb-badge-popover__inner">
				<ColorPalette
					value={ color ? color : currentColor }
					onChange={ ( newColor ) => {
						setState( { color: newColor } );
						onChangeColor( newColor );
					} }
				/>
			</div>
		</URLPopover>
	);
} );
