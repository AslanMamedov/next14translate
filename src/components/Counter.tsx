'use client';
import { i18n } from '@/i18n.config';
import { useTranslate } from '@/providers/TranslateProvider';
import { memo, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from './TextInput';
const Counter = memo(() => {
	const [t, locale] = useTranslate('forms');
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
			age: 10,
			name: '',
		},
	});
	const onSubmit = (data: z.infer<typeof shcema>) => console.log(data, locale);
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
		</FormProvider>
	);
});

Counter.displayName = 'Counter';
export default Counter;
