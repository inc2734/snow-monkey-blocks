'use strict';

import { toNumber } from '../../../src/js/helper/helper';
import blockAttributes from './attributes';

import {
	Fragment,
} from '@wordpress/element';

import {
	sprintf,
} from '@wordpress/i18n';

export default [
	{
		attributes: blockAttributes,

		save( { attributes } ) {
			const { evaluationValue, iconColor, isDisplayNumeric, numericAlign, numericColor } = attributes;

			const renderSaveEvaluationIcon = () => {
				const outputEvaluationIcons = [];
				const evaluationNumber = toNumber( evaluationValue, 0, 5 );
				const fillIconCount = Math.floor( evaluationNumber );
				const emptyIconCount = 5 - Math.ceil( evaluationNumber );
				const halfIconCount = ( fillIconCount + emptyIconCount ) === 5 ? 0 : 1;

				for ( let i = 0; i < fillIconCount; i++ ) {
					outputEvaluationIcons.push( <i className="fas fa-star" /> );
				}

				if ( halfIconCount !== 0 ) {
					outputEvaluationIcons.push( <i className="fas fa-star-half-alt" /> );
				}

				for (
					let j = 0; j < emptyIconCount; j++ ) {
					outputEvaluationIcons.push( <i className="far fa-star" /> );
				}

				return (
					<Fragment>
						{ outputEvaluationIcons }
					</Fragment>
				);
			};

			return (
				<div className="smb-evaluation-star">
					<div className="smb-evaluation-star__body">
						{ isDisplayNumeric &&
							<span
								className={ `smb-evaluation-star__numeric smb-evaluation-star__numeric--${ numericAlign }` }
								style={ { color: numericColor } }
							>
								{ sprintf( '%.1f', Number( evaluationValue ) ) }
							</span>
						}
						<div
							className="smb-evaluation-star__icon"
							style={ { color: iconColor } }
						>
							{ renderSaveEvaluationIcon() }
						</div>
					</div>
				</div>
			);
		},
	},
];
