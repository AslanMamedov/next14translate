import axios, { AxiosInstance, AxiosResponse } from 'axios';

const REACT_APP_API_URL = 'http://localhost:3000/api';
interface IAccessToken {
	access_token: string;
}
class InstanceAxios {
	private api: AxiosInstance = axios.create({
		baseURL: REACT_APP_API_URL,
		withCredentials: true,
	});
	constructor() {}

	GET<T>(url: string): Promise<AxiosResponse<T>> {
		return this.interceptor().get(url);
	}
	POST<T>(url: string, data: T): Promise<AxiosResponse<T>> {
		return this.interceptor().post(url, data);
	}
	PUT<T>(url: string, data: T): Promise<AxiosResponse<T>> {
		return this.interceptor().put(url, data);
	}
	PATCH<T>(url: string, data: T): Promise<AxiosResponse<T>> {
		return this.interceptor().patch(url, data);
	}
	DELETE(url: string): Promise<AxiosResponse> {
		return this.interceptor().delete(url);
	}

	private interceptor() {
		this.api.interceptors.request.use((config) => {
			config.headers.set('Accept-Language', localStorage.getItem('locale'));

			return config;
		});

		return this.api;
	}
}
const instanceAxios = new InstanceAxios();
export default instanceAxios;
