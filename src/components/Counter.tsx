'use client';

import { useTranslate } from '@/providers/TranslateProvider';
import { useEffect, useRef, useState } from 'react';
import Number from './Number';

const Counter = () => {
	const [count, setCount] = useState(0);
	const idRef = useRef<unknown>();
	const t = useTranslate('page.home.some');

	useEffect(() => {
		idRef.current = setInterval(() => {
			setCount((c) => c + 1);
		}, 1000);

		return () => {
			clearInterval(idRef.current as number);
		};
	}, []);
	return (
		<div>
			Counter {count} {t('')}
			<Number />
		</div>
	);
};

export default Counter;
