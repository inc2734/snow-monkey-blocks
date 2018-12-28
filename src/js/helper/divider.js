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
				d={ `m0,${ 100 - level } q50,${ level * 2 },100,0 V100 L0,100 z` }
				strokeWidth="0"
				fill={ color }
			/>
		);
	};

	const renderWaveDivider = () => {
		return (
			<path
				d={ `m0,${ 100 - ( level / 2 ) } q20,${ level },40,0 t40,0 t40,0 V100 L0,100 z` }
				strokeWidth="0"
				fill={ color }
			/>
		);
	};

	const renderTriangleDivider = () => {
		return (
			<path
				d={ `m${ ( 100 - level ) / 2 },100 l${ level },0 l${ -1 * level / 2 },${ -1 * level } z` }
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
			case 'triangle':
				return renderTriangleDivider();
		}
	};

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
			{ renderPath( type, level, color ) }
		</svg>
	);
}
