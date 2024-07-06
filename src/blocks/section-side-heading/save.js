import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { getColumnSize } from '@smb/helper';

import {
	generateStylesForSectionBackground,
	SectionBackground,
} from '../section/components/background';

import { Save as Header } from '../section/components/header';

export default function ( { attributes, className } ) {
	const {
		align,

		textColor,
		headingPosition,
		headingColumnSize,
		contentColumnSize,
		contentJustification,
		itemsAlignment,
		gap,

		title,
		subtitle,
		lede,

		wrapperTagName,
		titleTagName,
		height,
		disableCustomHeight,
		containerAlign,
		contentsMaxWidth,
		isSlim,

		backgroundHorizontalPosition,
		backgroundVerticalPosition,
		isBackgroundNoOver,
		backgroundColor,
		backgroundGradientColor,
		backgroundTexture,
		backgroundTextureOpacity,
		backgroundTextureUrl,
		fixedBackgroundColor,
		fixedBackgroundGradientColor,
		fixedBackgroundTexture,
		fixedBackgroundTextureOpacity,
		fixedBackgroundTextureUrl,
		topDividerType,
		topDividerLevel,
		topDividerColor,
		topDividerVerticalPosition,
		topDividerOverlay,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
		bottomDividerVerticalPosition,
		bottomDividerOverlay,
	} = attributes;

	const { textColumnWidth, imageColumnWidth } = getColumnSize(
		headingColumnSize,
		contentColumnSize
	);

	const isItemsAlignmentable = 'fit' !== height;

	const TagName = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-side-heading',
		className,
		{
			[ `smb-section--${ height }` ]: !! height && disableCustomHeight,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
			[ `smb-section--top-divider-no-overlay` ]: ! topDividerOverlay,
			[ `smb-section--bottom-divider-no-overlay` ]:
				! bottomDividerOverlay,
		}
	);

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]:
			!! contentJustification,
	} );

	const containerClasses = classnames( 'c-container', {
		alignfull: 'full' === containerAlign && 'full' === align,
		alignwide: 'wide' === containerAlign && 'full' === align,
	} );

	const contentsWrapperClasses = classnames(
		'smb-section__contents-wrapper',
		{
			'u-slim-width': isSlim && ! contentsMaxWidth,
		}
	);

	const rowClasses = classnames( 'c-row', {
		'c-row--md-margin': 'm' === gap || ! gap,
		[ `c-row--md-margin-${ gap }` ]: 's' === gap || 'l' === gap,
		'c-row--reverse': 'right' === headingPosition,
	} );

	const headingColClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		`c-row__col--md-${ imageColumnWidth }`
	);

	const contentColClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		`c-row__col--md-${ textColumnWidth }`
	);

	const bodyClasses = classnames(
		'smb-section__body',
		'smb-section-side-heading__body'
	);

	const styles = {
		'--smb-section--color': textColor || undefined,
		'--smb-section--contents-wrapper-width':
			!! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
		'--smb-section--min-height':
			!! height && ! disableCustomHeight ? height : undefined,
		...generateStylesForSectionBackground( {
			backgroundHorizontalPosition,
			backgroundVerticalPosition,
			isBackgroundNoOver,
			backgroundColor,
			backgroundGradientColor,
			backgroundTexture,
			backgroundTextureOpacity,
			backgroundTextureUrl,
			fixedBackgroundColor,
			fixedBackgroundGradientColor,
			fixedBackgroundTexture,
			fixedBackgroundTextureOpacity,
			fixedBackgroundTextureUrl,
			topDividerVerticalPosition,
			topDividerLevel,
			bottomDividerVerticalPosition,
			bottomDividerLevel,
			// backgroundText,
		} ),
	};

	// const sectionStyles = {};
	// if ( textColor ) {
	// 	sectionStyles.color = textColor;
	// }

	// const contentsWrapperStyles = {
	// 	width: !! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
	// };

	return (
		<TagName
			{ ...useBlockProps.save( {
				className: classes,
				style: styles,
			} ) }
		>
			<SectionBackground
				{ ...{
					backgroundColor,
					backgroundGradientColor,
					backgroundTexture,
					fixedBackgroundColor,
					fixedBackgroundGradientColor,
					fixedBackgroundTexture,
					topDividerType,
					topDividerLevel,
					topDividerColor,
					bottomDividerType,
					bottomDividerLevel,
					bottomDividerColor,
					// backgroundText,
					containerClasses,
				} }
			/>

			<div className={ innerClasses }>
				<div className={ containerClasses }>
					<div className={ contentsWrapperClasses }>
						<div className={ rowClasses }>
							<div className={ headingColClasses }>
								<Header
									{ ...{
										title,
										titleTagName,
										subtitle,
										lede,
									} }
									className="smb-section-side-heading"
								/>
							</div>
							<div className={ contentColClasses }>
								<div
									{ ...useInnerBlocksProps.save( {
										className: bodyClasses,
									} ) }
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</TagName>
	);
}
