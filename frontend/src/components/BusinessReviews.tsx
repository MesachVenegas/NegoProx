"use client";

export default function BusinessReviews({
	id,
	sortBy,
}: {
	id: string;
	sortBy: string;
}) {
	return (
		<div>
			<span>{id}</span>
			<span>{sortBy}</span>
		</div>
	);
}
