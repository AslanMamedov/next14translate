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
		<section className="py-24">
			<div className="container">
				{/* <h1 className="text-3xl font-bold">{t('page.about.description')}</h1>
				<p className="text-gray-500">{t('page.about.description')}</p> */}
				<Counter />
				{/* <CustomLink href="main" lang={lang}>
					Main <Counter />
				</CustomLink>
				<CustomLink href="about" lang={lang}>
					about<Counter />
				</CustomLink> */}
				<Button>Click me</Button>
				<Calendar
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
				/>
				<DateInput clearable locale={lang} label="Date input" placeholder="Date input" />
			</div>
		</section>
	);
}
