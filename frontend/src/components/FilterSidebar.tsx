"use client";
import { useLocale, useTranslations } from "next-intl";

import { Checkbox } from "./ui/checkbox";
import { useCategories } from "@/hooks/useCategories";

export default function FilterSidebar({
	selectedCategories,
	setSelectedCategories,
}: {
	selectedCategories: string[];
	setSelectedCategories: (categories: string[]) => void;
}) {
	const locale = useLocale();
	const { categories } = useCategories();
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
					{categories &&
						categories.map((category) => (
							<div key={category.en_name} className="flex items-center">
								<Checkbox
									id={category.en_name}
									checked={selectedCategories.includes(category.en_name)}
									onCheckedChange={(checked) => {
										handleCategoryChange(category.en_name, checked === true);
									}}
								/>
								<label
									htmlFor={category.en_name}
									className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
									{locale === "en" ? category.en_name : category.name}
								</label>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
