import classnames from 'classnames';

import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/slider--item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/slider--item' ] ];

export default function ( { attributes, setAttributes, className } ) {
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
	} = attributes;

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
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
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

	const onChangeDots = ( value ) =>
		setAttributes( {
			dots: value,
		} );

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

	const onChangeFade = ( value ) =>
		setAttributes( {
			fade: value,
		} );

	const onChangeRtl = ( value ) =>
		setAttributes( {
			rtl: value,
		} );

	const onChangeAspectRatio = ( value ) =>
		setAttributes( {
			aspectRatio: value,
		} );

	const onChangeSlidesToShow = ( value ) =>
		setAttributes( {
			slidesToShow: toNumber( value, 1, 6 ),
		} );

	const onChangeSlidestoScroll = ( value ) =>
		setAttributes( {
			slidesToScroll: toNumber( value, 1, 6 ),
		} );

	const onChangeMdSlidesToShow = ( value ) =>
		setAttributes( {
			mdSlidesToShow: toNumber( value, 1, 6 ),
		} );

	const onChangeMdSlidesToScroll = ( value ) =>
		setAttributes( {
			mdSlidesToScroll: toNumber( value, 1, 6 ),
		} );

	const onChangeSmSlidesToShow = ( value ) =>
		setAttributes( {
			smSlidesToShow: toNumber( value, 1, 6 ),
		} );

	const onChangeSmSlidesToScroll = ( value ) =>
		setAttributes( {
			smSlidesToScroll: toNumber( value, 1, 6 ),
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<ToggleControl
						label={ __(
							'Show dot indicators',
							'snow-monkey-blocks'
						) }
						checked={ dots }
						onChange={ onChangeDots }
					/>

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

					<ToggleControl
						label={ __( 'Enable fade', 'snow-monkey-blocks' ) }
						checked={ fade }
						onChange={ onChangeFade }
					/>

					<ToggleControl
						label={ __(
							"Change the slider's direction to become right-to-left",
							'snow-monkey-blocks'
						) }
						checked={ rtl }
						onChange={ onChangeRtl }
					/>

					<SelectControl
						label={ __( 'Aspect ratio', 'snow-monkey-blocks' ) }
						value={ aspectRatio }
						onChange={ onChangeAspectRatio }
						options={ aspectRatioOptions }
					/>

					<ResponsiveTabPanel
						desktop={ () => (
							<>
								<RangeControl
									label={ __(
										'# of slides to show (Large window)',
										'snow-monkey-blocks'
									) }
									value={ slidesToShow }
									onChange={ onChangeSlidesToShow }
									min="1"
									max="6"
								/>
								<RangeControl
									label={ __(
										'# of slides to scroll (Large window)',
										'snow-monkey-blocks'
									) }
									value={ slidesToScroll }
									onChange={ onChangeSlidestoScroll }
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
									onChange={ onChangeMdSlidesToShow }
									min="1"
									max="6"
								/>
								<RangeControl
									label={ __(
										'# of slides to scroll (Medium window)',
										'snow-monkey-blocks'
									) }
									value={ mdSlidesToScroll }
									onChange={ onChangeMdSlidesToScroll }
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
									onChange={ onChangeSmSlidesToShow }
									min="1"
									max="6"
								/>
								<RangeControl
									label={ __(
										'# of slides to scroll (Small window)',
										'snow-monkey-blocks'
									) }
									value={ smSlidesToScroll }
									onChange={ onChangeSmSlidesToScroll }
									min="1"
									max="6"
								/>
							</>
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } data-columns="2" />
			</div>
		</>
	);
}
