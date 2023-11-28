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

//
type PageType<T, Prefix extends string = ''> = {
	[K in keyof T]: K extends string
		? K | (T[K] extends Record<string, unknown> ? `${Prefix & string}${K}.${PageType<T[K], `${K}.`>}` : never)
		: never;
}[keyof T];
