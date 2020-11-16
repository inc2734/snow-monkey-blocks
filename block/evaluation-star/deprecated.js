import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';
import { sprintf } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
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
				const halfIconCount =
					fillIconCount + emptyIconCount === 5 ? 0 : 1;

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

			const classes = classnames( 'smb-evaluation-star', className, {
				[ `smb-evaluation-star--title-${ titleAlign }` ]:
					'left' !== titleAlign,
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
				<div className={ classes }>
					{ ! RichText.isEmpty( title ) && (
						<RichText.Content
							tagName="span"
							className="smb-evaluation-star__title"
							value={ attributes.name }
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
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes } ) {
			const {
				evaluationValue,
				iconColor,
				isDisplayNumeric,
				numericAlign,
				numericColor,
			} = attributes;

			const renderSaveEvaluationIcon = () => {
				const outputEvaluationIcons = [];
				const evaluationNumber = toNumber( evaluationValue, 0, 5 );
				const fillIconCount = Math.floor( evaluationNumber );
				const emptyIconCount = 5 - Math.ceil( evaluationNumber );
				const halfIconCount =
					fillIconCount + emptyIconCount === 5 ? 0 : 1;

				for ( let i = 0; i < fillIconCount; i++ ) {
					outputEvaluationIcons.push( <i className="fas fa-star" /> );
				}

				if ( halfIconCount !== 0 ) {
					outputEvaluationIcons.push(
						<i className="fas fa-star-half-alt" />
					);
				}

				for ( let j = 0; j < emptyIconCount; j++ ) {
					outputEvaluationIcons.push( <i className="far fa-star" /> );
				}

				return <>{ outputEvaluationIcons }</>;
			};

			return (
				<div className="smb-evaluation-star">
					<div className="smb-evaluation-star__body">
						{ isDisplayNumeric && (
							<span
								className={ `smb-evaluation-star__numeric smb-evaluation-star__numeric--${ numericAlign }` }
								style={ { color: numericColor } }
							>
								{ sprintf( '%.1f', Number( evaluationValue ) ) }
							</span>
						) }
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
