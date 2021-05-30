import { StringifyOptions } from 'query-string';
import { ParsedUrlQueryInput } from 'querystring';

// Types
export type HTTPMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

export interface BaseParams {
    endpoint: string;
    qs?: ParsedUrlQueryInput;
    qsArrayFormat?: StringifyOptions['arrayFormat'];
    headers?: HeadersInit;
    config?: Omit<RequestInit, 'method' | 'headers' | 'body'>;
    body?: BodyInit | object;
    isJSONBody?: boolean;
    auth?: string;
}
