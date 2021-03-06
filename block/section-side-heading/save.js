import classnames from 'classnames';

import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { getColumnSize, divider } from '@smb/helper';

export default function ( { attributes, className } ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		subtitle,
		lede,
		backgroundColor,
		backgroundGradientColor,
		textColor,
		headingPosition,
		headingColumnSize,
		isSlim,
		topDividerType,
		topDividerLevel,
		topDividerColor,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
	} = attributes;

	const { textColumnWidth, imageColumnWidth } = getColumnSize(
		headingColumnSize
	);

	const TagName = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-side-heading',
		className
	);

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

	const sectionStyles = {};
	if ( textColor ) {
		sectionStyles.color = textColor;
	}
	if ( backgroundColor || backgroundGradientColor ) {
		sectionStyles.backgroundColor = backgroundColor;
		sectionStyles.backgroundImage = backgroundGradientColor;
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

			<div className="smb-section__inner" style={ innerStyles }>
				<div className={ containerClasses }>
					<div className={ rowClasses }>
						<div className={ headingColClasses }>
							{ ! RichText.isEmpty( title ) &&
								! RichText.isEmpty( subtitle ) && (
									<RichText.Content
										tagName="div"
										className="smb-section__subtitle smb-section-side-heading__subtitle"
										value={ subtitle }
									/>
								) }

							{ ! RichText.isEmpty( title ) && (
								<RichText.Content
									tagName={ titleTagName }
									className="smb-section__title smb-section-side-heading__title"
									value={ title }
								/>
							) }

							{ ! RichText.isEmpty( title ) &&
								! RichText.isEmpty( lede ) && (
									<RichText.Content
										tagName="div"
										className="smb-section__lede smb-section-side-heading__lede"
										value={ lede }
									/>
								) }
						</div>
						<div className={ contentColClasses }>
							<div className="smb-section__body smb-section-side-heading__body">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				</div>
			</div>
		</TagName>
	);
}
