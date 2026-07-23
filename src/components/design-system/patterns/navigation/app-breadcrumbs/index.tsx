import { ArrowLeftCircle } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { BreadcrumbList } from "./Components/breadcrumb-list";

type AppBreadcrumbsProps = {
	backRoute: string;
	config: BreadcrumbItemConfig[];
};

export const AppBreadcrumbs = ({ backRoute, config }: AppBreadcrumbsProps): React.ReactElement => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-row items-center gap-3">
			<Button
				type="button"
				variant={"link"}
				className="px-0 w-fit h-fit"
				onClick={() => navigate(backRoute)}
				aria-label="Back"
			>
				<ArrowLeftCircle />
			</Button>

			<BreadcrumbList items={config} />
		</div>
	);
};