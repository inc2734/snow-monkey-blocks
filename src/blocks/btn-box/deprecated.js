import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
			btnURL: {
				type: 'string',
				default: '',
			},
			btnTarget: {
				type: 'string',
				default: '_self',
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes, className } ) {
			const {
				lede,
				note,
				backgroundColor,
				btnLabel,
				btnURL,
				btnTarget,
				btnBackgroundColor,
				btnTextColor,
				btnSize,
				btnBorderRadius,
				btnWrap,
			} = attributes;

			const classes = classnames( 'smb-btn-box', className );

			const btnClasses = classnames( 'smb-btn', {
				[ `smb-btn--${ btnSize }` ]: !! btnSize,
				'smb-btn--wrap': btnWrap,
			} );

			const btnBoxStyle = {
				backgroundColor: backgroundColor || undefined,
			};

			const btnBoxBtnStyles = {
				backgroundColor: btnBackgroundColor || undefined,
				borderRadius:
					'undefined' !== typeof btnBorderRadius
						? `${ btnBorderRadius }px`
						: undefined,
			};
			if ( 'is-style-ghost' === attributes.className ) {
				btnBoxBtnStyles.borderColor = btnBackgroundColor || undefined;
			}

			return (
				<div
					{ ...useBlockProps.save( {
						className: classes,
						style: btnBoxStyle,
					} ) }
				>
					<div className="c-container">
						{ ! RichText.isEmpty( lede ) && (
							<div className="smb-btn-box__lede">
								<RichText.Content value={ lede } />
							</div>
						) }

						<div className="smb-btn-box__btn-wrapper">
							<a
								className={ btnClasses }
								href={ btnURL }
								style={ btnBoxBtnStyles }
								target={
									'_self' === btnTarget
										? undefined
										: btnTarget
								}
								rel={
									'_self' === btnTarget
										? undefined
										: 'noopener noreferrer'
								}
							>
								<span
									className="smb-btn__label"
									style={ { color: btnTextColor } }
								>
									<RichText.Content value={ btnLabel } />
								</span>
							</a>
						</div>

						{ ! RichText.isEmpty( note ) && (
							<div className="smb-btn-box__note">
								<RichText.Content value={ note } />
							</div>
						) }
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			btnURL: {
				type: 'string',
				default: '',
			},
			btnTarget: {
				type: 'string',
				default: '_self',
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const {
				lede,
				note,
				backgroundColor,
				btnLabel,
				btnURL,
				btnTarget,
				btnBackgroundColor,
				btnTextColor,
				btnSize,
			} = attributes;

			return (
				<div className="smb-btn-box" style={ { backgroundColor } }>
					<div className="c-container">
						{ ! RichText.isEmpty( lede ) && (
							<div className="smb-btn-box__lede">
								<RichText.Content value={ lede } />
							</div>
						) }

						<div className="smb-btn-box__btn-wrapper">
							<a
								className={ classnames( 'smb-btn', {
									[ `smb-btn--${ btnSize }` ]: !! btnSize,
								} ) }
								href={ btnURL }
								style={ {
									backgroundColor: btnBackgroundColor,
								} }
								target={
									'_self' === btnTarget
										? undefined
										: btnTarget
								}
								rel={
									'_self' === btnTarget
										? undefined
										: 'noopener noreferrer'
								}
							>
								<span
									className="smb-btn__label"
									style={ { color: btnTextColor } }
								>
									<RichText.Content value={ btnLabel } />
								</span>
							</a>
						</div>

						{ ! RichText.isEmpty( note ) && (
							<div className="smb-btn-box__note">
								<RichText.Content value={ note } />
							</div>
						) }
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			btnURL: {
				type: 'string',
				default: '',
			},
			btnTarget: {
				type: 'string',
				default: '_self',
			},
		},

		save( { attributes } ) {
			const {
				lede,
				note,
				backgroundColor,
				btnLabel,
				btnURL,
				btnTarget,
				btnBackgroundColor,
				btnTextColor,
			} = attributes;

			const btnBoxStyle = {};
			if ( !! backgroundColor && 'null' !== backgroundColor ) {
				btnBoxStyle.backgroundColor = backgroundColor;
			}

			const btnStyle = {};
			if ( !! btnBackgroundColor && 'null' !== btnBackgroundColor ) {
				btnStyle.btnBackgroundColor = btnBackgroundColor;
			}

			const btnLabelStyle = {};
			if ( !! btnTextColor && 'null' !== btnTextColor ) {
				btnLabelStyle.btnTextColor = btnTextColor;
			}

			return (
				<div className="smb-btn-box" style={ btnBoxStyle }>
					<div className="c-container">
						{ ! RichText.isEmpty( lede ) && (
							<div className="smb-btn-box__lede">
								<RichText.Content value={ lede } />
							</div>
						) }

						<a
							className="smb-btn smb-btn--full"
							href={ btnURL }
							target={ btnTarget }
							style={ btnStyle }
						>
							<span
								className="smb-btn__label"
								style={ btnLabelStyle }
							>
								<RichText.Content value={ btnLabel } />
							</span>
						</a>

						{ ! RichText.isEmpty( note ) && (
							<div className="smb-btn-box__note">
								<RichText.Content value={ note } />
							</div>
						) }
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			btnURL: {
				type: 'string',
				default: '',
			},
			btnTarget: {
				type: 'string',
				default: '_self',
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
		},

		save( { attributes } ) {
			const {
				lede,
				note,
				backgroundColor,
				btnLabel,
				btnURL,
				btnTarget,
				btnBackgroundColor,
				btnTextColor,
				btnSize,
			} = attributes;

			return (
				<div className="smb-btn-box" style={ { backgroundColor } }>
					<div className="c-container">
						{ ! RichText.isEmpty( lede ) && (
							<div className="smb-btn-box__lede">
								<RichText.Content value={ lede } />
							</div>
						) }

						<div className="smb-btn-box__btn-wrapper">
							<a
								className={ classnames( 'smb-btn', {
									[ `smb-btn--${ btnSize }` ]: !! btnSize,
								} ) }
								href={ btnURL }
								target={ btnTarget }
								style={ {
									backgroundColor: btnBackgroundColor,
								} }
							>
								<span
									className="smb-btn__label"
									style={ { color: btnTextColor } }
								>
									<RichText.Content value={ btnLabel } />
								</span>
							</a>
						</div>

						{ ! RichText.isEmpty( note ) && (
							<div className="smb-btn-box__note">
								<RichText.Content value={ note } />
							</div>
						) }
					</div>
				</div>
			);
		},
	},
];
