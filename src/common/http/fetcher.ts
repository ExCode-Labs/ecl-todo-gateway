import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import { requestContext } from '../context/request-context';

export class FetcherError extends Error {
  public readonly statusCode: number;
  public readonly responseData: unknown;

  constructor(message: string, statusCode: number, responseData?: unknown) {
    super(message);

    this.name = 'FetcherError';
    this.statusCode = statusCode;
    this.responseData = responseData;
  }
}

export class Fetcher {
  private readonly httpClient: AxiosInstance;

  constructor(private readonly baseUrl: string) {
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 10_000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.httpClient.interceptors.request.use((config) => {
      const context = requestContext.getStore();

      if (context?.headers) {
        const headers = AxiosHeaders.from(config.headers);

        for (const [key, value] of Object.entries(context.headers)) {
          if (value !== undefined) {
            headers.set(key, value);
          }
        }

        config.headers = headers;
      }

      return config;
    });
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.httpClient.get<T>(path, config);

      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  async post<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.httpClient.post<T>(path, body, config);

      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  async put<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.httpClient.put<T>(path, body, config);

      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  async patch<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.httpClient.patch<T>(path, body, config);

      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.httpClient.delete<T>(path, config);

      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): FetcherError {
    if (!axios.isAxiosError(error)) {
      return new FetcherError('Unexpected error occurred while making backend request.', 500);
    }

    const axiosError = error as AxiosError;

    if (axiosError.response) {
      return new FetcherError(
        this.getErrorMessage(axiosError),
        axiosError.response.status,
        axiosError.response.data,
      );
    }

    if (axiosError.request) {
      return new FetcherError('Backend service is unavailable.', 503);
    }

    return new FetcherError(axiosError.message, 500);
  }

  private getErrorMessage(error: AxiosError): string {
    if (
      error.response?.data &&
      typeof error.response.data === 'object' &&
      'message' in error.response.data
    ) {
      return String((error.response.data as { message: unknown }).message);
    }

    return 'Backend request failed.';
  }
}
