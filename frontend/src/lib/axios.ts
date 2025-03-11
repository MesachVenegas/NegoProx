import axios from "axios";

const apiRequest = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		"Content-Encoding": "gzip deflate br",
	},
	withCredentials: true,
	timeout: 10000, // 10 seconds
});

apiRequest.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			const { status, data } = error.response;

			switch (status) {
				case 401:
					console.error("unauthorized", data.message);
					break;
				case 403:
					console.error("forbidden", data.message);
					break;
				case 422:
				case 400:
					console.error("Validation error", data.message);
					break;
				case 500:
					console.error("Server error", data.message);
					break;
				default:
					console.error(`Unknown error ${status}`, data);
			}
		} else if (error.request) {
			console.error("Network error cannot reach the server");
		} else {
			console.error("Error", error.message);
		}

		return Promise.reject(error);
	}
);

export default apiRequest;
