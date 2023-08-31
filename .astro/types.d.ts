declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"about-me": {
"o-mnie.mdx": {
	id: "o-mnie.mdx";
  slug: "o-mnie";
  body: string;
  collection: "about-me";
  data: InferEntrySchema<"about-me">
} & { render(): Render[".mdx"] };
};
"project": {
"Lenovo-Product-Card.mdx": {
	id: "Lenovo-Product-Card.mdx";
  slug: "lenovo-product-card";
  body: string;
  collection: "project";
  data: InferEntrySchema<"project">
} & { render(): Render[".mdx"] };
"Rock-Paper-Scissors.mdx": {
	id: "Rock-Paper-Scissors.mdx";
  slug: "rock-paper-scissors";
  body: string;
  collection: "project";
  data: InferEntrySchema<"project">
} & { render(): Render[".mdx"] };
"car-service-book-v1.mdx": {
	id: "car-service-book-v1.mdx";
  slug: "car-service-book-v1";
  body: string;
  collection: "project";
  data: InferEntrySchema<"project">
} & { render(): Render[".mdx"] };
"images-gallery.mdx": {
	id: "images-gallery.mdx";
  slug: "images-gallery";
  body: string;
  collection: "project";
  data: InferEntrySchema<"project">
} & { render(): Render[".mdx"] };
"jakub-soboczynski-v1.mdx": {
	id: "jakub-soboczynski-v1.mdx";
  slug: "jakub-soboczynski-v1";
  body: string;
  collection: "project";
  data: InferEntrySchema<"project">
} & { render(): Render[".mdx"] };
"movies-search-engine.mdx": {
	id: "movies-search-engine.mdx";
  slug: "movies-search-engine";
  body: string;
  collection: "project";
  data: InferEntrySchema<"project">
} & { render(): Render[".mdx"] };
"qr-code-component.mdx": {
	id: "qr-code-component.mdx";
  slug: "qr-code-component";
  body: string;
  collection: "project";
  data: InferEntrySchema<"project">
} & { render(): Render[".mdx"] };
"raycast-height.mdx": {
	id: "raycast-height.mdx";
  slug: "raycast-height";
  body: string;
  collection: "project";
  data: InferEntrySchema<"project">
} & { render(): Render[".mdx"] };
"raycast-infakt.mdx": {
	id: "raycast-infakt.mdx";
  slug: "raycast-infakt";
  body: string;
  collection: "project";
  data: InferEntrySchema<"project">
} & { render(): Render[".mdx"] };
"raycast-raydocs.mdx": {
	id: "raycast-raydocs.mdx";
  slug: "raycast-raydocs";
  body: string;
  collection: "project";
  data: InferEntrySchema<"project">
} & { render(): Render[".mdx"] };
"vehicle-service-book.mdx": {
	id: "vehicle-service-book.mdx";
  slug: "vehicle-service-book";
  body: string;
  collection: "project";
  data: InferEntrySchema<"project">
} & { render(): Render[".mdx"] };
};
"social-link": {
"github.mdx": {
	id: "github.mdx";
  slug: "github";
  body: string;
  collection: "social-link";
  data: InferEntrySchema<"social-link">
} & { render(): Render[".mdx"] };
"linkedin.mdx": {
	id: "linkedin.mdx";
  slug: "linkedin";
  body: string;
  collection: "social-link";
  data: InferEntrySchema<"social-link">
} & { render(): Render[".mdx"] };
"mail.mdx": {
	id: "mail.mdx";
  slug: "mail";
  body: string;
  collection: "social-link";
  data: InferEntrySchema<"social-link">
} & { render(): Render[".mdx"] };
"twitter.mdx": {
	id: "twitter.mdx";
  slug: "twitter";
  body: string;
  collection: "social-link";
  data: InferEntrySchema<"social-link">
} & { render(): Render[".mdx"] };
};
"uses": {
"uses-en.mdx": {
	id: "uses-en.mdx";
  slug: "uses-en";
  body: string;
  collection: "uses";
  data: InferEntrySchema<"uses">
} & { render(): Render[".mdx"] };
"uses-pl.mdx": {
	id: "uses-pl.mdx";
  slug: "uses-pl";
  body: string;
  collection: "uses";
  data: InferEntrySchema<"uses">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
