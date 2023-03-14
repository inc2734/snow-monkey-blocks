import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		avatarID,
		avatarAlt,
		avatarURL,
		avatarBorderColor,
		backgroundColor,
		balloonName,
		modifier,
	} = attributes;

	const styles = {
		'--smb-balloon--background-color': backgroundColor || undefined,
		'--smb-balloon--border-color': backgroundColor || undefined,
		'--smb-balloon--avatar-border-color': avatarBorderColor || undefined,
	};

	const classes = classnames( 'smb-balloon', {
		[ className ]: !! className,
		[ `smb-balloon--${ modifier }` ]: !! modifier,
	} );

	return (
		<div { ...useBlockProps.save( { className: classes, style: styles } ) }>
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
			<div
				className="smb-balloon__body"
				{ ...useInnerBlocksProps.save() }
			/>
		</div>
	);
}
