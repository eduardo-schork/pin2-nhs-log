import Axios, { AxiosInstance } from 'axios';

import { HttpRequestParams, IHttpRequestPort } from './http-request.port';

const API_BASE_URL = 'http://127.0.0.1:8000';

class AxiosHttpRequest implements IHttpRequestPort {
    axiosInstance: AxiosInstance | null = null;

    async get({ path, params }: HttpRequestParams): Promise<unknown | null> {
        const { axiosInstance, url } = this._buildRequestConfig({ path, params });

        const response = await axiosInstance.get(url);

        return response.data;
    }

    async post({ path, params, body }: HttpRequestParams): Promise<unknown | null> {
        const { axiosInstance, url } = this._buildRequestConfig({ path, params });

        const response = await axiosInstance.post(url, body);

        return response.data;
    }

    async delete({ path, params }: HttpRequestParams): Promise<unknown | null> {
        const { axiosInstance, url } = this._buildRequestConfig({ path, params });

        const response = await axiosInstance.delete(url);

        return response.data;
    }

    setBaseUrl(baseUrl: string): void {
        this._getInstance();

        if (!this.axiosInstance) throw Error('Erro ao trocar a baseUrl do cliente HTTP, instância ainda não existe');

        this.axiosInstance.defaults.baseURL = baseUrl;
    }

    _createClient(): AxiosInstance {
        const client = Axios.create({
            baseURL: API_BASE_URL,
        });

        return client;
    }

    _getInstance(): AxiosInstance {
        if (!this.axiosInstance) {
            this.axiosInstance = this._createClient({});
        }

        return this.axiosInstance;
    }

    _buildQueryString(params?: object) {
        if (!params) return null;

        const queryString = Object.keys(params)
            .map((key) => key + '=' + params[key])
            .join('&');

        return `?${queryString}`;
    }

    _buildRequestConfig({ params, path }: HttpRequestParams) {
        const queryString = this._buildQueryString(params);
        const axiosInstance = this._getInstance();

        const url = `${path}${queryString ? queryString : ''}`;

        return { url, axiosInstance };
    }
}

const AxiosHttpRequestAdapter = new AxiosHttpRequest();

export default AxiosHttpRequestAdapter;
