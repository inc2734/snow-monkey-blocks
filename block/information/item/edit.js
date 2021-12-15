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
	const { label } = attributes;
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
						<RichText
							className="smb-information__item__label"
							placeholder={ __(
								'Write label…',
								'snow-monkey-blocks'
							) }
							value={ label }
							onChange={ onChangeLabel }
						/>
					</div>
					<div className={ bodyColumnClasses }>
						<div { ...innerBlocksProps } />
					</div>
				</div>
			</div>
		</>
	);
}
