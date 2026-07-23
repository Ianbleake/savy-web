import type React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const BreadcrumbSkeleton = (): React.ReactElement => {
	return (
		<div className="flex flex-row items-center gap-3">
			<Skeleton className="h-6 w-6 rounded-full" />

			<Skeleton className="h-4 w-30" />

			<Skeleton className="h-4 w-30" />
		</div>
	);
};