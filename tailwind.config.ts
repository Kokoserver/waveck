import daisyUi from 'daisyui';
import daisyUiheme from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{svelte,js,ts}'],
	theme: {
		extend: {
			colors: {
				text: {
					50: 'var(--text-50)',
					100: 'var(--text-100)',
					200: 'var(--text-200)',
					300: 'var(--text-300)',
					400: 'var(--text-400)',
					500: 'var(--text-500)',
					600: 'var(--text-600)',
					700: 'var(--text-700)',
					800: 'var(--text-800)',
					900: 'var(--text-900)',
					950: 'var(--text-950)'
				},
				background: {
					50: 'var(--background-50)',
					100: 'var(--background-100)',
					200: 'var(--background-200)',
					300: 'var(--background-300)',
					400: 'var(--background-400)',
					500: 'var(--background-500)',
					600: 'var(--background-600)',
					700: 'var(--background-700)',
					800: 'var(--background-800)',
					900: 'var(--background-900)',
					950: 'var(--background-950)'
				},
				primary: {
					50: 'var(--primary-50)',
					100: 'var(--primary-100)',
					200: 'var(--primary-200)',
					300: 'var(--primary-300)',
					400: 'var(--primary-400)',
					500: 'var(--primary-500)',
					600: 'var(--primary-600)',
					700: 'var(--primary-700)',
					800: 'var(--primary-800)',
					900: 'var(--primary-900)',
					950: 'var(--primary-950)'
				},
				secondary: {
					50: 'var(--secondary-50)',
					100: 'var(--secondary-100)',
					200: 'var(--secondary-200)',
					300: 'var(--secondary-300)',
					400: 'var(--secondary-400)',
					500: 'var(--secondary-500)',
					600: 'var(--secondary-600)',
					700: 'var(--secondary-700)',
					800: 'var(--secondary-800)',
					900: 'var(--secondary-900)',
					950: 'var(--secondary-950)'
				},
				accent: {
					50: 'var(--accent-50)',
					100: 'var(--accent-100)',
					200: 'var(--accent-200)',
					300: 'var(--accent-300)',
					400: 'var(--accent-400)',
					500: 'var(--accent-500)',
					600: 'var(--accent-600)',
					700: 'var(--accent-700)',
					800: 'var(--accent-800)',
					900: 'var(--accent-900)',
					950: 'var(--accent-950)'
				}
			}
		}
	},
	plugins: [daisyUi],
	daisyui: {
		themes: [
			{
				light: {
					...daisyUiheme['light'],
					primary: '#2f27ce',
					secondary: '#dedcff',
					accent: '#433bff',
					success: '#22c55e',
					warning: '#eab308',
					error: '#ef4444',
					info: '#3b82f6',
					'--rounded-box': '1rem',
					'--rounded-btn': '0.5rem',
					'--rounded-badge': '1.9rem',
					'--animation-btn': '0',
					'--animation-input': '0',
					'--btn-focus-scale': '1',
					'--border-btn': '1px',
					'--tab-border': '1px',
					'--tab-radius': '0.5rem'
				},
				dark: {
					...daisyUiheme['dark'],
					primary: '#3a31d8',
					secondary: '#020024',
					accent: '#0600c2',
					success: '#22c55e',
					warning: '#eab308',
					error: '#ef4444',
					info: '#3b82f6',
					'--rounded-box': '1rem',
					'--rounded-btn': '0.5rem',
					'--rounded-badge': '1.9rem',
					'--animation-btn': '0',
					'--animation-input': '0',
					'--btn-focus-scale': '1',
					'--border-btn': '1px',
					'--tab-border': '1px',
					'--tab-radius': '0.5rem'
				}
			}
		],
		darkTheme: true,
		base: true,
		styled: true,
		utils: true,
		prefix: '',
		logs: true,
		themeRoot: ':root'
	},
	darkMode: ['class', '[data-theme="night"]']
};
