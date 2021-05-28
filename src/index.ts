// Dependencies
import { stringify } from 'query-string';
import { BaseParams, HTTPMethods } from './types';
import { HTTPError } from './HTTPError';

// Base Fetcher
export const createFettuccine = (baseUrl?: string, headers?: HeadersInit) => {
    const api = async <T>(method: HTTPMethods, { stringifyBody = true, ...params }: BaseParams): Promise<T> => {
        const query = params.qs ? `?${stringify(params.qs ?? {}, { arrayFormat: params.qsArrayFormat })}` : '';

        const data = fetch(`${baseUrl}${params.endpoint}${query}`, {
            headers: {
                'Content-Type': 'application/json',
                ...headers,
                ...params.headers,
                ...(params.auth ? { Authorization: params.auth } : {}),
            },
            method,
            body: stringifyBody ? JSON.stringify(params.body) : (params.body as BodyInit),
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

export const fettuccine = createFettuccine();