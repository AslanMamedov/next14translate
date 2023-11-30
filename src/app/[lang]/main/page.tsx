'use client';

import { Locale } from '@/i18n.config';
import CustomLink from '../components/custom-link';
import Counter from '@/components/Counter';

export default function Home({ params: { lang } }: { params: { lang: Locale } }) {
	// const t = useTranslate();
	return (
		<section className="py-24">
			<div className="container">MAIN</div>
			<CustomLink href="main/about" lang={lang}>
				About <Counter />
			</CustomLink>
			<CustomLink href="main/user" lang={lang}>
				User <Counter />
			</CustomLink>
		</section>
	);
}
