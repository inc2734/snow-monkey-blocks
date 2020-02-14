'use strict';

import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import { RichText, InnerBlocks } from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		imageID,
		imageURL,
		imageAlt,
		textColor,
		imagePosition,
		imageSize,
		verticalAlignment,
		contentSize,
		contentHorizontalPosition,
		contentVerticalPosition,
		contentBackgroundColor,
		contentPadding,
		removeContentOutsidePadding,
		shadowColor,
		shadowHorizontalPosition,
		shadowVerticalPosition,
	} = attributes;

	const Wrapper = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-break-the-grid',
		`smb-section-break-the-grid--${ imagePosition }`,
		{
			[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
				contentVerticalPosition &&
				verticalAlignment &&
				'middle' !== verticalAlignment,
			[ className ]: !! className,
		}
	);

	const rowClasses = classnames( 'c-row', 'c-row--margin', {
		[ `c-row--lg-${ verticalAlignment }` ]: true,
	} );

	const textColumnClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		'c-row__col--lg-1-2'
	);
	const imageColumnClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		'c-row__col--lg-1-2'
	);

	const figureClasses = classnames( 'smb-section-break-the-grid__figure', {
		[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
	} );

	const contentClasses = classnames( 'smb-section-break-the-grid__content', {
		[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
		[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
		[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
		'smb-section-break-the-grid__content--remove-outside-p':
			contentPadding && removeContentOutsidePadding,
	} );

	const shadowClasses = classnames( 'smb-section-break-the-grid__shadow' );

	const sectionStyles = {
		color: textColor || undefined,
	};

	const shadowStyles = {};
	if ( shadowColor ) {
		shadowStyles.backgroundColor = shadowColor;
	}
	if ( shadowHorizontalPosition || shadowVerticalPosition ) {
		shadowStyles.transform = `translate(${ shadowHorizontalPosition ||
			0 }%, ${ shadowVerticalPosition || 0 }%)`;
	}

	const contentStyles = {
		backgroundColor:
			contentBackgroundColor && hexToRgba( contentBackgroundColor, 0.98 ),
	};

	return (
		<Wrapper className={ classes } style={ sectionStyles }>
			<div className="c-container">
				<div className={ rowClasses }>
					<div className={ textColumnClasses }>
						<div
							className={ contentClasses }
							style={ contentStyles }
						>
							{ ! RichText.isEmpty( title ) &&
								'none' !== titleTagName && (
									<RichText.Content
										tagName={ titleTagName }
										className="smb-section__title smb-section-break-the-grid__title"
										value={ title }
									/>
								) }
							<div className="smb-section__body smb-section-break-the-grid__body">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
					<div className={ imageColumnClasses }>
						<div className={ figureClasses }>
							{ shadowColor && (
								<div
									className={ shadowClasses }
									style={ shadowStyles }
								/>
							) }
							{ imageURL && (
								<img
									src={ imageURL }
									alt={ imageAlt }
									className={ `wp-image-${ imageID }` }
								/>
							) }
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
}
