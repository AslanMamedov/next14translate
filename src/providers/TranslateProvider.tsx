'use client';
import { Dictionary } from '@/lib/dictionary';
import { FC, PropsWithChildren, createContext, useContext } from 'react';

interface TranslateContextProps {
	dictionary: Dictionary;
}

type FlattenObjectKeys<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: `${string & K}` | `${K}.${FlattenObjectKeys<O[K]>}` }[keyof O]
		: never
	: never;

type PageType<T, Prefix extends string = ''> = {
	[K in keyof T]: K extends string
		? T[K] extends Record<string, unknown>
			? `${Prefix & string}${K}` | PageType<T[K], `${Prefix & string}${K}.`>
			: never
		: never;
}[keyof T];

type Path<T> = T extends object ? keyof T | `${keyof T}.${Path<T[keyof T]>}` : never;

type GetValue<T, P> = P extends string
	? P extends `${infer K}.${infer Rest}`
		? K extends keyof T
			? Rest extends Path<T[K]>
				? GetValue<T[K], Rest>
				: never
			: never
		: P extends keyof T
		? T[P]
		: never
	: P extends `${infer A}.${infer B}`
	? A extends string
		? B extends Path<GetValue<T, A>>
			? GetValue<T, `${A}.${B}`>
			: never
		: never
	: P extends keyof T
	? T[P]
	: never;

type GetByFlattenKey<T extends StrObj, K extends string> = K extends `${infer K1}.${infer K2}`
	? T[K1] extends StrObj
		? GetByFlattenKey<T[K1], K2>
		: never
	: K extends keyof T
	? T[K]
	: never;

type Values = {
	[P in PageType<Dictionary>]: GetByFlattenKey<Dictionary, PageType<Dictionary>>;
}[PageType<Dictionary>];

type FF = FlattenObjectKeys<Values>;

const translateContext = createContext<TranslateContextProps | undefined>(undefined);
export function useTranslate<T extends PageType<Dictionary>, K extends Dictionary>(dictionaryKey: T) {
	const context = useContext(translateContext);
	function dictionary(keys: FlattenObjectKeys<GetValue<K, T>>) {
		return '';
	}

	if (!context) {
		throw new Error('useTranslate must be used within a TranslateProvider');
	}

	return dictionary;
}

const TranslateProvider: FC<PropsWithChildren<TranslateContextProps>> = ({ dictionary, children }) => {
	return <translateContext.Provider value={{ dictionary }}>{children}</translateContext.Provider>;
};

export default TranslateProvider;
