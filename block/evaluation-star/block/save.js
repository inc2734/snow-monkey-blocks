'use strict';

import classnames from 'classnames';

import { sprintf } from '@wordpress/i18n';

import { toNumber } from '../../../src/js/helper/helper';

export default function( { attributes, className } ) {
	const {
		evaluationValue,
		iconColor,
		isDisplayNumeric,
		numericAlign,
		numericColor,
	} = attributes;

	const generateIcons = () => {
		const icons = [];
		const evaluationNumber = toNumber( evaluationValue, 0, 5 );
		const fillIconCount = Math.floor( evaluationNumber );
		const emptyIconCount = 5 - Math.ceil( evaluationNumber );
		const halfIconCount = fillIconCount + emptyIconCount === 5 ? 0 : 1;

		for ( let i = 0; i < fillIconCount; i++ ) {
			icons.push( <i className="fas fa-star" /> );
		}

		if ( halfIconCount !== 0 ) {
			icons.push( <i className="fas fa-star-half-alt" /> );
		}

		for ( let j = 0; j < emptyIconCount; j++ ) {
			icons.push( <i className="far fa-star" /> );
		}

		return icons;
	};

	const classes = classnames( 'smb-evaluation-star', className );

	const bodyClasses = classnames( 'smb-evaluation-star__numeric', [
		`smb-evaluation-star__numeric--${ numericAlign }`,
	] );

	const evaluationStarBodyStyles = {
		color: numericColor || undefined,
	};

	const evaluationStarIconStyles = {
		color: iconColor || undefined,
	};

	return (
		<div className={ classes }>
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
