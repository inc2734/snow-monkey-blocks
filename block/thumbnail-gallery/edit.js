import classnames from 'classnames';

import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/thumbnail-gallery--item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/thumbnail-gallery--item' ] ];

export default function ( { attributes, setAttributes, className } ) {
	const { arrows, speed, autoplaySpeed } = attributes;

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
			renderAppender: InnerBlocks.ButtonBlockAppender,
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
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<ToggleControl
						label={ __( 'Prev/Next Arrows', 'snow-monkey-blocks' ) }
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
