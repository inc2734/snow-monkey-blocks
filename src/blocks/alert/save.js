import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { title, modifier, icon } = attributes;

	const classes = classnames( 'smb-alert', {
		[ className ]: !! className,
		[ `smb-alert--${ modifier }` ]: !! modifier,
	} );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			{ ! RichText.isEmpty( title ) && (
				<div className="smb-alert__title">
					<i className={ `fa-solid fa-${ icon }` } />
					<strong>
						<RichText.Content value={ title } />
					</strong>
				</div>
			) }

			<div
				{ ...useInnerBlocksProps.save( {
					className: 'smb-alert__body',
				} ) }
			/>
		</div>
	);
}
