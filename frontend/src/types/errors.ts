export type ApiErrorResponse = {
	error: {
		message: string;
		error: string;
		statusCode: number;
	};
	timestamp: Date;
};
