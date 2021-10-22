import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

const getTitleSetting = ( settings ) => {
	const filteredSettings = settings.filter(
		( setting ) =>
			setting.hasOwnProperty( 'titleValue' ) &&
			setting.hasOwnProperty( 'titleTagNameValue' )
	);
	return !! filteredSettings ? filteredSettings[ 0 ] : false;
};

const getSubtitleSetting = ( settings ) => {
	const filteredSettings = settings.filter( ( setting ) =>
		setting.hasOwnProperty( 'subtitleValue' )
	);
	return !! filteredSettings ? filteredSettings[ 0 ] : false;
};

const getLedeSetting = ( settings ) => {
	const filteredSettings = settings.filter( ( setting ) =>
		setting.hasOwnProperty( 'ledeValue' )
	);
	return !! filteredSettings ? filteredSettings[ 0 ] : false;
};

const getHasTitle = ( settings ) => {
	const setting = getTitleSetting( settings );
	return (
		!! setting &&
		! RichText.isEmpty( setting.titleValue ) &&
		'none' !== setting.titleTagNameValue
	);
};

const getHasSubtitle = ( settings ) => {
	const setting = getSubtitleSetting( settings );
	return !! setting && ! RichText.isEmpty( setting.subtitleValue );
};

const getHasLede = ( settings ) => {
	const setting = getLedeSetting( settings );
	return !! setting && ! RichText.isEmpty( setting.ledeValue );
};

const getHasHeader = ( settings ) => {
	const setting = getTitleSetting( settings );
	return !! setting && 'none' !== setting.titleTagNameValue;
};

const getHeaderClasses = ( className ) => {
	return classnames( 'smb-section__header', {
		[ `${ className }__header` ]: !! className,
	} );
};

const getSubtitleClasses = ( className ) => {
	return classnames( 'smb-section__subtitle', {
		[ `${ className }__subtitle` ]: !! className,
	} );
};

const getTitleClasses = ( className ) => {
	return classnames( 'smb-section__title', {
		[ `${ className }__title` ]: !! className,
	} );
};

const getLedeWrapperClasses = ( className ) => {
	return classnames( 'smb-section__lede-wrapper', {
		[ `${ className }__lede-wrapper` ]: !! className,
	} );
};

const getLedeClasses = ( className ) => {
	return classnames( 'smb-section__lede', {
		[ `${ className }__lede` ]: !! className,
	} );
};

export const Edit = ( { isSelected, className, settings } ) => {
	const hasHeader = getHasHeader( settings );
	if ( ! hasHeader ) {
		return <></>;
	}

	const hasTitle = getHasTitle( settings );
	if ( ! hasTitle && ! isSelected ) {
		return <></>;
	}

	const hasSubTitle = getHasSubtitle( settings );
	const hasLede = getHasLede( settings );

	const headerClasses = getHeaderClasses( className );
	const subtitleClasses = getSubtitleClasses( className );
	const titleClasses = getTitleClasses( className );
	const ledeWrapperClasses = getLedeWrapperClasses( className );
	const ledeClasses = getLedeClasses( className );

	return (
		<div className={ headerClasses }>
			{ settings.map( ( setting, index ) => {
				if (
					( hasSubTitle || isSelected ) &&
					setting.hasOwnProperty( 'subtitleValue' ) &&
					setting.hasOwnProperty( 'onSubtitleChange' )
				) {
					return (
						<RichText
							key={ index }
							className={ subtitleClasses }
							value={ setting.subtitleValue }
							onChange={ setting.onSubtitleChange }
							placeholder={ __(
								'Write subtitle…',
								'snow-monkey-blocks'
							) }
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'titleTagNameValue' ) &&
					setting.hasOwnProperty( 'titleValue' ) &&
					setting.hasOwnProperty( 'onTitleChange' )
				) {
					return (
						<RichText
							key={ index }
							className={ titleClasses }
							tagName={ setting.titleTagNameValue }
							value={ setting.titleValue }
							onChange={ setting.onTitleChange }
							placeholder={ __(
								'Write title…',
								'snow-monkey-blocks'
							) }
						/>
					);
				}

				if (
					( hasLede || isSelected ) &&
					setting.hasOwnProperty( 'ledeValue' ) &&
					setting.hasOwnProperty( 'onLedeChange' )
				) {
					return (
						<div key={ index } className={ ledeWrapperClasses }>
							<RichText
								className={ ledeClasses }
								value={ setting.ledeValue }
								onChange={ setting.onLedeChange }
								placeholder={ __(
									'Write lede…',
									'snow-monkey-blocks'
								) }
							/>
						</div>
					);
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</div>
	);
};

export const Save = ( { title, titleTagName, subtitle, lede, className } ) => {
	const hasTitle = ! RichText.isEmpty( title ) && 'none' !== titleTagName;
	if ( ! hasTitle ) {
		return <></>;
	}

	const hasSubTitle = ! RichText.isEmpty( subtitle );
	const hasLede = ! RichText.isEmpty( lede );

	const headerClasses = getHeaderClasses( className );
	const subtitleClasses = getSubtitleClasses( className );
	const titleClasses = getTitleClasses( className );
	const ledeWrapperClasses = getLedeWrapperClasses( className );
	const ledeClasses = getLedeClasses( className );

	return (
		<div className={ headerClasses }>
			{ hasSubTitle && (
				<RichText.Content
					tagName="div"
					className={ subtitleClasses }
					value={ subtitle }
				/>
			) }

			<RichText.Content
				tagName={ titleTagName }
				className={ titleClasses }
				value={ title }
			/>

			{ hasLede && (
				<div className={ ledeWrapperClasses }>
					<RichText.Content
						tagName="div"
						className={ ledeClasses }
						value={ lede }
					/>
				</div>
			) }
		</div>
	);
};
