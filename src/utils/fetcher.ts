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

export type FetchError = {
	reason?: string;
	status?: number;
	message?: string;
};

export const buildParams = (params?: Params): string => {
	if (params) {
		Object.keys(params).forEach((key) => (params[key] === undefined ? delete params[key] : {}));
		return `?${new URLSearchParams(params as Record<string, string>)}`;
	}
	return '';
};

const validateStatus = (status: number): boolean => {
	return status >= 200 && status < 300;
};

const parseData = async (response: Response): Promise<unknown> => {
	if (!validateStatus(response.status)) {
		const error: FetchError = {
			reason: `request failed with status ${response.status}`,
			status: response.status,
			message: response.statusText,
		};
		throw error;
	}
	if (response.status === 204 || response.status === 304) {
		return void 0;
	}
	try {
		const data = await response.json();
		return data;
	} catch {
		return void 0;
	}
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

	const data = await parseData(response);
	return data as T;
};
