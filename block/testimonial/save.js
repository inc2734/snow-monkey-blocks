import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const { md, lg } = attributes;

	const classes = classnames( 'smb-testimonial', className );

	return (
		<div className={ classes }>
			<div className="smb-testimonial__body">
				<div
					className="c-row c-row--margin"
					data-columns="1"
					data-md-columns={ md }
					data-lg-columns={ lg }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
