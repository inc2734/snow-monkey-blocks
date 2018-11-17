'use strict';

export default function divider( type, level, color ) {
	color = color ? color : '#fff';

	const renderTiltDivider = () => {
		return (
			<path
				d={ `m0,${ 100 - level } L100,100 L0,100 z` }
				strokeWidth="0"
				fill={ color }
			/>
		);
	};

	const renderCurveDivider = () => {
		return (
			<path
				d={ `m0,${ 100 - level } q50,${ level },100,0 V100 L0,100 z` }
				strokeWidth="0"
				fill={ color }
			/>
		);
	};

	const renderWaveDivider = () => {
		return (
			<path
				d={ `m0,${ 100 - ( level / 2 ) } q20,${ level / 2 },40,0 t40,0 t40,0 V100 L0,100 z` }
				strokeWidth="0"
				fill={ color }
			/>
		);
	};

	const renderPath = () => {
		switch ( type ) {
			case 'tilt':
				return renderTiltDivider();
			case 'curve':
				return renderCurveDivider();
			case 'wave':
				return renderWaveDivider();
		}
	};

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
			{ renderPath( type, level, color ) }
		</svg>
	);
}
