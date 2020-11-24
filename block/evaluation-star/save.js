import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';
import { sprintf } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

export default function ( { attributes, className } ) {
	const {
		evaluationValue,
		iconColor,
		isDisplayNumeric,
		numericAlign,
		numericColor,
		title,
		titleAlign,
	} = attributes;

	const generateIcons = () => {
		const icons = [];
		const evaluationNumber = toNumber( evaluationValue, 0, 5 );
		const fillIconCount = Math.floor( evaluationNumber );
		const emptyIconCount = 5 - Math.ceil( evaluationNumber );
		const halfIconCount = fillIconCount + emptyIconCount === 5 ? 0 : 1;

		for ( let i = 0; i < fillIconCount; i++ ) {
			icons.push( <i className="fas fa-star" key={ `fill${ i }` } /> );
		}

		if ( halfIconCount !== 0 ) {
			icons.push( <i className="fas fa-star-half-alt" key="half1" /> );
		}

		for ( let j = 0; j < emptyIconCount; j++ ) {
			icons.push( <i className="far fa-star" key={ `empty${ j }` } /> );
		}

		return icons;
	};

	const classes = classnames( 'smb-evaluation-star', className, {
		[ `smb-evaluation-star--title-${ titleAlign }` ]: 'left' !== titleAlign,
	} );

	const bodyClasses = classnames(
		'smb-evaluation-star__numeric',
		`smb-evaluation-star__numeric--${ numericAlign }`
	);

	const evaluationStarBodyStyles = {
		color: numericColor || undefined,
	};

	const evaluationStarIconStyles = {
		color: iconColor || undefined,
	};

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			{ ! RichText.isEmpty( title ) && (
				<RichText.Content
					tagName="span"
					className="smb-evaluation-star__title"
					value={ title }
				/>
			) }

			<div className="smb-evaluation-star__body">
				{ isDisplayNumeric && (
					<span
						className={ bodyClasses }
						style={ evaluationStarBodyStyles }
					>
						{ sprintf( '%.1f', Number( evaluationValue ) ) }
					</span>
				) }
				<div
					className="smb-evaluation-star__icon"
					style={ evaluationStarIconStyles }
				>
					{ generateIcons() }
				</div>
			</div>
		</div>
	);
}
