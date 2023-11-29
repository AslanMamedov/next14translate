'use client';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { useTranslate } from '@/providers/TranslateProvider';

export default function About({ params: { lang } }: { params: { lang: Locale } }) {
	return (
		<section className="py-24">
			<div className="container"></div>
		</section>
	);
}
