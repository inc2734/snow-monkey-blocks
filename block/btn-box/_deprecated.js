'use strict';

const { RichText } = wp.editor;
const { __ } = wp.i18n;

export const deprecated = [
	{
		attributes: {
			lede: {
				source: 'html',
				selector: '.smb-btn-box__lede',
			},
			note: {
				source: 'html',
				selector: '.smb-btn-box__note',
			},
			backgroundColor: {
				type: 'string',
			},
			btnLabel: {
				source: 'html',
				selector: '.smb-btn__label',
				default: __( 'Button', 'snow-monkey-blocks' ),
			},
			btnURL: {
				type: 'string',
				default: '',
			},
			btnTarget: {
				type: 'string',
				default: '_self',
			},
			btnBackgroundColor: {
				type: 'string',
			},
			btnTextColor: {
				type: 'string',
			},
		},

		save( { attributes } ) {
			const { lede, note, backgroundColor, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor } = attributes;

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
						{ ! RichText.isEmpty( lede ) &&
							<div className="smb-btn-box__lede">
								<RichText.Content value={ lede } />
							</div>
						}

						<a
							className="smb-btn smb-btn--full" href={ btnURL } target={ btnTarget } style={ btnStyle }>
							<span className="smb-btn__label" style={ btnLabelStyle }>
								<RichText.Content value={ btnLabel } />
							</span>
						</a>

						{ ! RichText.isEmpty( note ) &&
							<div className="smb-btn-box__note">
								<RichText.Content value={ note } />
							</div>
						}
					</div>
				</div>
			);
		},
	},
];
