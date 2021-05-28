// Dependencies
import { stringify } from 'query-string';
import { BaseParams, HTTPMethods } from './types';
import { HTTPError } from './HTTPError';

// Base Fetcher
export const createFettuccini = (baseUrl?: string, APIParams?: Omit<BaseParams, 'endpoint' | 'qs'>) => {
    const api = async <T>(method: HTTPMethods, { stringifyBody = true, ...params }: BaseParams): Promise<T> => {
        const query = params.qs
            ? `?${stringify(params.qs ?? {}, { arrayFormat: params.qsArrayFormat ?? APIParams?.qsArrayFormat })}`
            : '';

        const data = fetch(`${baseUrl}${params.endpoint}${query}`, {
            headers: {
                'Content-Type': 'application/json',
                ...APIParams?.headers,
                ...params.headers,
                ...(params.auth ? { Authorization: params.auth } : {}),
            },
            method,
            body: stringifyBody ? JSON.stringify(params.body) : (params.body as BodyInit),
            ...APIParams?.config,
            ...params.config,
        }).then(async (res) => {
            if (!res.ok) {
                const errorData = await res.json();
                const error = new HTTPError(res.status, errorData, `${res.status} - ${res.statusText}`);

                throw error;
            }

            return res.json();
        });

        return data;
    };

    return api;
};

export const fettuccini = createFettuccini();
