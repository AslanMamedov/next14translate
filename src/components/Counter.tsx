'use client';
import { i18n } from '@/i18n.config';
import { useTranslate } from '@/providers/TranslateProvider';
import { memo, useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from './TextInput';
import { atom, useAtom } from 'jotai';
import instanceAxios from '@/services/instanceAxios';
import { useMutation, useQuery } from '@tanstack/react-query';

const inputFieldsAtom = atom({
	name: '',
	age: 0,
});

const Counter = () => {
	const [t, locale] = useTranslate('forms');
	const [text, setText] = useAtom(inputFieldsAtom);
	// const { data, mutate, isSuccess } = useMutation({
	// 	mutationFn: async () => {
	// 		return (await instanceAxios.GET('https://jsonplaceholder.typicode.com/todos/1'));
	// 	},
	// 	onSettled(data, error, variables, context) {
	// 		console.log(data, );
	// 	},
	// });
	const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
		queryKey: ['todos'],
		queryFn: async () => await instanceAxios.GET('https://jsonplaceholder.typicode.com/todos/1'),
		select(data) {
			return data.data;
		},
		enabled: false,
	});

	const shcema = useMemo(() => {
		const schema = z.object({
			name: z.string().min(1, { message: `${t('email_error')}` }),
			age: z.number().gte(111, { message: `${t('your_message')}` }),
		});
		return schema;
	}, [t]);
	const methods = useForm<z.infer<typeof shcema>>({
		resolver: zodResolver(shcema),
		defaultValues: {
			age: text.age,
			name: text.name,
		},
		values: {
			age: text.age,
			name: text.name,
		},
	});

	const onSubmit = async (data: z.infer<typeof shcema>) => {
		const datas = {
			value: {
				name: data.name,
				age: data.age,
			},
			expirationTime: new Date().getTime() + 60000,
		};
		sessionStorage.setItem('key', JSON.stringify(datas));
		refetch();
		setText({ name: data.name, age: data.age });
	};

	useEffect(() => {
		const data = sessionStorage.getItem('key');
		if (data) {
			const parsedData = JSON.parse(data);

			const now = new Date().getTime();

			if (now < parsedData.expirationTime) {
				methods.setValue('age', parsedData.value.age);
				methods.setValue('name', parsedData.value.name);
				// setText({ name: parsedData.value.name, age: parsedData.value.age });
			} else {
				sessionStorage.removeItem('key');
			}
		}
	}, []);
	console.log(data);
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<br />
				<TextInput name="name" type="text" />
				<br />
				<TextInput name="age" type="number" />
				<br />
				<br />
				<input type="submit" />
			</form>
			{t('email_error')}
		</FormProvider>
	);
};

Counter.displayName = 'Counter';
export default Counter;
