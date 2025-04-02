"use client";
import { startTransition } from "react";
import { RotateCw } from "lucide-react";

import { useRouter } from "@/i18n/navigation";

/**
 * A component that displays an error message and a retry button when its
 * parent component failed to load the content.
 *
 * @param {Object} props
 * @prop {Function} refetch - a function that will be called when user clicks
 *   the retry button. This function should refetch the content and update the
 *   parent component state.
 * @returns {React.ReactElement}
 */
export function ReloadContent({
	refetch,
}: {
	refetch: () => void;
}): React.ReactElement {
	const router = useRouter();

	const handleReload = () => {
		startTransition(() => {
			router.refresh();
			refetch();
		});
	};

	return (
		<div className="flex flex-col gap-2 min-h-56 w-full justify-center items-center">
			<p className="font-semibold italic">
				Something went wrong, cannot load content
			</p>
			<RotateCw
				onClick={handleReload}
				className="cursor-pointer w-20 h-20 text-primary"
			/>
			<span>Try again</span>
		</div>
	);
}
