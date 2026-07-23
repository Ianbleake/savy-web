import type React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

const ROW_KEYS = Array.from({ length: 5 }, (_, index) => `savy-row-${index}`);

type AppTableSkeletonProps = {
	headerslength: number;
	extraColumns?: number;
};

export const AppTableSkeleton = ({
	headerslength,
	extraColumns = 0,
}: AppTableSkeletonProps): React.ReactElement => {
	return (
		<>
			{ROW_KEYS.map((key) => (
				<TableRow key={key}>
					<TableCell colSpan={headerslength + extraColumns}>
						<div className="h-6 w-full animate-pulse rounded bg-gray-200" />
					</TableCell>
				</TableRow>
			))}
		</>
	);
};