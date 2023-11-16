import { AxiosRequestHeaders } from 'axios';

import AxiosHttpRequestAdapter from './axios-http-request.adapter';

export type RequestHeaders = AxiosRequestHeaders;

export type HttpRequestParams = {
    path: string;
    body?: object;
    params?: object;
};

export interface IHttpRequestPort {
    get(config: HttpRequestParams): Promise<unknown | null>;
    post(config: HttpRequestParams): Promise<unknown | null>;
    delete(config: HttpRequestParams): Promise<unknown | null>;
    put(config: HttpRequestParams): Promise<unknown | null>;
    setBaseUrl(baseUrl: string): void;
}

const HttpRequestPort = AxiosHttpRequestAdapter;

export default HttpRequestPort;
