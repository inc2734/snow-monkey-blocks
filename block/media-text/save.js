import { isEmpty } from 'lodash';
import classnames from 'classnames';

import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { getColumnSize } from '@smb/helper';

export default function ( { attributes, className } ) {
	const {
		titleTagName,
		title,
		mediaId,
		mediaUrl,
		mediaAlt,
		mediaWidth,
		mediaHeight,
		mediaType,
		caption,
		mediaPosition,
		verticalAlignment,
		mediaColumnSize,
		mobileOrder,
		href,
		rel,
		linkClass,
		linkTarget,
	} = attributes;

	const newRel = isEmpty( rel ) ? undefined : rel;

	const { textColumnWidth, mediaColumnWidth } = getColumnSize(
		mediaColumnSize
	);

	const classes = classnames( 'smb-media-text', className, {
		[ `smb-media-text--mobile-${ mobileOrder }` ]: !! mobileOrder,
	} );

	const rowClasses = classnames( 'c-row', 'c-row--margin', {
		'c-row--reverse': 'left' === mediaPosition,
		'c-row--top': 'top' === verticalAlignment,
		'c-row--middle': 'center' === verticalAlignment,
		'c-row--bottom': 'bottom' === verticalAlignment,
	} );

	const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--lg-${ textColumnWidth }`,
	] );

	const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--lg-${ mediaColumnWidth }`,
	] );

	const image = (
		<img
			src={ mediaUrl }
			alt={ mediaAlt }
			width={ !! mediaWidth && mediaWidth }
			height={ !! mediaHeight && mediaHeight }
			className={ `wp-image-${ mediaId }` }
		/>
	);

	const video = (
		<video
			controls
			src={ mediaUrl }
			width={ !! mediaWidth && mediaWidth }
			height={ !! mediaHeight && mediaHeight }
		/>
	);

	let figure;
	if ( !! mediaUrl ) {
		if ( 'image' === mediaType || undefined === mediaType ) {
			if ( !! href ) {
				figure = (
					<a
						href={ href }
						target={ linkTarget }
						className={ linkClass }
						rel={ newRel }
					>
						{ image }
					</a>
				);
			} else {
				figure = image;
			}
		} else if ( 'video' === mediaType ) {
			figure = video;
		}
	}

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className={ rowClasses }>
				<div className={ textColumnClasses }>
					{ ! RichText.isEmpty( title ) &&
						'none' !== titleTagName && (
							<RichText.Content
								className="smb-media-text__title"
								tagName={ titleTagName }
								value={ title }
							/>
						) }

					<div className="smb-media-text__body">
						<InnerBlocks.Content />
					</div>
				</div>

				<div className={ imageColumnClasses }>
					<div className="smb-media-text__figure">{ figure }</div>

					{ ! RichText.isEmpty( caption ) && (
						<div className="smb-media-text__caption">
							<RichText.Content value={ caption } />
						</div>
					) }
				</div>
			</div>
		</div>
	);
}
