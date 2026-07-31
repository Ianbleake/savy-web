type APIResponse<T> = {
	success: boolean;
	data: T;
	message?: string;
};