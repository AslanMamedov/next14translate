'use client';
import { Dictionary } from '@/lib/dictionary';
import { FC, PropsWithChildren, createContext, useContext } from 'react';

interface TranslateContextProps {
	dictionary: Dictionary;
	locale: string;
}

type StrObj = Record<string, unknown>;

type FlattenObjectKeys<T extends StrObj, Key = keyof T> = Key extends string
	? T[Key] extends StrObj
		? `${Key}.${FlattenObjectKeys<T[Key]>}`
		: `${Key}`
	: never;

type GetByFlattenKey<T extends StrObj, K extends string> = K extends `${infer K1}.${infer K2}`
	? T[K1] extends StrObj
		? GetByFlattenKey<T[K1], K2>
		: never
	: K extends keyof T
	? T[K]
	: never;

type Keys = FlattenObjectKeys<Dictionary>;

const translateContext = createContext<TranslateContextProps | undefined>(undefined);

export const useTranslate = () => {
	const context = useContext(translateContext);
	function dictionaryWithoutKeys<T extends Keys>(schema: T): GetByFlattenKey<Dictionary, T> {
		const keys = schema.split('.');
		let result: StrObj | undefined = context?.dictionary;

		for (const key of keys) {
			if (result && typeof result === 'object' && key in result) {
				result = result[key] as StrObj;
			} else {
				throw new Error(`Invalid schema: ${schema}`);
			}
		}

		return result as GetByFlattenKey<Dictionary, T>;
	}

	if (!context) {
		throw new Error('useTranslate must be used within a TranslateProvider');
	}
	if (typeof window !== 'undefined') {
		localStorage.setItem('locale', context.locale);
	}
	return dictionaryWithoutKeys;
};

const TranslateProvider: FC<PropsWithChildren<TranslateContextProps>> = ({ locale, dictionary, children }) => {
	return <translateContext.Provider value={{ dictionary, locale }}>{children}</translateContext.Provider>;
};

export default TranslateProvider;
