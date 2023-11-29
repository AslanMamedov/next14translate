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

// Combine the types
type Page = {
	home: {
		title: string;
		content: {
			body: string;
		};
	};
	about: {
		history: string;
		team: {
			members: string[];
		};
	};
};

type PagePaths = PageType<Page>; // This will be "home" | "home.title" | "home.content" | "home.content.body" | "about" | "about.history" | "about.team" | "about.team.members"

// Example usage
const pageTitle: GetValue<Page, 'home.title'> = 'Page Title'; // Valid
const pageContent: GetValue<Page, 'home.content'> = { body: 'Page Body' }; // Valid
const pageTeamMembers: GetValue<Page, 'about.team.members'> = ['Member 1', 'Member 2']; // Valid
