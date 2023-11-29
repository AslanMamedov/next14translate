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


const title: GetValue<typeof page, 'home.title'> = 'Page Title';
const homeContentBody: GetValue<typeof page, 'home.content.body'> = 'Page Body';
const homeObject: GetValue<typeof page, 'home'> = {
	title: 'Page Title',
	content: {
		body: 'Page Body',
	},
};
const pageObject: GetValue<typeof page, 'page'> = {
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
