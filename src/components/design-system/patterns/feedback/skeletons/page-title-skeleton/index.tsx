import type React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const PageTitleSkeleton = (): React.ReactElement => {
	return (
		<div className="flex flex-row items-center gap-4">
			<Skeleton className="h-12 w-12" />

			<div className="flex flex-col gap-1">
				<Skeleton className="h-8 w-80" />
				<Skeleton className="h-4 w-50" />
			</div>
		</div>
	);
};