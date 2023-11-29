'use client';
import { Dictionary } from '@/lib/dictionary';
import { FC, PropsWithChildren, createContext, useContext } from 'react';

interface TranslateContextProps {
	dictionary: Dictionary;
}
type StrObj = Record<string, string>;

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

type Keys<K, T> = FlattenObjectKeys<GetValue<K, T>>;

const translateContext = createContext<TranslateContextProps | undefined>(undefined);
export function useTranslate<T extends PageType<Dictionary>, K extends Dictionary>(dictionaryKey: T) {
	const context = useContext(translateContext);
	function dictionary(keys: Keys<K, T>): string {
		if (!context) {
			throw new Error('useTranslate must be used within a TranslateProvider');
		}
		const dictionaryKeyLists = dictionaryKey.split('.');
		const keyLists = keys.split('.');
		const dictionary = context.dictionary;
		// console.log(dictionaryKeyLists, keyLists, dictionary);
		const result = {} as any;
		for (let i = 0; i < dictionaryKeyLists.length; i++) {
			result[dictionaryKeyLists[i]] = dictionary[dictionaryKeyLists[i]] as any;
		}

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
