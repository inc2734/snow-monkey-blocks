import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import { getColumnSize } from '@smb/helper';

import { SectionBackground } from '../section/components/background';
import { Save as Header } from '../section/components/header';

export default function ( { attributes, className } ) {
	const {
		align,

		textColor,
		headingPosition,
		headingColumnSize,
		contentJustification,
		itemsAlignment,

		title,
		subtitle,
		lede,

		wrapperTagName,
		titleTagName,
		height,
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
		fixedBackgroundColor,
		fixedBackgroundGradientColor,
		fixedBackgroundTexture,
		fixedBackgroundTextureOpacity,
		topDividerType,
		topDividerLevel,
		topDividerColor,
		topDividerVerticalPosition,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
		bottomDividerVerticalPosition,
	} = attributes;

	const { textColumnWidth, imageColumnWidth } = getColumnSize(
		headingColumnSize
	);

	const isItemsAlignmentable = 'fit' !== height;

	const TagName = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-side-heading',
		className,
		{
			[ `smb-section--${ height }` ]: !! height,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
		}
	);

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]: !! contentJustification,
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

	const rowClasses = classnames( 'c-row', 'c-row--md-margin', {
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

	const sectionStyles = {};
	if ( textColor ) {
		sectionStyles.color = textColor;
	}

	const contentsWrapperStyles = {
		width: !! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
	};

	return (
		<TagName
			{ ...useBlockProps.save( {
				className: classes,
				style: sectionStyles,
			} ) }
		>
			<SectionBackground
				{ ...{
					backgroundHorizontalPosition,
					backgroundVerticalPosition,
					isBackgroundNoOver,
					backgroundColor,
					backgroundGradientColor,
					backgroundTexture,
					backgroundTextureOpacity,
					fixedBackgroundColor,
					fixedBackgroundGradientColor,
					fixedBackgroundTexture,
					fixedBackgroundTextureOpacity,
					topDividerType,
					topDividerLevel,
					topDividerColor,
					topDividerVerticalPosition,
					bottomDividerType,
					bottomDividerLevel,
					bottomDividerColor,
					bottomDividerVerticalPosition,
				} }
			/>

			<div className={ innerClasses }>
				<div className={ containerClasses }>
					<div
						className={ contentsWrapperClasses }
						style={ contentsWrapperStyles }
					>
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
