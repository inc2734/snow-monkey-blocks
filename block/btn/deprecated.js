import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			align: [ 'left', 'center', 'right' ],
		},

		save( { attributes, className } ) {
			const {
				content,
				url,
				target,
				modifier,
				borderRadius,
				backgroundColor,
				textColor,
				wrap,
			} = attributes;

			const wrapperClasses = classnames(
				'u-clearfix',
				'smb-btn-wrapper',
				className
			);

			const classes = classnames( 'smb-btn', {
				[ `smb-btn--${ modifier }` ]: !! modifier,
				'smb-btn--wrap': wrap,
			} );

			const btnStyles = {
				backgroundColor: backgroundColor || undefined,
				borderRadius:
					'undefined' !== typeof borderRadius
						? `${ borderRadius }px`
						: undefined,
			};
			if ( 'is-style-ghost' === attributes.className ) {
				btnStyles.borderColor = backgroundColor || undefined;
			}

			const btnLabelStyles = {
				color: textColor || undefined,
			};

			return (
				<div className={ wrapperClasses }>
					<a
						className={ classes }
						href={ url }
						style={ btnStyles }
						target={ '_self' === target ? undefined : target }
						rel={
							'_self' === target
								? undefined
								: 'noopener noreferrer'
						}
					>
						<span
							className="smb-btn__label"
							style={ btnLabelStyles }
						>
							<RichText.Content value={ content } />
						</span>
					</a>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			align: [ 'left', 'center', 'right' ],
		},

		save( { attributes } ) {
			const {
				content,
				url,
				target,
				modifier,
				backgroundColor,
				textColor,
			} = attributes;

			return (
				<div className="u-clearfix smb-btn-wrapper">
					<a
						className={ classnames( 'smb-btn', {
							[ `smb-btn--${ modifier }` ]: !! modifier,
						} ) }
						href={ url }
						style={ { backgroundColor } }
						target={ '_self' === target ? undefined : target }
						rel={
							'_self' === target
								? undefined
								: 'noopener noreferrer'
						}
					>
						<span
							className="smb-btn__label"
							style={ { color: textColor } }
						>
							<RichText.Content value={ content } />
						</span>
					</a>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			align: [ 'left', 'center', 'right' ],
		},

		save( { attributes } ) {
			const {
				content,
				url,
				target,
				modifier,
				backgroundColor,
				textColor,
			} = attributes;

			return (
				<div className="u-clearfix smb-btn-wrapper">
					<a
						className={ classnames( 'smb-btn', {
							[ `smb-btn--${ modifier }` ]: !! modifier,
						} ) }
						href={ url }
						target={ target }
						style={ { backgroundColor } }
					>
						<span
							className="smb-btn__label"
							style={ { color: textColor } }
						>
							<RichText.Content value={ content } />
						</span>
					</a>
				</div>
			);
		},
	},
];
