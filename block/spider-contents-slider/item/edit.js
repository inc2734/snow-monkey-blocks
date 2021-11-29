import classnames from 'classnames';

import {
	BlockControls,
	InnerBlocks,
	useBlockProps,
	__experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function ( {
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId,
} ) {
	const { sliderId, contentPosition } = attributes;

	const ref = useRef();

	const hasInnerBlocks = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlock( clientId ).innerBlocks
				.length > 0,
		[ clientId ]
	);

	useEffect( () => {
		if ( isSelected ) {
			const thisSlider = ref.current.parentNode;
			const canvas = thisSlider.parentNode;
			const thisSliderLeft = thisSlider.getBoundingClientRect().left;
			const thisSliderRight = thisSliderLeft + thisSlider.offsetWidth;
			const canvasLeft = canvas.getBoundingClientRect().left;
			const canvasRight = canvasLeft + canvas.offsetWidth;
			if (
				canvasRight < thisSliderRight ||
				canvasLeft > thisSliderLeft
			) {
				canvas.scrollLeft = thisSlider.offsetLeft;
			}
		}
	}, [ clientId, isSelected, sliderId ] );

	const classes = classnames( 'spider__slide', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-spider-contents-slider__item',
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			{ !! contentPosition && (
				<BlockControls group="block">
					<BlockAlignmentMatrixControl
						label={ __(
							'Change content position',
							'snow-monkey-blocks'
						) }
						value={ contentPosition }
						onChange={ ( nextPosition ) => {
							setAttributes( {
								contentPosition: nextPosition,
							} );
						} }
						isDisabled={ ! hasInnerBlocks }
					/>
				</BlockControls>
			) }

			<div
				{ ...blockProps }
				data-id={ sliderId }
				data-content-position={
					contentPosition?.replace( ' ', '-' ) || undefined
				}
			>
				<div { ...innerBlocksProps } ref={ ref } />
			</div>
		</>
	);
}
