import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		showAvatar,
		avatarID,
		avatarAlt,
		avatarURL,
		avatarBorderColor,
		avatarBorderStyle,
		avatarBorderWidth,
		backgroundColor,
		borderColor,
		borderStyle,
		borderWidth,
		textColor,
		balloonName,
		modifier,
	} = attributes;

	const styles = {
		'--smb-balloon--background-color': backgroundColor || undefined,
		'--smb-balloon--border-color':
			borderColor || backgroundColor || undefined,
		'--smb-balloon--border-style': borderStyle || undefined,
		'--smb-balloon--border-width': borderWidth || undefined,
		'--smb-balloon--color': textColor || undefined,
		'--smb-balloon--avatar-border-color': avatarBorderColor || undefined,
		'--smb-balloon--avatar-border-style': avatarBorderStyle || undefined,
		'--smb-balloon--avatar-border-width': avatarBorderWidth || undefined,
	};

	const classes = classnames( 'smb-balloon', {
		[ className ]: !! className,
		[ `smb-balloon--${ modifier }` ]: !! modifier,
	} );

	return (
		<div { ...useBlockProps.save( { className: classes, style: styles } ) }>
			{ showAvatar && (
				<div className="smb-balloon__person">
					<div className="smb-balloon__figure">
						<img
							src={ avatarURL }
							alt={ avatarAlt }
							className={ `wp-image-${ avatarID }` }
						/>
					</div>
					<div className="smb-balloon__name">
						<RichText.Content value={ balloonName } />
					</div>
				</div>
			) }

			<div
				{ ...useInnerBlocksProps.save( {
					className: 'smb-balloon__body',
				} ) }
			/>
		</div>
	);
}
