'use client';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { useTranslate } from '@/providers/TranslateProvider';

export default function About({ params: { lang } }: { params: { lang: Locale } }) {
	const t = useTranslate();
	console.log(lang);
	return (
		<section className="py-24">
			<div className="container">
				<h1 className="text-3xl font-bold">{t('page.about.description')}</h1>
				<p className="text-gray-500">{t('page.about.description')}</p>
			</div>
		</section>
	);
}
