import axios from "axios";

const apiRequest = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	withCredentials: true,
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
	const csrfToken = getCsrfToken();

	if (
		["GET", "HEAD", "OPTIONS"].includes(config.method?.toUpperCase() as string)
	) {
		return config;
	}

	if (csrfToken) {
		config.headers["X-CSRF-TOKEN"] = csrfToken;
	}

	return config;
});

function getCsrfToken() {
	const name = "__ngx_csrf__";
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);

	if (parts.length === 2) {
		const token = parts.pop()?.split(";").shift();
		// debug logs
		console.log(`CSRF Token: ${token}`);
		console.log("Longitud del token: ", token?.length);
		return token;
	}
	return null;
}

export default apiRequest;
