'use client';
import { Dictionary } from '@/lib/dictionary';
import { FC, PropsWithChildren, createContext, useContext } from 'react';

interface TranslateContextProps {
	dictionary: Dictionary;
}

type DictionaryKey = keyof Dictionary;
type PageType<T, Prefix extends string = ''> = {
	[K in keyof T]: K extends string
		? K | (T[K] extends Record<string, unknown> ? `${Prefix & string}${K}.${PageType<T[K], `${K}.`>}` : never)
		: never;
}[keyof T];

type Path<T> = T extends object ? string : never;

type GetValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
	? K extends keyof T
		? Rest extends Path<T[K]>
			? GetValue<T[K], Rest>
			: never
		: never
	: P extends keyof T
	? T[P]
	: never;

type TS = 'nunber' | 'number';
type SS = PageType<Dictionary>;

type TypeDictionary = keyof GetValue<Dictionary, 'page.home.some'>;
const ss: SS = 'number.one';
// const s: TypeDictionary =
// type A = keyof GetValue<Dictionary, 'number.one'>;

const translateContext = createContext<TranslateContextProps | undefined>(undefined);

export const useTranslate = (dictionaryKey: PageType<Dictionary>) => {
	const context = useContext(translateContext);
	function dictionary(schema: TypeDictionary) {
		// const keys = schema.split('.');
		// let result = context?.dictionary[dictionaryKey];
		// for (const key of keys) {
		// 	if (result && typeof result === 'object' && key in result) {
		// 		result = result[key] as StrObj;
		// 	} else {
		// 		throw new Error(`Invalid schema: ${schema}`);
		// 	}
		// }
		return '';
	}

	if (!context) {
		throw new Error('useTranslate must be used within a TranslateProvider');
	}

	return dictionary;
};

const TranslateProvider: FC<PropsWithChildren<TranslateContextProps>> = ({ dictionary, children }) => {
	return <translateContext.Provider value={{ dictionary }}>{children}</translateContext.Provider>;
};

export default TranslateProvider;
// type StrObj = Record<string, unknown>;
// type DKeys = keyof Dictionary;
// type NewDictionary = Pick<Dictionary, DKeys>;
// type FlattenObjectKeys<T extends StrObj, Key = keyof T> = Key extends string
// 	? T[Key] extends StrObj
// 		? `${Key}.${FlattenObjectKeys<T[Key]>}`
// 		: `${Key}`
// 	: never;

// type KeyList<T extends NewDictionary, K extends keyof T> = T[K];
// type KeyListObj<T extends DKeys> = KeyList<NewDictionary, keyof Pick<Dictionary, T>>;
// type KeyDict<T extends DKeys> = FlattenObjectKeys<KeyListObj<T>>;
