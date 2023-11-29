import 'server-only';
import type { Locale } from '@/i18n.config';

const dictionaries = {
	en: () => import('@/locales/en/common.json').then((module) => module.default),
	ru: () => import('@/locales/ru/common.json').then((module) => module.default),
	az: () => import('@/locales/az/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
