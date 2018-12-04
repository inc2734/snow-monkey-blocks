'use strict';

import classnames from 'classnames';

const { RichText } = wp.editor;

export const deprecated = [
	{
		attributes: {
			avatarID: {
				type: 'number',
				default: 0,
			},
			avatarURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
				default: 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g',
			},
			avatarBorderColor: {
				type: 'string',
			},
			balloonName: {
				type: 'string',
				default: '',
			},
			balloonBody: {
				source: 'html',
				selector: '.smb-balloon__body',
			},
			modifier: {
				type: 'string',
				default: '',
			},
		},

		save( { attributes } ) {
			const { avatarURL, avatarBorderColor, balloonName, balloonBody, modifier } = attributes;

			return (
				<div className={ classnames( 'smb-balloon', { [ `smb-balloon--${ modifier }` ]: !! modifier } ) }>
					<div className="smb-balloon__person">
						<div
							className="smb-balloon__figure"
							style={ { borderColor: avatarBorderColor } }
						>
							<img src={ avatarURL } alt="" />
						</div>
						<div className="smb-balloon__name">
							{ balloonName }
						</div>
					</div>
					<div className="smb-balloon__body">
						<RichText.Content value={ balloonBody } />
					</div>
				</div>
			);
		},
	},
];
