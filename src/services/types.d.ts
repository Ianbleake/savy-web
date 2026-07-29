type APIResponse<T> = {
	success: boolean;
	data: T;
	message?: string;
}

type QueuedRequest = {
	resolve: (token: string) => void;
	reject: (error: unknown) => void;
};

type PaginatedResponse<T> = {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
};