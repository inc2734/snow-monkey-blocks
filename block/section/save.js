import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { SectionBackground } from './components/background';
import { Save as Header } from './components/header';

export default function ( { attributes, className } ) {
	const {
		textColor,
		contentsAlignment,
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

	const TagName = wrapperTagName;

	const isItemsAlignmentable = 'fit' !== height;

	const classes = classnames( 'smb-section', className, {
		[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
		[ `smb-section--${ height }` ]: !! height,
		[ `is-items-alignment-${ itemsAlignment }` ]:
			!! itemsAlignment && isItemsAlignmentable,
	} );

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]: !! contentJustification,
	} );

	const containerClasses = classnames( 'c-container', {
		alignfull: 'full' === containerAlign,
		alignwide: 'wide' === containerAlign,
	} );

	const contentsWrapperClasses = classnames(
		'smb-section__contents-wrapper',
		{
			[ `smb-section__contents-wrapper--${ contentsAlignment }` ]: !! contentsAlignment,
			'u-slim-width': isSlim && ! contentsMaxWidth,
		}
	);

	const sectionStyles = {};
	if ( textColor ) {
		sectionStyles.color = textColor;
	}

	const contentsWrapperStyles = {
		maxWidth:
			!! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
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
						<Header
							{ ...{
								title,
								titleTagName,
								subtitle,
								lede,
							} }
						/>

						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		</TagName>
	);
}
