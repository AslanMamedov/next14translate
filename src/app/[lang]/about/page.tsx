import Counter from '@/components/Counter';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

export default async function About({ params: { lang } }: { params: { lang: Locale } }) {
	const page = await getDictionary(lang);
	const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
	const data = await response.json();
	console.log(data);
	return (
		<section className="py-24">
			<div className="container">{page.carousel.item.button}</div>
			<div className="container">{page.carousel.item.button}</div>
			<div className="container">{page.carousel.item.button}</div>
			<div className="container">{page.carousel.item.button}</div>
			<div className="container">{page.carousel.item.button}</div>
			<Counter />
		</section>
	);
}
