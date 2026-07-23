import { IdCard } from "lucide-react";
import type React from "react";

const EmptyState = (): React.ReactElement => (
	<div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-200 bg-gray-50/50 p-8 h-full min-h-28">
		<IdCard className="size-8 text-gray-300" />
		<div className="flex flex-col items-center gap-0.5">
			<p className="text-sm font-medium text-gray-400">No card registered</p>
			<p className="text-xs text-gray-300">Add it from the edit page</p>
		</div>
	</div>
);

export { EmptyState };