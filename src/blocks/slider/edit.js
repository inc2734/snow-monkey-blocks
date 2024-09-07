import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/slider-item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/slider-item' ] ];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		slidesToShow,
		slidesToScroll,
		mdSlidesToShow,
		mdSlidesToScroll,
		smSlidesToShow,
		smSlidesToScroll,
		dots,
		arrows,
		speed,
		autoplaySpeed,
		fade,
		rtl,
		aspectRatio,
		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-slider', className );

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

	const aspectRatioOptions = [
		{
			value: '',
			label: __( 'Default', 'snow-monkey-blocks' ),
		},
		{
			value: '16to9',
			label: __( '16:9', 'snow-monkey-blocks' ),
		},
		{
			value: '4to3',
			label: __( '4:3', 'snow-monkey-blocks' ),
		},
	];

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							dots !== metadata.attributes.dots.default
						}
						isShownByDefault
						label={ __(
							'Show dot indicators',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								dots: metadata.attributes.dots.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Show dot indicators',
								'snow-monkey-blocks'
							) }
							checked={ dots }
							onChange={ ( value ) =>
								setAttributes( {
									dots: value,
								} )
							}
						/>
					</ToolsPanelItem>

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

					<ToolsPanelItem
						hasValue={ () =>
							fade !== metadata.attributes.fade.default
						}
						isShownByDefault
						label={ __( 'Enable fade', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								fade: metadata.attributes.fade.default,
							} )
						}
					>
						<ToggleControl
							label={ __( 'Enable fade', 'snow-monkey-blocks' ) }
							checked={ fade }
							onChange={ ( value ) =>
								setAttributes( {
									fade: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							rtl !== metadata.attributes.rtl.default
						}
						isShownByDefault
						label={ __(
							"Change the slider's direction to become right-to-left",
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								rtl: metadata.attributes.rtl.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								"Change the slider's direction to become right-to-left",
								'snow-monkey-blocks'
							) }
							checked={ rtl }
							onChange={ ( value ) =>
								setAttributes( {
									rtl: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							aspectRatio !==
							metadata.attributes.aspectRatio.default
						}
						isShownByDefault
						label={ __( 'Aspect ratio', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								aspectRatio:
									metadata.attributes.aspectRatio.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Aspect ratio', 'snow-monkey-blocks' ) }
							value={ aspectRatio }
							onChange={ ( value ) =>
								setAttributes( {
									aspectRatio: value,
								} )
							}
							options={ aspectRatioOptions }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							slidesToShow !==
								metadata.attributes.slidesToShow.default ||
							slidesToScroll !==
								metadata.attributes.slidesToScroll.default ||
							mdSlidesToShow !==
								metadata.attributes.mdSlidesToShow.default ||
							mdSlidesToScroll !==
								metadata.attributes.mdSlidesToScroll.default ||
							smSlidesToShow !==
								metadata.attributes.smSlidesToShow.default ||
							smSlidesToScroll !==
								metadata.attributes.smSlidesToScroll.default
						}
						isShownByDefault
						label={ __( 'Slides settings', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								slidesToShow:
									metadata.attributes.slidesToShow.default,
								slidesToScroll:
									metadata.attributes.slidesToScroll.default,
								mdSlidesToShow:
									metadata.attributes.mdSlidesToShow.default,
								mdSlidesToScroll:
									metadata.attributes.mdSlidesToScroll
										.default,
								smSlidesToShow:
									metadata.attributes.smSlidesToShow.default,
								smSlidesToScroll:
									metadata.attributes.smSlidesToScroll
										.default,
							} )
						}
					>
						<ResponsiveTabPanel
							desktop={ () => (
								<>
									<RangeControl
										label={ __(
											'# of slides to show (Large window)',
											'snow-monkey-blocks'
										) }
										value={ slidesToShow }
										onChange={ ( value ) =>
											setAttributes( {
												slidesToShow: toNumber(
													value,
													1,
													6
												),
											} )
										}
										min="1"
										max="6"
									/>

									<RangeControl
										label={ __(
											'# of slides to scroll (Large window)',
											'snow-monkey-blocks'
										) }
										value={ slidesToScroll }
										onChange={ ( value ) =>
											setAttributes( {
												slidesToScroll: toNumber(
													value,
													1,
													6
												),
											} )
										}
										min="1"
										max="6"
									/>
								</>
							) }
							tablet={ () => (
								<>
									<RangeControl
										label={ __(
											'# of slides to show (Medium window)',
											'snow-monkey-blocks'
										) }
										value={ mdSlidesToShow }
										onChange={ ( value ) =>
											setAttributes( {
												mdSlidesToShow: toNumber(
													value,
													1,
													6
												),
											} )
										}
										min="1"
										max="6"
									/>

									<RangeControl
										label={ __(
											'# of slides to scroll (Medium window)',
											'snow-monkey-blocks'
										) }
										value={ mdSlidesToScroll }
										onChange={ ( value ) =>
											setAttributes( {
												mdSlidesToScroll: toNumber(
													value,
													1,
													6
												),
											} )
										}
										min="1"
										max="6"
									/>
								</>
							) }
							mobile={ () => (
								<>
									<RangeControl
										label={ __(
											'# of slides to show (Small window)',
											'snow-monkey-blocks'
										) }
										value={ smSlidesToShow }
										onChange={ ( value ) =>
											setAttributes( {
												smSlidesToShow: toNumber(
													value,
													1,
													6
												),
											} )
										}
										min="1"
										max="6"
									/>
									<RangeControl
										label={ __(
											'# of slides to scroll (Small window)',
											'snow-monkey-blocks'
										) }
										value={ smSlidesToScroll }
										onChange={ ( value ) =>
											setAttributes( {
												smSlidesToScroll: toNumber(
													value,
													1,
													6
												),
											} )
										}
										min="1"
										max="6"
									/>
								</>
							) }
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
