// import { Dictionary } from '@/lib/dictionary';

// type Path<T> = string | number | symbol | (string & keyof T);

// type GetValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
// 	? K extends keyof T
// 		? Rest extends Path<T[K]>
// 			? GetValue<T[K], Rest>
// 			: never
// 		: never
// 	: P extends keyof T
// 	? T[P] extends object
// 		? GetValue<T[P], keyof T[P]>
// 		: T[P]
// 	: never;
// type TypeDictionary = GetValue<Dictionary, 'page'>;

interface Page {
	about: {
		text: string;
		name: string;
	};
	home: {
		some: string;
		about: string;
	};
}
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
	: never;

type UnionPage = 'home' | 'about';
type SS = GetValue<Page, UnionPage>;

type KeysUnion<T, Cache extends string[] = []> = T extends object
	? {
			[K in keyof T]: K extends string | number
				? `${K & string}` | `${K & string}.${KeysUnion<T[K], [...Cache, `${K & string}`]>}`
				: never;
	  }[keyof T]
	: never;

type UnionType = KeysUnion<Page>;

// type UnionType = 'home.some' | 'home.about' | 'about.text' | 'about.name';
