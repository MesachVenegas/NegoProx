import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("HomePage");

	return <div className="container mx-auto max-w-[1400px]">{t("title")}</div>;
}
