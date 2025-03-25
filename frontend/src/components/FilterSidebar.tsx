"use client";
import { categories } from "@/lib/constants/categories";
import { Checkbox } from "./ui/checkbox";
import { useTranslations } from "next-intl";

export default function FilterSidebar({
	selectedCategories,
	setSelectedCategories,
}: {
	selectedCategories: string[];
	setSelectedCategories: (categories: string[]) => void;
}) {
	const txt = useTranslations("BusinessPage.sortBar");

	// handle category change
	const handleCategoryChange = (category: string, checked: boolean) => {
		if (checked) {
			setSelectedCategories([...selectedCategories, category]);
		} else {
			setSelectedCategories(selectedCategories.filter((c) => c !== category));
		}
	};

	return (
		<div className="px-4">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold mb-2">{txt("title2")}</h2>
				<div className="space-y-3">
					{categories.map((category) => (
						<div key={category.name} className="flex items-center">
							<Checkbox
								id={category.name}
								checked={selectedCategories.includes(category.name)}
								onCheckedChange={(checked) => {
									handleCategoryChange(category.name, checked === true);
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
