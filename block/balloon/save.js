import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		avatarID,
		avatarAlt,
		avatarURL,
		avatarBorderColor,
		backgroundColor,
		textColor,
		balloonName,
		balloonBody,
		modifier,
	} = attributes;

	const balloonFigureStyles = {
		borderColor: avatarBorderColor || undefined,
	};

	const bodyStyles = {
		backgroundColor: backgroundColor || undefined,
		borderColor: backgroundColor || undefined,
		color: textColor || undefined,
	};

	const classes = classnames( 'smb-balloon', {
		[ className ]: !! className,
		[ `smb-balloon--${ modifier }` ]: !! modifier,
	} );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className="smb-balloon__person">
				<div
					className="smb-balloon__figure"
					style={ balloonFigureStyles }
				>
					<img
						src={ avatarURL }
						alt={ avatarAlt }
						className={ `wp-image-${ avatarID }` }
					/>
				</div>
				<div className="smb-balloon__name">{ balloonName }</div>
			</div>
			<div className="smb-balloon__body" style={ bodyStyles }>
				<RichText.Content value={ balloonBody } />
			</div>
		</div>
	);
}
