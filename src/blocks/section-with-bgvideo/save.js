import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import { SectionBackground } from '../section/components/background';
import { Save as Header } from '../section/components/header';

export default function ( { attributes, className } ) {
	const {
		align,

		contentsAlignment,
		maskColor,
		maskGradientColor,
		maskOpacity,
		textColor,
		contentJustification,
		itemsAlignment,

		title,
		subtitle,
		lede,

		titleTagName,
		height,
		disableCustomHeight,
		containerAlign,
		disableContainerPadding,
		contentsMaxWidth,
		isSlim,

		backgroundText,
	} = attributes;

	const TagName = 'div';

	const isItemsAlignmentable = 'fit' !== height;

	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		'smb-section-with-bgvideo',
		className,
		{
			[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
			[ `smb-section--${ height }` ]: !! height && disableCustomHeight,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
		}
	);

	const bgvideoClasses = classnames( 'smb-section-with-bgimage__bgimage' );

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]:
			!! contentJustification,
	} );

	const containerClasses = classnames( 'c-container', {
		alignfull:
			( 'full' === containerAlign ||
				'contents-full' === containerAlign ) &&
			'full' === align,
		alignwide:
			'wide' === containerAlign ||
			( 'contents-wide' === containerAlign && 'full' === align ),
		'c-container--no-padding': disableContainerPadding,
	} );

	let headerContainerClasses = containerClasses
		.replace( 'c-container--no-padding', '' )
		.trim();
	if (
		'contents-wide' === containerAlign ||
		'contents-full' === containerAlign
	) {
		headerContainerClasses = headerContainerClasses
			.replace( 'alignfull', '' )
			.replace( 'alignwide', '' )
			.trim();
	}

	const contentsWrapperClasses = classnames(
		'smb-section__contents-wrapper',
		{
			[ `smb-section__contents-wrapper--${ contentsAlignment }` ]:
				!! contentsAlignment,
			'u-slim-width': isSlim && ! contentsMaxWidth,
		}
	);

	const sectionStyles = {
		color: textColor || undefined,
		'--smb-section--min-height':
			!! height && ! disableCustomHeight ? height : undefined,
	};

	const maskStyles = {};
	if ( maskColor || maskGradientColor ) {
		maskStyles.backgroundColor = maskColor;
		maskStyles.backgroundImage = maskGradientColor;
	}

	const bgvideoStyles = {
		opacity: maskOpacity,
	};

	const innerStyles = {};

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
			<div
				className="smb-section-with-bgimage__mask"
				style={ maskStyles }
			/>
			<div className={ bgvideoClasses } style={ bgvideoStyles }></div>

			<SectionBackground
				{ ...{
					backgroundText,
					containerClasses,
				} }
			/>

			<div className={ innerClasses } style={ innerStyles }>
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
								hasContainer:
									( disableContainerPadding &&
										'full' === containerAlign &&
										'full' === align ) ||
									'contents-wide' === containerAlign ||
									'contents-full' === containerAlign,
								containerClassName: headerContainerClasses,
							} }
						/>

						<div
							{ ...useInnerBlocksProps.save( {
								className: 'smb-section__body',
							} ) }
						/>
					</div>
				</div>
			</div>
		</TagName>
	);
}
