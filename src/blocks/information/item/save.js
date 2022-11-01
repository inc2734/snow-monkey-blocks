import classnames from 'classnames';

import { getColumnSize } from '@smb/helper';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { label, labelColumnSize, smIsSplitColumn } = attributes;

	const {
		imageColumnWidth: labelColumnWidth,
		textColumnWidth: bodyColumnWidth,
	} = getColumnSize( labelColumnSize );

	const classes = classnames( 'smb-information__item', className );
	const labelColumnClasses = classnames( 'c-row__col', {
		'c-row__col--1-1': ! smIsSplitColumn,
		[ `c-row__col--md-${ labelColumnWidth }` ]: ! smIsSplitColumn,
		[ `c-row__col--${ labelColumnWidth }` ]: smIsSplitColumn,
	} );
	const bodyColumnClasses = classnames( 'c-row__col', {
		'c-row__col--1-1': ! smIsSplitColumn,
		[ `c-row__col--md-${ bodyColumnWidth }` ]: ! smIsSplitColumn,
		[ `c-row__col--${ bodyColumnWidth }` ]: smIsSplitColumn,
	} );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className="c-row">
				<div className={ labelColumnClasses }>
					<RichText.Content
						tagName="div"
						className="smb-information__item__label"
						value={ label }
					/>
				</div>
				<div className={ bodyColumnClasses }>
					<div
						{ ...useInnerBlocksProps.save( {
							className: 'smb-information__item__body',
						} ) }
					/>
				</div>
			</div>
		</div>
	);
}
