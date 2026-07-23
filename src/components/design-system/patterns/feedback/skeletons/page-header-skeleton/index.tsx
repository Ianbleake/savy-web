import type React from "react";
import { BreadcrumbSkeleton } from "../breadcrumb-skeleton";
import { ButtonSkeleton } from "../button-skeleton";
import { PageTitleSkeleton } from "../page-title-skeleton";

export const PageHeaderSkeleton = (): React.ReactElement => {
	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-0">
			<div className="flex flex-col items-start gap-2">
				<BreadcrumbSkeleton />

				<PageTitleSkeleton />
			</div>

			<div className="flex flex-row items-center gap-2 sm:gap-4 px-4 sm:px-0">
				<ButtonSkeleton />
			</div>
		</div>
	);
};