import { ApiClient } from './ApiClient';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export class ApiService {
    private elementClassName: string;

    constructor(elementClassName: string) {
        this.elementClassName = elementClassName;
    }
    
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await ApiClient.get(url, config);
            this.handleResponseError(response, 'get');
            return response.data;
        } catch (error) {
            return this.handleRequestError(error as AxiosError, 'get');
        }
    }

    public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await ApiClient.post(url, data, config);
            this.handleResponseError(response, 'create new');
            return response.data;
        } catch (error) {
            return this.handleRequestError(error as AxiosError, 'create new');
        }
    }

    public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await ApiClient.put(url, data, config);
            this.handleResponseError(response, 'update');
            return response.data;
        } catch (error) {
            return this.handleRequestError(error as AxiosError, 'update');
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await ApiClient.delete(url, config);
            this.handleResponseError(response, 'delete');
            return response.data;
        } catch (error) {
            return this.handleRequestError(error as AxiosError, 'delete');
        }
    }
    
    private handleResponseError(response: AxiosResponse, method: string): void {
        if (response.status < 200 || response.status >= 300) {
            const errorMessage = `Cannot ${method} ${this.elementClassName} database data!`;
            console.error(`Server error: ${response.status} - ${errorMessage}`);
        }
    }

    private handleRequestError<T>(error: AxiosError, method: string): Promise<T> {
        let errorMessage = `Failed to ${method} ${this.elementClassName}`;

        if (error.response) {
            errorMessage = `Server responded with status ${error.response.status}`;
            if(error.response.status === 401) {
                errorMessage = `Unautorized access attempt (${error.response.status})`;
            }
        } else if (error.request) {
            errorMessage = 'No response from server - network error';
        } else {
            errorMessage = 'Request setup error';
        }

        console.error(`Connection Error:`, errorMessage);

        return Promise.reject(new Error(errorMessage));
    }
}