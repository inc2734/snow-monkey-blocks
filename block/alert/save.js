import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { title, content, modifier, icon } = attributes;

	const classes = classnames( 'smb-alert', {
		[ className ]: !! className,
		[ `smb-alert--${ modifier }` ]: !! modifier,
	} );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			{ ! RichText.isEmpty( title ) && (
				<div className="smb-alert__title">
					<i className={ `fas fa-${ icon }` } />
					<strong>
						<RichText.Content value={ title } />
					</strong>
				</div>
			) }

			<div className="smb-alert__body">
				<RichText.Content value={ content } />
			</div>
		</div>
	);
}
