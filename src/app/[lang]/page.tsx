import Counter from '@/components/Counter';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import TranslateProvider from '@/providers/TranslateProvider';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
	const page = await getDictionary(lang);

	return (
		<TranslateProvider dictionary={page}>
			<section className="py-24">
				<div className="container">
					<h1 className="text-3xl font-bold">{page.page.home.title}</h1>
					<p className="text-gray-500">{page.page.home.description}</p>
					<Counter />
				</div>
			</section>
		</TranslateProvider>
	);
}
