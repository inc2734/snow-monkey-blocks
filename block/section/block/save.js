'use strict';

import classnames from 'classnames';

import { RichText, InnerBlocks } from '@wordpress/block-editor';

import { divider } from '../../../src/js/helper/helper';

export default function( { attributes, className } ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
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

	const Wrapper = wrapperTagName;

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
	if ( backgroundColor ) {
		sectionStyles.backgroundColor = backgroundColor;
		if ( backgroundColor2 ) {
			sectionStyles.backgroundImage = `linear-gradient(${ backgroundColorAngle }deg, ${ backgroundColor } 0%, ${ backgroundColor2 } 100%)`;
		}
	}

	const innerStyles = {
		paddingTop: Math.abs( topDividerLevel ),
		paddingBottom: Math.abs( bottomDividerLevel ),
	};

	return (
		<Wrapper className={ classes } style={ sectionStyles }>
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
					{ ! RichText.isEmpty( title ) &&
						'none' !== titleTagName && (
							<RichText.Content
								tagName={ titleTagName }
								className="smb-section__title"
								value={ title }
							/>
						) }

					<div className="smb-section__body">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</Wrapper>
	);
}
