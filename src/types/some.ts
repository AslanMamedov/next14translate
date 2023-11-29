type PageType<T, Prefix extends string = ''> = {
	[K in keyof T]: K extends string
		? T[K] extends Record<string, unknown>
			? `${Prefix & string}${K}` | PageType<T[K], `${Prefix & string}${K}.`>
			: never
		: never;
}[keyof T];

type Path<T> = string & keyof T;

type GetValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
	? K extends keyof T
		? Rest extends Path<T[K]>
			? GetValue<T[K], Rest>
			: never
		: never
	: P extends keyof T
	? T[P]
	: never;

type pageKeys = 'page.home.title' | 'page.home' | 'page' | 'page.home.content.body';

const page = {
	home: {
		title: 'Page Title',
		content: {
			body: 'Page Body',
		},
	},
	about: {
		history: 'Page History',
		team: {
			content: {
				body: 'Page Body',
			},
		},
	},
};

type GetNestedProperty<T, K extends string> = K extends `${infer First}.${infer Rest}`
	? First extends keyof T
		? GetNestedProperty<T[First], Rest>
		: never
	: K extends keyof T
	? T[K]
	: never;
type s = GetNestedProperty<typeof page, pageKeys>;

type ExampleType = {
	page: {
		home: {
			title: string;
			content: {
				body: string;
			};
		};
	};
	other: {
		prop: number;
	};
};

type SS = PageType<ExampleType>;

type Result1 = GetValue<ExampleType, SS>; // string
type Result2 = GetValue<ExampleType, 'page.home.content.body'>; // string
type Result3 = GetValue<ExampleType, 'other.prop'>; // number
type Result4 = GetValue<ExampleType, 'page.home'>; // { title: string; content: { body: string; } }
type Result5 = GetValue<ExampleType, 'page'>;
