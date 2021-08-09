import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';
const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			align: [ 'wide', 'full' ],
			anchor: true,
		},

		save( { attributes, className } ) {
			const {
				wrapperTagName,
				titleTagName,
				title,
				subtitle,
				lede,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
				imageMediaType,
				textColor,
				imagePosition,
				imageSize,
				verticalAlignment,
				contentSize,
				contentHorizontalPosition,
				contentVerticalPosition,
				contentBackgroundColor,
				contentBackgroundOpacity,
				contentPadding,
				removeContentOutsidePadding,
				shadowColor,
				shadowHorizontalPosition,
				shadowVerticalPosition,
				maskColor,
				maskOpacity,
				mobileOrder,
			} = attributes;

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-break-the-grid',
				`smb-section-break-the-grid--${ imagePosition }`,
				{
					[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
						contentVerticalPosition &&
						verticalAlignment &&
						'middle' !== verticalAlignment,
					[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]: !! mobileOrder,
					[ className ]: !! className,
				}
			);

			const rowClasses = classnames( 'c-row', 'c-row--margin', {
				'c-row--lg-top': 'top' === verticalAlignment,
				'c-row--lg-middle': 'center' === verticalAlignment,
				'c-row--lg-bottom': 'bottom' === verticalAlignment,
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

			const figureClasses = classnames(
				'smb-section-break-the-grid__figure',
				{
					[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
				}
			);

			const contentClasses = classnames(
				'smb-section-break-the-grid__content',
				{
					[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
					[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
					[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
					'smb-section-break-the-grid__content--remove-outside-p':
						contentPadding && removeContentOutsidePadding,
				}
			);

			const shadowClasses = classnames(
				'smb-section-break-the-grid__shadow'
			);

			const maskClasses = classnames(
				'smb-section-break-the-grid__mask'
			);

			const sectionStyles = {
				color: textColor || undefined,
			};

			const shadowStyles = {};
			if ( shadowColor ) {
				shadowStyles.backgroundColor = shadowColor;
			}
			if ( shadowHorizontalPosition || shadowVerticalPosition ) {
				shadowStyles.transform = `translate(${
					shadowHorizontalPosition || 0
				}%, ${ shadowVerticalPosition || 0 }%)`;
			}

			const contentStyles = {
				backgroundColor:
					contentBackgroundColor &&
					hexToRgba(
						contentBackgroundColor,
						contentBackgroundOpacity
					),
			};

			const maskStyles = {};
			if ( maskColor ) {
				maskStyles.backgroundColor = maskColor;
			}

			const figureStyles = {
				opacity: !! maskColor ? maskOpacity : undefined,
			};

			const image = (
				<img
					src={ imageURL }
					alt={ imageAlt }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					className={ `wp-image-${ imageID }` }
					style={ figureStyles }
				/>
			);

			const video = (
				<video
					controls
					src={ imageURL }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					style={ figureStyles }
				/>
			);

			let figure;
			if ( !! imageURL ) {
				if (
					'image' === imageMediaType ||
					undefined === imageMediaType
				) {
					figure = image;
				} else if ( 'video' === imageMediaType ) {
					figure = video;
				}
			}

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					<div className="c-container">
						<div className={ rowClasses }>
							<div className={ textColumnClasses }>
								<div
									className={ contentClasses }
									style={ contentStyles }
								>
									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( subtitle ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__subtitle smb-section-break-the-grid__subtitle"
												value={ subtitle }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName={ titleTagName }
												className="smb-section__title smb-section-break-the-grid__title"
												value={ title }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( lede ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__lede smb-section-break-the-grid__lede"
												value={ lede }
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

									{ 0 <
										Number(
											( 1 - maskOpacity ).toFixed( 1 )
										) && (
										<div
											className={ maskClasses }
											style={ maskStyles }
										/>
									) }

									{ figure }
								</div>
							</div>
						</div>
					</div>
				</TagName>
			);
		},
	},

	{
		attributes: {
			...blockAttributes,
			verticalAlignment: {
				type: 'string',
				default: 'middle',
			},
		},

		migrate( attributes ) {
			return {
				...attributes,
				verticalAlignment:
					'middle' === attributes.verticalAlignment
						? 'center'
						: attributes.verticalAlignment,
			};
		},

		save( { attributes, className } ) {
			const {
				wrapperTagName,
				titleTagName,
				title,
				subtitle,
				lede,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
				imageMediaType,
				textColor,
				imagePosition,
				imageSize,
				verticalAlignment,
				contentSize,
				contentHorizontalPosition,
				contentVerticalPosition,
				contentBackgroundColor,
				contentBackgroundOpacity,
				contentPadding,
				removeContentOutsidePadding,
				shadowColor,
				shadowHorizontalPosition,
				shadowVerticalPosition,
				maskColor,
				maskOpacity,
				mobileOrder,
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
					[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]: !! mobileOrder,
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

			const figureClasses = classnames(
				'smb-section-break-the-grid__figure',
				{
					[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
				}
			);

			const contentClasses = classnames(
				'smb-section-break-the-grid__content',
				{
					[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
					[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
					[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
					'smb-section-break-the-grid__content--remove-outside-p':
						contentPadding && removeContentOutsidePadding,
				}
			);

			const shadowClasses = classnames(
				'smb-section-break-the-grid__shadow'
			);

			const maskClasses = classnames(
				'smb-section-break-the-grid__mask'
			);

			const sectionStyles = {
				color: textColor || undefined,
			};

			const shadowStyles = {};
			if ( shadowColor ) {
				shadowStyles.backgroundColor = shadowColor;
			}
			if ( shadowHorizontalPosition || shadowVerticalPosition ) {
				shadowStyles.transform = `translate(${
					shadowHorizontalPosition || 0
				}%, ${ shadowVerticalPosition || 0 }%)`;
			}

			const contentStyles = {
				backgroundColor:
					contentBackgroundColor &&
					hexToRgba(
						contentBackgroundColor,
						contentBackgroundOpacity
					),
			};

			const maskStyles = {};
			if ( maskColor ) {
				maskStyles.backgroundColor = maskColor;
			}

			const figureStyles = {
				opacity: maskOpacity,
			};

			const image = (
				<img
					src={ imageURL }
					alt={ imageAlt }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					className={ `wp-image-${ imageID }` }
					style={ figureStyles }
				/>
			);

			const video = (
				<video
					controls
					src={ imageURL }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					style={ figureStyles }
				/>
			);

			let figure;
			if ( !! imageURL ) {
				if (
					'image' === imageMediaType ||
					undefined === imageMediaType
				) {
					figure = image;
				} else if ( 'video' === imageMediaType ) {
					figure = video;
				}
			}

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
										! RichText.isEmpty( subtitle ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__subtitle smb-section-break-the-grid__subtitle"
												value={ subtitle }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName={ titleTagName }
												className="smb-section__title smb-section-break-the-grid__title"
												value={ title }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( lede ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__lede smb-section-break-the-grid__lede"
												value={ lede }
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

									{ 0 <
										Number(
											( 1 - maskOpacity ).toFixed( 1 )
										) && (
										<div
											className={ maskClasses }
											style={ maskStyles }
										/>
									) }

									{ figure }
								</div>
							</div>
						</div>
					</div>
				</Wrapper>
			);
		},
	},
];
