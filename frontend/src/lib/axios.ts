import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const apiRequest = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	withCredentials: baseURL ? true : false,
	timeout: 10000, // 10 seconds
});

// Response interceptor
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

// Request interceptor
apiRequest.interceptors.request.use((config) => {
	if (
		!["GET", "HEAD", "OPTIONS"].includes(config.method?.toUpperCase() as string)
	) {
		const csrfToken = getCsrfToken();
		if (csrfToken) {
			config.headers["X-CSRF-TOKEN"] = csrfToken;
		}
	}

	return config;
});

function getCsrfToken() {
	const name = "__ngx_csrf__";
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);

	if (parts.length === 2) {
		let token = parts.pop()?.split(";").shift();
		if (token?.includes("%7C")) {
			token = token.split("%7C")[0];
		}

		return token;
	}
	return null;
}

export default apiRequest;
