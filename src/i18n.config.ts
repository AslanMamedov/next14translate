export const i18n = {
	defaultLocale: 'az',
	locales: ['en', 'ru', 'az'],
	localeDetection: false,
} as const;

export type Locale = (typeof i18n)['locales'][number];
