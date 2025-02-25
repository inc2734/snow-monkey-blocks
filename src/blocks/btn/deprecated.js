import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
} from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;
const blockSupports = metadata.supports;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				content,
				url,
				target,
				modifier,
				borderRadius,
				backgroundColor,
				backgroundGradientColor,
				textColor,
				wrap,
			} = attributes;

			const spacingProps = getSpacingClassesAndStyles( attributes );

			const wrapperClasses = classnames( 'smb-btn-wrapper', className, {
				[ `smb-btn-wrapper--${ modifier }` ]: !! modifier,
			} );

			const classes = classnames( 'smb-btn', {
				[ `smb-btn--${ modifier }` ]: !! modifier,
				'smb-btn--wrap': wrap,
			} );

			const styles = {
				'--smb-btn--background-color': backgroundColor || undefined,
				'--smb-btn--background-image':
					backgroundGradientColor || undefined,
				'--smb-btn--border-radius': String( borderRadius ).match(
					/^\d+$/
				)
					? `${ borderRadius }px`
					: borderRadius,
				'--smb-btn--color': textColor || undefined,
				...spacingProps.style,
			};

			if (
				!! attributes.className &&
				attributes.className.split( ' ' ).includes( 'is-style-ghost' )
			) {
				styles[ '--smb-btn--style--ghost--border-color' ] =
					backgroundColor || undefined;
			}

			return (
				<div { ...useBlockProps.save( { className: wrapperClasses } ) }>
					<a
						className={ classes }
						href={ url }
						style={ styles }
						target={ '_self' === target ? undefined : target }
						rel={
							'_self' === target
								? undefined
								: 'noopener noreferrer'
						}
					>
						<span className="smb-btn__label">
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
			borderRadius: {
				type: 'number',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { borderRadius } = attributes;

			attributes.borderRadius = String( borderRadius ).match( /^\d+$/ )
				? `${ borderRadius }px`
				: borderRadius;

			return [ { ...attributes } ];
		},

		save( { attributes, className } ) {
			const {
				content,
				url,
				target,
				modifier,
				borderRadius,
				backgroundColor,
				backgroundGradientColor,
				textColor,
				wrap,
			} = attributes;

			const wrapperClasses = classnames( 'smb-btn-wrapper', className, {
				[ `smb-btn-wrapper--${ modifier }` ]: !! modifier,
			} );

			const classes = classnames( 'smb-btn', {
				[ `smb-btn--${ modifier }` ]: !! modifier,
				'smb-btn--wrap': wrap,
			} );

			const styles = {
				'--smb-btn--background-color': backgroundColor || undefined,
				'--smb-btn--background-image':
					backgroundGradientColor || undefined,
				'--smb-btn--border-radius':
					!! borderRadius || 0 <= borderRadius
						? `${ borderRadius }px`
						: undefined,
				'--smb-btn--color': textColor || undefined,
			};

			if (
				!! attributes.className &&
				attributes.className.split( ' ' ).includes( 'is-style-ghost' )
			) {
				styles[ '--smb-btn--style--ghost--border-color' ] =
					backgroundColor || undefined;
			}

			return (
				<div { ...useBlockProps.save( { className: wrapperClasses } ) }>
					<a
						className={ classes }
						href={ url }
						style={ styles }
						target={ '_self' === target ? undefined : target }
						rel={
							'_self' === target
								? undefined
								: 'noopener noreferrer'
						}
					>
						<span className="smb-btn__label">
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
			borderRadius: {
				type: 'number',
			},
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				content,
				url,
				target,
				modifier,
				borderRadius,
				backgroundColor,
				backgroundGradientColor,
				textColor,
				wrap,
			} = attributes;

			const wrapperClasses = classnames( 'smb-btn-wrapper', className, {
				[ `smb-btn-wrapper--${ modifier }` ]: !! modifier,
			} );

			const classes = classnames( 'smb-btn', {
				[ `smb-btn--${ modifier }` ]: !! modifier,
				'smb-btn--wrap': wrap,
			} );

			const btnStyles = {
				backgroundColor: backgroundColor || undefined,
				backgroundImage: backgroundGradientColor || undefined,
				borderRadius:
					!! borderRadius || 0 <= borderRadius
						? `${ borderRadius }px`
						: undefined,
			};
			if (
				!! attributes.className &&
				attributes.className.split( ' ' ).includes( 'is-style-ghost' )
			) {
				btnStyles.borderColor = backgroundColor || undefined;
			}

			const btnLabelStyles = {
				color: textColor || undefined,
			};

			return (
				<div { ...useBlockProps.save( { className: wrapperClasses } ) }>
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
			url: {
				type: 'string',
				default: '',
			},
			target: {
				type: 'string',
				default: '_self',
			},
			borderRadius: {
				type: 'number',
			},
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

			const wrapperClasses = classnames( 'smb-btn-wrapper', className, {
				[ `smb-btn-wrapper--${ modifier }` ]: !! modifier,
			} );

			const classes = classnames( 'smb-btn', {
				[ `smb-btn--${ modifier }` ]: !! modifier,
				'smb-btn--wrap': wrap,
			} );

			const btnStyles = {
				backgroundColor: backgroundColor || undefined,
				borderRadius:
					!! borderRadius || 0 <= borderRadius
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
				<div { ...useBlockProps.save( { className: wrapperClasses } ) }>
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
			url: {
				type: 'string',
				default: '',
			},
			target: {
				type: 'string',
				default: '_self',
			},
			borderRadius: {
				type: 'number',
			},
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
			url: {
				type: 'string',
				default: '',
			},
			target: {
				type: 'string',
				default: '_self',
			},
			borderRadius: {
				type: 'number',
			},
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
			url: {
				type: 'string',
				default: '',
			},
			target: {
				type: 'string',
				default: '_self',
			},
			borderRadius: {
				type: 'number',
			},
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
