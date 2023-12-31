'use client';
import Counter from '@/components/Counter';
import { Locale } from '@/i18n.config';
import { useTranslate } from '@/providers/TranslateProvider';
import CustomLink from './components/custom-link';
import { useState } from 'react';
import { Indicator } from '@mantine/core';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import 'dayjs/locale/az';
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { Calendar } from '@mantine/dates';
import { DatesProvider, MonthPickerInput, DatePickerInput } from '@mantine/dates';
import { Button } from '@/components/ui/button';

import { atom, useAtom } from 'jotai';

// Create your atoms and derivatives
const textAtom = atom('hello');
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase());

// Use them anywhere in your app
const Input = () => {
	const [text, setText] = useAtom(textAtom);
	const handleChange = (e: any) => setText(e.target.value);
	return <input value={text} onChange={handleChange} />;
};

const Uppercase = () => {
	const [uppercase] = useAtom(uppercaseAtom);
	return <div>Uppercase: {uppercase}</div>;
};

export default function Home({ params: { lang } }: { params: { lang: Locale } }) {
	// const t = useTranslate();
	const [value, setValue] = useState<Date | null>(null);
	const [selected, setSelected] = useState<Date[]>([]);
	const handleSelect = (date: Date) => {
		const isSelected = selected.some((s) => dayjs(date).isSame(s, 'date'));
		if (isSelected) {
			setSelected((current) => current.filter((d) => !dayjs(d).isSame(date, 'date')));
		} else if (selected.length < 3) {
			setSelected((current) => [...current, date]);
		}
	};
	return (
		<section className="py-[150px]">
			<div className="container">
				{/* <h1 className="text-3xl font-bold">{t('page.about.description')}</h1>
				<p className="text-gray-500">{t('page.about.description')}</p> */}
				<Counter />
				<Input />
				<Uppercase />
				{/* <CustomLink href="main" lang={lang}>
					Main <Counter />
				</CustomLink>
				<CustomLink href="about" lang={lang}>
					about<Counter />
				</CustomLink> */}
				{/* <Calendar
					locale={lang}
					// date={new Date()}

					getDayProps={(date) => ({
						selected: selected.some((s) => dayjs(date).isSame(s, 'date')),
						onClick: () => handleSelect(date),
					})}
					renderDay={(date) => {
						const day = date.getDate();
						return (
							<Indicator size={10} color="red" offset={-2} disabled={day !== new Date().getDate()}>
								<div>{day}</div>
							</Indicator>
						);
					}}
				/> */}
				<DateInput clearable locale={lang} label="Date input" placeholder="Date input" />
				<div className="border border-red-900m-3 w-screen h-screen p-10">
					{/* <iframe
						className="w-[1440px] h-[100px]"
						src="https://docs.xalqsigorta.az/travel-insurance--iframe.html"
						frameBorder="0"
					></iframe> */}
					1
				</div>
			</div>
		</section>
	);
}
