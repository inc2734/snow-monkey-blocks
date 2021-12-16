import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef, useState } from '@wordpress/element';
import { Icon, warning } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';
import { toNumber } from '@smb/helper';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/spider-contents-slider-item' ];

export default function ( {
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId,
} ) {
	const {
		arrows,
		dots,
		fade,
		shifted,
		gutter,
		interval,
		duration,
		lgSlidesToShow,
		mdSlidesToShow,
		smSlidesToShow,
		canvasPadding,
		sliderClientIds: _sliderClientIds,
	} = attributes;
	const sliderClientIds = JSON.parse( _sliderClientIds );

	const isAlignwide = 'wide' === attributes.align;
	const isAlignfull = 'full' === attributes.align;
	const isShiftable = ! fade;
	const isShifted = shifted && isShiftable && ( isAlignwide || isAlignfull );

	const ref = useRef();
	const referenceRef = useRef();
	const canvasRef = useRef();

	const [ currentSliderClientId, setCurrentSliderClientId ] = useState(
		undefined
	);

	const { updateBlockAttributes, selectBlock } = useDispatch(
		'core/block-editor'
	);

	const nowSliderClientIds = useSelect(
		( select ) => {
			return select( 'core/block-editor' ).getBlockOrder( clientId );
		},
		[ clientId ]
	);

	const maxBlur = useSelect(
		( select ) => {
			const slides = select( 'core/block-editor' ).getBlock( clientId )
				.innerBlocks;

			const maxBlurSlide = slides.reduce( ( prevSlide, currentSlide ) => {
				const prevBlur =
					( !! prevSlide?.attributes?.boxShadow?.color &&
						prevSlide?.attributes?.boxShadow?.blur ) ||
					0;
				const currentBlur =
					( !! currentSlide?.attributes?.boxShadow?.color &&
						currentSlide?.attributes?.boxShadow?.blur ) ||
					0;
				return prevBlur < currentBlur ? currentSlide : prevSlide;
			} );

			return maxBlurSlide?.attributes?.boxShadow?.blur;
		},
		[ clientId ]
	);

	useEffect( () => {
		setAttributes( {
			canvasPadding: {
				...canvasPadding,
				top: maxBlur,
				bottom: maxBlur,
			},
		} );
	}, [ maxBlur ] );

	const selectedSlide = useSelect(
		( select ) => {
			const slides = select( 'core/block-editor' ).getBlock( clientId )
				.innerBlocks;

			const selectedSlideClientIds = slides.filter(
				( slide ) =>
					slide.clientId ===
					select( 'core/block-editor' ).getSelectedBlockClientId()
			);

			if ( 0 < selectedSlideClientIds.length ) {
				setCurrentSliderClientId( selectedSlideClientIds[ 0 ] );
				return selectedSlideClientIds[ 0 ];
			}

			return undefined;
		},
		[ clientId ]
	);

	useEffect( () => {
		if ( 0 < nowSliderClientIds.length && ! currentSliderClientId ) {
			setCurrentSliderClientId( nowSliderClientIds[ 0 ] );
		}

		setAttributes( {
			sliderClientIds: JSON.stringify( nowSliderClientIds ),
		} );

		nowSliderClientIds.forEach( ( sliderClientId, index ) => {
			updateBlockAttributes( sliderClientId, { sliderId: index } );
		} );
	}, [ nowSliderClientIds ] );

	useEffect( () => {
		const width =
			!! ref.current &&
			!! canvasRef.current &&
			isShifted &&
			Math.floor( ref.current.offsetWidth );
		if ( !! width ) {
			ref.current.style.setProperty(
				'--spider-canvas-width',
				`${ width }px`
			);
			canvasRef.current.style.width = `${ width }px`;
		}

		const referenceWidth =
			!! referenceRef.current &&
			isShifted &&
			Math.floor( referenceRef.current.offsetWidth );
		if ( !! referenceWidth ) {
			ref.current.style.setProperty(
				'--spider-reference-width',
				`${ referenceWidth }px`
			);
		}
	}, [ !! ref.current && ref.current.offsetWidth ] );

	const classes = classnames(
		'smb-spider-slider',
		'smb-spider-contents-slider',
		className,
		{
			'smb-spider-slider--shifted': isShifted,
			[ `smb-spider-slider--gutter-${ gutter }` ]: !! gutter,
		}
	);

	const canvasStyles = {
		paddingTop: canvasPadding?.top || undefined,
		paddingBottom: canvasPadding?.bottom || undefined,
	};

	const gutterOptions = [
		{
			value: '',
			label: __( 'None', 'snow-monkey-blocks' ),
		},
		{
			value: 's',
			label: __( 'S', 'snow-monkey-blocks' ),
		},
		{
			value: 'm',
			label: __( 'M', 'snow-monkey-blocks' ),
		},
		{
			value: 'l',
			label: __( 'L', 'snow-monkey-blocks' ),
		},
	];

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'spider__canvas',
			style: canvasStyles,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			orientation: 'horizontal',
			renderAppender: false,
		}
	);

	const onChangeArrows = ( value ) =>
		setAttributes( {
			arrows: value,
		} );

	const onChangeDots = ( value ) =>
		setAttributes( {
			dots: value,
		} );

	const onChangeFade = ( value ) =>
		setAttributes( {
			fade: value,
		} );

	const onChangeShifted = ( value ) =>
		setAttributes( {
			shifted: value,
		} );

	const onChangeGutter = ( value ) =>
		setAttributes( {
			gutter: value,
		} );

	const onChangeInterval = ( value ) =>
		setAttributes( {
			interval: toNumber( value, 0, 10 ),
		} );

	const onChangeDuration = ( value ) =>
		setAttributes( {
			duration: toNumber( value, 0, 10 ),
		} );

	const onChangeLgSlidesToShow = ( value ) =>
		setAttributes( {
			lgSlidesToShow: toNumber( value, 1, 6 ),
		} );

	const onChangeMdSlidesToShow = ( value ) =>
		setAttributes( {
			mdSlidesToShow: toNumber( value, 1, 6 ),
		} );

	const onChangeSmSlidesToShow = ( value ) =>
		setAttributes( {
			smSlidesToShow: toNumber( value, 1, 6 ),
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Dimensions', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Block spacing', 'snow-monkey-blocks' ) }
						value={ gutter }
						onChange={ onChangeGutter }
						options={ gutterOptions }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToggleControl
						label={ __( 'Display arrows', 'snow-monkey-blocks' ) }
						checked={ arrows }
						onChange={ onChangeArrows }
					/>

					<ToggleControl
						label={ __( 'Display dots', 'snow-monkey-blocks' ) }
						checked={ dots }
						onChange={ onChangeDots }
					/>

					<ToggleControl
						label={ __( 'Fade', 'snow-monkey-blocks' ) }
						checked={ fade }
						onChange={ onChangeFade }
					/>

					{ isShiftable && (
						<ToggleControl
							label={ __(
								'Shifting the slider',
								'snow-monkey-blocks'
							) }
							help={
								shifted &&
								( ! isAlignfull || ! isAlignwide ) && (
									<>
										<Icon
											icon={ warning }
											style={ { fill: '#d94f4f' } }
										/>
										{ __(
											'It must be full width (.alignfull) or wide width (.alignwide).',
											'snow-monkey-blocks'
										) }
									</>
								)
							}
							checked={ shifted }
							onChange={ onChangeShifted }
						/>
					) }

					<RangeControl
						label={ __(
							'Autoplay Speed in seconds',
							'snow-monkey-blocks'
						) }
						help={ __(
							'If "0", no scroll.',
							'snow-monkey-blocks'
						) }
						value={ interval }
						onChange={ onChangeInterval }
						min="0"
						max="10"
					/>

					<RangeControl
						label={ __(
							'Animation speed in seconds',
							'snow-monkey-blocks'
						) }
						help={ __(
							'If "0", default animation speed.',
							'snow-monkey-blocks'
						) }
						value={ duration }
						onChange={ onChangeDuration }
						min="0"
						max="5"
						step="0.1"
					/>

					{ ! fade && (
						<ResponsiveTabPanel
							desktop={ () => (
								<RangeControl
									label={ __(
										'# of slides to show (Large window)',
										'snow-monkey-blocks'
									) }
									value={ lgSlidesToShow }
									onChange={ onChangeLgSlidesToShow }
									min="1"
									max={
										6 < sliderClientIds.length
											? 6
											: sliderClientIds.length
									}
								/>
							) }
							tablet={ () => (
								<RangeControl
									label={ __(
										'# of slides to show (Medium window)',
										'snow-monkey-blocks'
									) }
									value={ mdSlidesToShow }
									onChange={ onChangeMdSlidesToShow }
									min="1"
									max={
										6 < sliderClientIds.length
											? 6
											: sliderClientIds.length
									}
								/>
							) }
							mobile={ () => (
								<RangeControl
									label={ __(
										'# of slides to show (Small window)',
										'snow-monkey-blocks'
									) }
									value={ smSlidesToShow }
									onChange={ onChangeSmSlidesToShow }
									min="1"
									max={
										6 < sliderClientIds.length
											? 6
											: sliderClientIds.length
									}
								/>
							) }
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div
				{ ...useBlockProps( { className: classes, ref } ) }
				data-fade={ fade ? 'true' : 'false' }
				data-lg-slide-to-show={
					! fade && 1 < lgSlidesToShow ? lgSlidesToShow : undefined
				}
				data-md-slide-to-show={
					! fade && 1 < mdSlidesToShow ? mdSlidesToShow : undefined
				}
				data-sm-slide-to-show={
					! fade && 1 < smSlidesToShow ? smSlidesToShow : undefined
				}
			>
				<div className="spider">
					{ isShifted && (
						<div className="c-container">
							<div
								className="spider__reference"
								ref={ referenceRef }
							/>
						</div>
					) }
					<div { ...innerBlocksProps } ref={ canvasRef } />

					{ arrows && (
						<div className="spider__arrows">
							<button
								className="spider__arrow"
								data-direction="prev"
							>
								Prev
							</button>
							<button
								className="spider__arrow"
								data-direction="next"
							>
								Next
							</button>
						</div>
					) }
				</div>

				{ dots && (
					<div className="spider__dots">
						{ sliderClientIds.map( ( sliderClientId, index ) => {
							return (
								<button
									className="spider__dot"
									data-id={ index }
									key={ index }
								>
									{ index }
								</button>
							);
						} ) }
					</div>
				) }

				{ ( isSelected || !! selectedSlide ) && (
					<div
						style={ {
							display: 'flex',
							gap: '3px',
							marginTop: '1rem',
						} }
					>
						{ sliderClientIds.map( ( sliderClientId, index ) => {
							const isActive =
								currentSliderClientId === sliderClientId ||
								selectedSlide?.clientId === sliderClientId;
							return (
								<Button
									isPrimary={ isActive }
									isSecondary={ ! isActive }
									onClick={ () => {
										setCurrentSliderClientId(
											sliderClientId
										);
										selectBlock( sliderClientId );
									} }
									key={ index }
								>
									{ index + 1 }
								</Button>
							);
						} ) }

						<InnerBlocks.ButtonBlockAppender />
					</div>
				) }
			</div>
		</>
	);
}
