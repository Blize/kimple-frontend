export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type Headers = {
	[headerName: string]: string;
};

export type Params = Record<string, string[] | string | number | boolean | undefined | null>;

export type FetchOptions = {
	headers?: Headers | null;
	params?: Params;
	next?: NextFetchRequestConfig;
	cache?: RequestCache;
};

export const buildParams = (params?: Params): string => {
	if (params) {
		Object.keys(params).forEach((key) => (params[key] === undefined ? delete params[key] : {}));
		return `?${new URLSearchParams(params as Record<string, string>)}`;
	}
	return '';
};

export const fetcher = async <T>(
	method: Method,
	endpoint: string,
	body?: unknown | null,
	options?: FetchOptions,
): Promise<T> => {
	const url = `${endpoint}${buildParams(options?.params)}`;

	const headers = options?.headers ?? {};
	const next = options?.next ?? {};

	const response = await fetch(url, {
		method: method.toUpperCase(),
		body: body ? JSON.stringify(body) : null,
		headers,
		next,
		...(options && options.cache && { cache: options.cache }),
	});

	const data = await response.json();

	return data as T;
};
