import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'c-row__col', className );

	return (
		<>
			<div { ...useBlockProps.save( { className: classes } ) }>
				<div className="smb-items__item">
					<div className="smb-items__item__body">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</>
	);
}
