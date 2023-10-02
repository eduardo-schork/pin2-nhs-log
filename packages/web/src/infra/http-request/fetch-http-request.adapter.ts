import { HttpRequestParams, IHttpRequestPort } from './http-request.port';

class FetchHttpRequest implements IHttpRequestPort {
    get(config: HttpRequestParams): Promise<unknown> {
        // fetch('');
        // throw new Error('Method not implemented.');
    }
    post(config: HttpRequestParams): Promise<unknown> {
        throw new Error('Method not implemented.');
    }
    delete(config: HttpRequestParams): Promise<unknown> {
        throw new Error('Method not implemented.');
    }
    setBaseUrl(baseUrl: string): void {
        throw new Error('Method not implemented.');
    }
}

export default FetchHttpRequest;
