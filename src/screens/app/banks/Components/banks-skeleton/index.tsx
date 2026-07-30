import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROWS = ["banks-skel-1", "banks-skel-2", "banks-skel-3", "banks-skel-4"] as const;

export const BanksSkeleton = (): React.ReactElement => (
	<div className="flex flex-1 flex-col gap-6">
		{/* KPI strip */}
		<div className="grid grid-cols-3 gap-4">
			<Skeleton className="h-24 rounded-xl" />
			<Skeleton className="h-24 rounded-xl" />
			<Skeleton className="h-24 rounded-xl" />
		</div>

		{/* Filters */}
		<div className="flex gap-3">
			<Skeleton className="h-9 w-64 rounded-md" />
			<Skeleton className="h-9 w-40 rounded-md" />
			<Skeleton className="h-9 w-40 rounded-md" />
		</div>

		{/* List */}
		<GlassCard className="p-0">
			{SKELETON_ROWS.map((key) => (
				<div
					key={key}
					className="flex items-center gap-3 border-b border-border/30 px-4 py-3 last:border-b-0"
				>
					<Skeleton className="size-3 rounded-full" />
					<div className="flex flex-1 flex-col gap-1">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-3 w-48" />
					</div>
					<Skeleton className="h-4 w-16" />
				</div>
			))}
		</GlassCard>
	</div>
);
