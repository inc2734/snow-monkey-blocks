import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	RangeControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/thumbnail-gallery-item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/thumbnail-gallery-item' ] ];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { arrows, speed, autoplaySpeed, templateLock } = attributes;

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
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							arrows !== metadata.attributes.arrows.default
						}
						isShownByDefault
						label={ __( 'Prev/Next arrows', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								arrows: metadata.attributes.arrows.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Prev/Next arrows',
								'snow-monkey-blocks'
							) }
							checked={ arrows }
							onChange={ ( value ) =>
								setAttributes( {
									arrows: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							speed !== metadata.attributes.speed.default
						}
						isShownByDefault
						label={ __(
							'Slide animation speed in milliseconds',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								speed: metadata.attributes.speed.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Slide animation speed in milliseconds',
								'snow-monkey-blocks'
							) }
							value={ speed }
							onChange={ ( value ) =>
								setAttributes( {
									speed: toNumber( value, 100, 1000 ),
								} )
							}
							min="100"
							max="1000"
							step="100"
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							autoplaySpeed !==
							metadata.attributes.autoplaySpeed.default
						}
						isShownByDefault
						label={ __(
							'Autoplay Speed in seconds',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								autoplaySpeed:
									metadata.attributes.autoplaySpeed.default,
								autoplay: metadata.attributes.autoplay.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Autoplay Speed in seconds',
								'snow-monkey-blocks'
							) }
							value={ autoplaySpeed }
							onChange={ ( value ) => {
								const newValue = toNumber( value, 0, 10 );
								setAttributes( { autoplaySpeed: newValue } );
								if ( 0 < newValue ) {
									setAttributes( { autoplay: true } );
								} else {
									setAttributes( { autoplay: false } );
								}
							} }
							min="0"
							max="10"
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } data-columns="2" />
			</div>
		</>
	);
}
