import { Dictionary } from '@/lib/dictionary';
type StrObj = Record<string, unknown>;
type FlattenObjectKeys<T extends StrObj, Key = keyof T> = Key extends string
	? T[Key] extends StrObj
		? `${Key}.${FlattenObjectKeys<T[Key]>}`
		: `${Key}`
	: never;

type newT = FlattenObjectKeys<Dictionary, 'page.home'>;

// type GetKeys<T extends StrObj, K extends string = FlattenObjectKeys<T>> = K extends `${infer Key}.${infer Rest}`
// 	? Key extends keyof T
// 		? GetKeys<T[Key], Rest>
// 		: never
// 	: K;

// type Value = GetKeys<Dictionary, 'page.home'>;

// const some: Value = '';

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

type NewDictionary = Pick<Dictionary, 'page'>;

type KeyList<T extends NewDictionary, K extends keyof T> = T[K];

type KeyListObj = KeyList<NewDictionary, keyof Pick<Dictionary, 'page'>>;

type NewD = FlattenObjectKeys<KeyListObj>;
type Keyss = FlattenObjectKeys<Dictionary>;
type StrObj = Record<string, unknown>;