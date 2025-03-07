"use client";
import { categories } from "@/lib/constants/categories";
import { Checkbox } from "./ui/checkbox";
import { Dispatch, SetStateAction } from "react";

export default function FilterSidebar({
	selectedCategories,
	setSelectedCategories,
}: {
	selectedCategories: string[];
	setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}) {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-lg font-semibold mb-2">Categories</h2>
				<div className="space-y-3">
					{categories.map((category) => (
						<div key={category.name} className="flex items-center">
							<Checkbox
								id={category.name}
								checked={selectedCategories.includes(category.name)}
								onCheckedChange={(checked) => {
									if (checked === true) {
										setSelectedCategories((prev) => [...prev, category.name]);
									} else {
										setSelectedCategories((prev) =>
											prev.filter((cat) => cat !== category.name)
										);
									}
								}}
							/>
							<label
								htmlFor={category.name}
								className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
								{category.name}
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
