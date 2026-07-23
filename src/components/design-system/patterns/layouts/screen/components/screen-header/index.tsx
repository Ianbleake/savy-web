import type { LucideIcon } from "lucide-react";
import type React from "react";
import { AppBreadcrumbs } from "@/components/design-system/patterns/navigation/app-breadcrumbs";

type ScreenHeaderProps = {
	title: string;
	titleElement?: React.ReactElement;
	description?: string | React.ReactElement;
	headerActions?: React.ReactElement;
	icon: LucideIcon;
	backRoute?: string;
	breadCrumbConfig?: BreadcrumbItemConfig[];
};

export const ScreenHeader = ({
	title,
	titleElement,
	description,
	headerActions,
	icon,
	backRoute,
	breadCrumbConfig,
}: ScreenHeaderProps): React.ReactElement => {
	const Icon = icon;

	const breadCrumbsExist = breadCrumbConfig && breadCrumbConfig.length > 0 && backRoute;

	return (
		<div className="flex flex-col sm:flex-row sm:items-center justify-between flex-wrap gap-8 sm:gap-4">
			<div className="flex flex-col items-start gap-2">
				{breadCrumbsExist && (
					<AppBreadcrumbs
						backRoute={backRoute}
						config={breadCrumbConfig}
					/>
				)}

				<div className="flex flex-row items-center gap-4">
					<div className="h-12 w-12 bg-primary/15 border border-primary/20 rounded-lg flex items-center justify-center">
						<Icon className="text-primary" />
					</div>

					<div className="flex flex-col gap-1">
						{titleElement ? (
							<div className="flex flex-row items-center gap-4">
								<h2 className="text-2xl font-medium text-gray-900">{title}</h2>
								{titleElement}
							</div>
						) : (
							<h2 className="text-2xl font-medium text-gray-900">{title}</h2>
						)}
						{description &&
							(typeof description === "string" ? (
								<p className="text-sm text-gray-500">{description}</p>
							) : (
								description
							))}
					</div>
				</div>
			</div>

			<div className="flex flex-col-reverse sm:flex-row sm:items-center gap-8 sm:gap-4">
				{headerActions}
			</div>
		</div>
	);
};