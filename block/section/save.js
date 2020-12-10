import classnames from 'classnames';

import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { divider } from '@smb/helper';

export default function ( { attributes, className } ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		subtitle,
		lede,
		backgroundHorizontalPosition,
		backgroundVerticalPosition,
		backgroundColor,
		backgroundColor2,
		backgroundColorAngle,
		textColor,
		isSlim,
		topDividerType,
		topDividerLevel,
		topDividerColor,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
	} = attributes;

	const TagName = wrapperTagName;

	const classes = classnames( 'smb-section', className );

	const topDividerClasses = classnames(
		'smb-section__divider',
		'smb-section__divider--top',
		`smb-section__divider--${ topDividerType }`
	);

	const bottomDividerClasses = classnames(
		'smb-section__divider',
		'smb-section__divider--bottom',
		`smb-section__divider--${ bottomDividerType }`
	);

	const containerClasses = classnames( 'c-container', {
		'u-slim-width': !! isSlim,
	} );

	const sectionStyles = {};
	if ( textColor ) {
		sectionStyles.color = textColor;
	}
	if ( 0 < backgroundVerticalPosition ) {
		if ( !! topDividerLevel ) {
			sectionStyles.backgroundColor = topDividerColor;
		}
	} else if ( 0 > backgroundVerticalPosition ) {
		if ( !! bottomDividerLevel ) {
			sectionStyles.backgroundColor = bottomDividerColor;
		}
	}

	const backgroundStyles = {};
	if ( backgroundColor ) {
		backgroundStyles.backgroundColor = backgroundColor;
		if ( backgroundColor2 ) {
			backgroundStyles.backgroundImage = `linear-gradient(${ backgroundColorAngle }deg, ${ backgroundColor } 0%, ${ backgroundColor2 } 100%)`;
		}

		if ( backgroundHorizontalPosition || backgroundVerticalPosition ) {
			backgroundStyles.transform = `translate(${
				backgroundHorizontalPosition || 0
			}%, ${ backgroundVerticalPosition || 0 }%)`;
		}

		/*
		if ( 0 < backgroundHorizontalPosition ) {
			backgroundStyles.left = `${ Math.abs(
				backgroundHorizontalPosition
			) }%`;
		} else if ( 0 > backgroundHorizontalPosition ) {
			backgroundStyles.right = `${ Math.abs(
				backgroundHorizontalPosition
			) }%`;
		}

		if ( 0 < backgroundVerticalPosition ) {
			backgroundStyles.top = `${ Math.abs(
				backgroundVerticalPosition
			) }%`;
		} else if ( 0 > backgroundVerticalPosition ) {
			backgroundStyles.bottom = `${ Math.abs(
				backgroundVerticalPosition
			) }%`;
		}
		*/
	}

	const innerStyles = {
		paddingTop: Math.abs( topDividerLevel ),
		paddingBottom: Math.abs( bottomDividerLevel ),
	};

	return (
		<TagName
			{ ...useBlockProps.save( {
				className: classes,
				style: sectionStyles,
			} ) }
		>
			{ ( 0 < Object.keys( backgroundStyles ).length ||
				!! topDividerLevel ||
				!! bottomDividerLevel ) && (
				<div
					className="smb-section__background"
					style={ backgroundStyles }
				>
					{ !! topDividerLevel && (
						<div className={ topDividerClasses }>
							{ divider(
								topDividerType,
								topDividerLevel,
								topDividerColor
							) }
						</div>
					) }

					{ !! bottomDividerLevel && (
						<div className={ bottomDividerClasses }>
							{ divider(
								bottomDividerType,
								bottomDividerLevel,
								bottomDividerColor
							) }
						</div>
					) }
				</div>
			) }

			<div className="smb-section__inner" style={ innerStyles }>
				<div className={ containerClasses }>
					{ ! RichText.isEmpty( title ) &&
						! RichText.isEmpty( subtitle ) &&
						'none' !== titleTagName && (
							<RichText.Content
								tagName="div"
								className="smb-section__subtitle"
								value={ subtitle }
							/>
						) }

					{ ! RichText.isEmpty( title ) &&
						'none' !== titleTagName && (
							<RichText.Content
								tagName={ titleTagName }
								className="smb-section__title"
								value={ title }
							/>
						) }

					{ ! RichText.isEmpty( title ) &&
						! RichText.isEmpty( lede ) &&
						'none' !== titleTagName && (
							<RichText.Content
								tagName="div"
								className="smb-section__lede"
								value={ lede }
							/>
						) }

					<div className="smb-section__body">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</TagName>
	);
}
