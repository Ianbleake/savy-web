import axios from "axios";

/**
 * Extracts a human-readable error message from an API error response.
 * Prefers the backend envelope message (response.data.message) over the generic Axios message.
 */
export const getApiErrorMessage = (error: unknown, fallback: string): string => {
	if (axios.isAxiosError(error)) {
		const backendMessage = error.response?.data?.message;
		if (typeof backendMessage === "string" && backendMessage.length > 0) {
			return backendMessage;
		}
		return fallback;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return fallback;
};
