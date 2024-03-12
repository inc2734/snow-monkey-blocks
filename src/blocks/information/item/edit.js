import classnames from 'classnames';

import {
	InnerBlocks,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { getColumnSize } from '@smb/helper';

export default function ( {
	attributes,
	setAttributes,
	className,
	clientId,
	context,
} ) {
	const { label, templateLock } = attributes;

	const {
		'snow-monkey-blocks/labelColumnSize': labelColumnSize,
		'snow-monkey-blocks/smIsSplitColumn': smIsSplitColumn,
	} = context;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	useEffect( () => {
		setAttributes( {
			labelColumnSize,
			smIsSplitColumn,
		} );
		// Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ labelColumnSize, smIsSplitColumn ] );

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

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-information__item__body',
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeLabel = ( value ) =>
		setAttributes( {
			label: value,
		} );

	return (
		<>
			<div { ...blockProps }>
				<div className="c-row">
					<div className={ labelColumnClasses }>
						<div className="smb-information__item__label">
							<RichText
								placeholder={ __(
									'Write label…',
									'snow-monkey-blocks'
								) }
								value={ label }
								onChange={ onChangeLabel }
							/>
						</div>
					</div>
					<div className={ bodyColumnClasses }>
						<div { ...innerBlocksProps } />
					</div>
				</div>
			</div>
		</>
	);
}
