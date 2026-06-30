import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';

if ( ! window.smb?.isPro ) {
	const SnowMonkeyPrPanel = () => (
		<PluginDocumentSettingPanel
			name="snow-monkey-pr"
			title={ __(
				'[ PR ] Premium WordPress Theme Snow Monkey',
				'snow-monkey-blocks'
			) }
		>
			<p>
				{ createInterpolateElement(
					__(
						'Snow Monkey Blocks is optimized for the <a>Snow Monkey</a> theme, but it can also be used with other themes.',
						'snow-monkey-blocks'
					),
					{
						a: (
							// eslint-disable-next-line jsx-a11y/anchor-has-content
							<a
								href="https://snow-monkey.2inc.org/"
								target="_blank"
								rel="noreferrer"
							/>
						),
					}
				) }
			</p>
			<p>
				{ createInterpolateElement(
					__(
						'When used together with the <a>Snow Monkey</a> theme, it can be displayed with the most beautiful balance, and it is displayed on the edit screen with the same design as the front screen.',
						'snow-monkey-blocks'
					),
					{
						a: (
							// eslint-disable-next-line jsx-a11y/anchor-has-content
							<a
								href="https://snow-monkey.2inc.org/"
								target="_blank"
								rel="noreferrer"
							/>
						),
					}
				) }
			</p>
		</PluginDocumentSettingPanel>
	);

	registerPlugin( 'snow-monkey-pr', { render: SnowMonkeyPrPanel } );
}
