import { __ } from '@wordpress/i18n';

import {
	Button,
	Flex,
	FlexItem,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';

export default function ( { label, onChange, value, withReset = true }, ref ) {
	const units = useCustomUnits( {
		availableUnits: [ 'px', 'em', 'rem', '%', 'vw' ],
	} );

	const baseClassName = 'smb-width-picker';

	return (
		<fieldset className={ baseClassName } { ...( ref ? {} : { ref } ) }>
			<div className={ `${ baseClassName }__controls` }>
				<Flex
					justify="space-between"
					className={ `${ baseClassName }__custom-size-control` }
				>
					<FlexItem isBlock>
						<UnitControl
							label={ label }
							labelPosition="edge"
							value={ value }
							onChange={ ( nextWidth ) => {
								nextWidth =
									0 > parseFloat( nextWidth ) ||
									0 === parseFloat( nextWidth )
										? undefined
										: nextWidth;
								onChange( nextWidth );
							} }
							units={ units }
						/>
					</FlexItem>

					{ withReset && (
						<FlexItem isBlock>
							<Button
								className="components-color-palette__clear"
								disabled={ value === undefined }
								onClick={ () => onChange( undefined ) }
								isSmall
								isSecondary
							>
								{ __( 'Reset' ) }
							</Button>
						</FlexItem>
					) }
				</Flex>
			</div>
		</fieldset>
	);
}
