'use client';
import { Dictionary } from '@/lib/dictionary';
import { FC, PropsWithChildren, createContext, useCallback, useContext, useMemo } from 'react';

interface TranslateContextProps {
	dictionary: Dictionary;
	locale: string;
}
type StrObj = Record<string, unknown>;

type PageType<T, Prefix extends string = ''> = {
	[K in keyof T]: K extends string
		? T[K] extends Record<string, unknown>
			? `${Prefix & string}${K}` | PageType<T[K], `${Prefix & string}${K}.`>
			: never
		: never;
}[keyof T];

type Path<T> = string;

type GetValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
	? K extends keyof T
		? Rest extends Path<T[K]>
			? GetValue<T[K], Rest>
			: never
		: never
	: P extends keyof T
	? T[P]
	: never;

type FlattenObjectKeys<T extends StrObj, Key = keyof T> = Key extends string
	? T[Key] extends StrObj
		? `${Key}.${FlattenObjectKeys<T[Key]>}`
		: `${Key}`
	: never;

type Keys<K extends Dictionary, T extends PageType<Dictionary>> = FlattenObjectKeys<GetValue<K, T>>;
const translateContext = createContext<TranslateContextProps | undefined>(undefined);

export function useTranslate<T extends PageType<Dictionary>, K extends Dictionary>(
	dictionaryKey?: T
): [(keys: Keys<K, T>) => string, string] {
	const context = useContext(translateContext);

	const dictionary = useCallback(
		(keys: Keys<K, T>): string => {
			if (!context) {
				throw new Error('useTranslate must be used within a TranslateProvider');
			}

			const keyLists: string[] = `${dictionaryKey}.${keys}`.split('.');
			let result: any = context.dictionary;

			for (const key of keyLists) {
				if (result && typeof result === 'object' && key in result) {
					result = result[key] as StrObj;
				} else {
					throw new Error(`Invalid keys: ${keys}`);
				}
			}

			return result;
		},
		[context, dictionaryKey]
	);

	if (!context) {
		throw new Error('useTranslate must be used within a TranslateProvider');
	}

	if (typeof window !== 'undefined') {
		localStorage.setItem('locale', context.locale);
	}

	return [dictionary, context.locale];
}
const TranslateProvider: FC<PropsWithChildren<TranslateContextProps>> = ({ locale, dictionary, children }) => {
	return <translateContext.Provider value={{ dictionary, locale }}>{children}</translateContext.Provider>;
};

export default TranslateProvider;
