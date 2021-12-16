import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import { useMigrateDoubleHyphenToSingleHyphen } from '@smb/hooks';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/thumbnail-gallery-item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/thumbnail-gallery-item' ] ];

export default function ( { attributes, setAttributes, className, clientId } ) {
	useMigrateDoubleHyphenToSingleHyphen( clientId, [
		{
			oldBlockName: 'snow-monkey-blocks/thumbnail-gallery--item',
			newBlockName: 'snow-monkey-blocks/thumbnail-gallery-item',
		},
	] );

	const { arrows, speed, autoplaySpeed } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-thumbnail-gallery', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: [ 'c-row', 'c-row--margin' ],
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeArrows = ( value ) =>
		setAttributes( {
			arrows: value,
		} );

	const onChangeSpeed = ( value ) =>
		setAttributes( {
			speed: toNumber( value, 100, 1000 ),
		} );

	const onChangeAutoplaySpeed = ( value ) => {
		const newValue = toNumber( value, 0, 10 );
		setAttributes( { autoplaySpeed: newValue } );
		if ( 0 < newValue ) {
			setAttributes( { autoplay: true } );
		} else {
			setAttributes( { autoplay: false } );
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToggleControl
						label={ __( 'Prev/Next arrows', 'snow-monkey-blocks' ) }
						checked={ arrows }
						onChange={ onChangeArrows }
					/>
					<RangeControl
						label={ __(
							'Slide animation speed in milliseconds',
							'snow-monkey-blocks'
						) }
						value={ speed }
						onChange={ onChangeSpeed }
						min="100"
						max="1000"
						step="100"
					/>
					<RangeControl
						label={ __(
							'Autoplay Speed in seconds',
							'snow-monkey-blocks'
						) }
						value={ autoplaySpeed }
						onChange={ onChangeAutoplaySpeed }
						min="0"
						max="10"
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } data-columns="2" />
			</div>
		</>
	);
}
