'use strict';

import classnames from 'classnames';

import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { toNumber } from '../../../src/js/helper/helper';
import ResponsiveTabPanel from '../../../src/js/component/responsive-tab-panel';



import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { apply } from '../slider';
import { generateConfig } from './utils';
import $ from 'jquery';
import 'slick-carousel';

export default function( { attributes, setAttributes, className, isSelected, clientId } ) {
	const { hasSelectedInnerBlock, getBlockOrder, getBlock } = useSelect( ( select ) => {
		return select( 'core/block-editor' );
	}, [ isSelected ] );

	useEffect( () => {
		const sliders = document.querySelectorAll( '[data-smb-slider]' );
		forEachHtmlNodes( sliders, apply );
		//const sliders = document.querySelectorAll( '.smb-slider__canvas' );
		//forEachHtmlNodes( sliders, ( slider ) => {
		//	$( slider ).slick();
		//} );
	}, [ isSelected ] );

	const childBlocks = getBlockOrder( clientId ).map( ( innerBlockId ) => getBlock( innerBlockId ) );
	const childBlocksDOMString = childBlocks.map( ( block ) => block.originalContent ).join( '' );

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
		autoplay,
		autoplaySpeed,
		fade,
		rtl,
	} = attributes;

	const allowedBlocks = [ 'snow-monkey-blocks/slider--item' ];
	const template = [ [ 'snow-monkey-blocks/slider--item' ] ];

	const classes = classnames( 'smb-slider', className );

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

		const config = generateConfig( {
			slidesToShow,
			slidesToScroll,
			mdSlidesToShow,
			mdSlidesToScroll,
			smSlidesToShow,
			smSlidesToScroll,
			dots,
			arrows,
			speed,
			autoplay,
			autoplaySpeed: autoplaySpeed * 1000,
			fade,
			rtl,
		} );

		const dir = true === config.rtl ? 'rtl' : 'ltr';

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

			{ ! isSelected && ! hasSelectedInnerBlock( clientId ) ? (
				<div className={ classes }>
					<div
						className="smb-slider__canvas"
						dir={ dir }
						data-smb-slider={ JSON.stringify( config ) }
						dangerouslySetInnerHTML={ { __html: childBlocksDOMString } }
					/>
				</div>
			) : (
				<div className={ classes }>
					<div className="smb-slider__canvas">
						<InnerBlocks
							allowedBlocks={ allowedBlocks }
							template={ template }
							templateLock={ false }
						/>
					</div>
				</div>
			) }
		</>
	);
}
