import { hasBlockSupport } from '@wordpress/blocks';
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export function hasFlexGrowValue( props ) {
	return props.attributes?.smb?.flexGrow !== undefined;
}

export function resetFlexGrow( { attributes = {}, setAttributes } ) {
	delete attributes?.smb?.flexGrow;
	const newSMB = { ...attributes?.smb };

	setAttributes( {
		smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
	} );
}

export function useIsFlexGrowDisabled( {
	name: blockName,
	attributes: { __unstableSMBSupports },
} = {} ) {
	return (
		! hasBlockSupport( blockName, 'smb.flexGrow' ) &&
		! __unstableSMBSupports?.flexGrow
	);
}

export function FlexGrowEdit( props ) {
	const {
		attributes: { smb },
		setAttributes,
	} = props;

	return (
		<ToggleControl
			label={ __( 'Fill' ) }
			help={ __(
				'Allows for stretching from the basic size.',
				'snow-monkey-blocks'
			) }
			checked={ !! smb?.flexGrow }
			onChange={ ( newValue ) => {
				const newSMB = {
					...smb,
					flexGrow: newValue || undefined,
				};
				if ( null == newSMB.flexGrow ) {
					delete newSMB.flexGrow;
				}

				setAttributes( {
					smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
				} );
			} }
		/>
	);
}

export function saveFlexGrowProp( extraProps, blockType, attributes ) {
	if (
		! hasBlockSupport( blockType, 'smb.flexGrow' ) &&
		! attributes?.__unstableSMBSupports?.flexGrow
	) {
		delete attributes?.smb?.flexGrow;
		if ( !! attributes?.smb && ! Object.keys( attributes?.smb ).length ) {
			delete attributes?.smb;
		}
		return extraProps;
	}

	if ( undefined === attributes?.smb?.flexGrow ) {
		return extraProps;
	}

	extraProps.style = {
		...extraProps.style,
		'--smb--flex-grow': !! attributes?.smb?.flexGrow ? 1 : undefined,
	};

	return extraProps;
}

export function editFlexGrowProp( settings ) {
	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = ( attributes ) => {
		let props = {};
		if ( existingGetEditWrapperProps ) {
			props = existingGetEditWrapperProps( attributes );
		}
		return saveFlexGrowProp( props, settings, attributes );
	};

	return settings;
}
