import { hasBlockSupport } from '@wordpress/blocks';
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export function hasFlexShrinkValue( props ) {
	return props.attributes?.smb?.flexShrink !== undefined;
}

export function resetFlexShrink( { attributes = {}, setAttributes } ) {
	delete attributes?.smb?.flexShrink;
	const newSMB = { ...attributes?.smb };

	setAttributes( {
		smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
	} );
}

export function useIsFlexShrinkDisabled( {
	name: blockName,
	attributes: { __unstableSMBSupports },
} = {} ) {
	return (
		! hasBlockSupport( blockName, 'smb.flexShrink' ) &&
		! __unstableSMBSupports?.flexShrink
	);
}

export function FlexShrinkEdit( props ) {
	const {
		attributes: { smb },
		setAttributes,
	} = props;

	return (
		<ToggleControl
			label={ __( 'Fit' ) }
			help={ __(
				'Allow shrinkage from the basic size.',
				'snow-monkey-blocks'
			) }
			checked={ null == smb?.flexShrink }
			onChange={ ( newValue ) => {
				const newSMB = {
					...smb,
					flexShrink: ! newValue ? 0 : undefined,
				};
				if ( null == newSMB.flexShrink ) {
					delete newSMB.flexShrink;
				}

				setAttributes( {
					smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
				} );
			} }
		/>
	);
}

export function saveFlexShrinkProp( extraProps, blockType, attributes ) {
	if (
		! hasBlockSupport( blockType, 'smb.flexShrink' ) &&
		! attributes?.__unstableSMBSupports?.flexShrink
	) {
		delete attributes?.smb?.flexShrink;
		if ( !! attributes?.smb && ! Object.keys( attributes?.smb ).length ) {
			delete attributes?.smb;
		}
		return extraProps;
	}

	if ( undefined === attributes?.smb?.flexShrink ) {
		return extraProps;
	}

	extraProps.style = {
		...extraProps.style,
		'--smb--flex-shrink': !! attributes?.smb?.flexShrink ? undefined : 0,
	};

	return extraProps;
}

export function editFlexShrinkProp( settings ) {
	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = ( attributes ) => {
		let props = {};
		if ( existingGetEditWrapperProps ) {
			props = existingGetEditWrapperProps( attributes );
		}
		return saveFlexShrinkProp( props, settings, attributes );
	};

	return settings;
}
