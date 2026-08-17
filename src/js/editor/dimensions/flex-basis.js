import { hasBlockSupport } from '@wordpress/blocks';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export function hasFlexBasisValue( props ) {
	return props.attributes?.smb?.flexBasis !== undefined;
}

export function resetFlexBasis( { attributes = {}, setAttributes } ) {
	delete attributes?.smb?.flexBasis;
	const newSMB = { ...attributes?.smb };

	setAttributes( {
		smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
	} );
}

export function useIsFlexBasisDisabled( {
	name: blockName,
	attributes: { __unstableSMBSupports },
} = {} ) {
	return (
		! hasBlockSupport( blockName, 'smb.flexBasis' ) &&
		! __unstableSMBSupports?.flexBasis
	);
}

export function FlexBasisEdit( props ) {
	const {
		attributes: { smb },
		setAttributes,
	} = props;

	return (
		<UnitControl
			label={ __( 'Basic size', 'snow-monkey-blocks' ) }
			help={ __( 'Basic size of the flex item.', 'snow-monkey-blocks' ) }
			value={ smb?.flexBasis || '' }
			onChange={ ( newValue ) => {
				const newSMB = {
					...smb,
					flexBasis: newValue || undefined,
				};
				if ( null == newSMB.flexBasis ) {
					delete newSMB.flexBasis;
				}

				setAttributes( {
					smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
				} );
			} }
		/>
	);
}

export function saveFlexBasisProp( extraProps, blockType, attributes ) {
	if (
		! hasBlockSupport( blockType, 'smb.flexBasis' ) &&
		! attributes?.__unstableSMBSupports?.flexBasis
	) {
		delete attributes?.smb?.flexBasis;
		if ( !! attributes?.smb && ! Object.keys( attributes?.smb ).length ) {
			delete attributes?.smb;
		}
		return extraProps;
	}

	if ( undefined === attributes?.smb?.flexBasis ) {
		return extraProps;
	}

	extraProps.style = {
		...extraProps.style,
		'--smb--flex-basis': attributes?.smb?.flexBasis,
	};

	return extraProps;
}

export function editFlexBasisProp( settings ) {
	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = ( attributes ) => {
		let props = {};
		if ( existingGetEditWrapperProps ) {
			props = existingGetEditWrapperProps( attributes );
		}
		return saveFlexBasisProp( props, settings, attributes );
	};

	return settings;
}
