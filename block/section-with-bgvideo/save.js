import classnames from 'classnames';

import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { getVideoId } from './utils';

export default function ( { attributes, className } ) {
	const {
		titleTagName,
		title,
		subtitle,
		lede,
		videoURL,
		videoWidth,
		videoHeight,
		height,
		contentsAlignment,
		maskColor,
		maskGradientColor,
		maskOpacity,
		textColor,
		contentsMaxWidth,
		isSlim,
		contentJustification,
		itemsAlignment,
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
			[ `smb-section--${ height }` ]: !! height,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
		}
	);

	const bgvideoClasses = classnames( 'smb-section-with-bgimage__bgimage' );

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]: !! contentJustification,
	} );

	const contentsWrapperClasses = classnames(
		'smb-section__contents-wrapper',
		{
			[ `smb-section__contents-wrapper--${ contentsAlignment }` ]: !! contentsAlignment,
			'u-slim-width': isSlim && ! contentsMaxWidth,
		}
	);

	const hasTitle = ! RichText.isEmpty( title ) && 'none' !== titleTagName;
	const hasSubTitle = ! RichText.isEmpty( subtitle );
	const hasLede = ! RichText.isEmpty( lede );

	const sectionStyles = {
		color: textColor || undefined,
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
			<div
				className="smb-section-with-bgimage__mask"
				style={ maskStyles }
			/>
			<div className={ bgvideoClasses } style={ bgvideoStyles }>
				{ videoURL && (
					<>
						<iframe
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							src={ `https://www.youtube.com/embed/${ getVideoId(
								videoURL
							) }?controls=0&autoplay=1&showinfo=0&rel=0&disablekb=1&iv_load_policy=3&loop=1&playlist=${ getVideoId(
								videoURL
							) }&playsinline=1&modestbranding=1&mute=1` }
							width={ videoWidth }
							height={ videoHeight }
							frameBorder="0"
							title={ videoURL }
						/>
						<img
							src={ `https://i.ytimg.com/vi/${ getVideoId(
								videoURL
							) }/maxresdefault.jpg` }
							alt=""
						/>
					</>
				) }
			</div>

			<div className={ innerClasses } style={ innerStyles }>
				<div className="c-container">
					<div
						className={ contentsWrapperClasses }
						style={ contentsWrapperStyles }
					>
						<div className="smb-section__header">
							{ hasTitle && hasSubTitle && (
								<RichText.Content
									tagName="div"
									className="smb-section__subtitle"
									value={ subtitle }
								/>
							) }

							{ hasTitle && (
								<RichText.Content
									tagName={ titleTagName }
									className="smb-section__title"
									value={ title }
								/>
							) }

							{ hasTitle && hasLede && (
								<div className="smb-section__lede-wrapper">
									<RichText.Content
										tagName="div"
										className="smb-section__lede"
										value={ lede }
									/>
								</div>
							) }
						</div>

						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		</TagName>
	);
}
