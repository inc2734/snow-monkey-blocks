'use strict';

import classnames from 'classnames';

import {
	RichText,
} from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const { avatarID, avatarAlt, avatarURL, avatarBorderColor, balloonName, balloonBody, modifier } = attributes;

	const balloonFigureStyles = {
		borderColor: avatarBorderColor || undefined,
	};

	const classes = classnames(
		'smb-balloon',
		{
			[ className ]: !! className,
			[ `smb-balloon--${ modifier }` ]: !! modifier,
		}
	);

	return (
		<div className={ classes }>
			<div className="smb-balloon__person">
				<div
					className="smb-balloon__figure"
					style={ balloonFigureStyles }
				>
					<img src={ avatarURL } alt={ avatarAlt } className={ `wp-image-${ avatarID }` } />
				</div>
				<div className="smb-balloon__name">
					{ balloonName }
				</div>
			</div>
			<div className="smb-balloon__body">
				<RichText.Content value={ balloonBody } />
			</div>
		</div>
	);
}
