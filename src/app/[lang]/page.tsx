'use client';
import Counter from '@/components/Counter';
import { Locale } from '@/i18n.config';
import { useTranslate } from '@/providers/TranslateProvider';

export default function Home({ params: { lang } }: { params: { lang: Locale } }) {
	const t = useTranslate();
	return (
		<section className="py-24">
			<div className="container">
				<h1 className="text-3xl font-bold">{t('page.about.description')}</h1>
				<p className="text-gray-500">{t('page.about.description')}</p>
				<Counter />
			</div>
		</section>
	);
}
