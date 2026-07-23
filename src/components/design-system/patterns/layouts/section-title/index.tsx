import { PenLine } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";

export const SectionTitle = ({
	icon: Icon,
	title,
	description,
	action,
	onEdit,
	editLabel = "Editar",
}: SectionTitleProps): React.ReactElement => {
	if (description !== undefined) {
		return (
			<div className="flex flex-row items-center justify-between gap-2 px-4">
				<div className="flex flex-row items-center gap-4">
					<Icon className="text-primary shrink-0 h-8 w-8" />

					<div className="flex flex-col gap-1">
						<h2 className="text-base text-gray-900 font-medium">{title}</h2>
						<p className="text-sm text-gray-500 font-medium">{description}</p>
					</div>
				</div>

				{action}
			</div>
		);
	}

	return (
		<div className="flex flex-row items-center justify-between mb-3">
			<div className="flex flex-row items-center gap-2">
				<Icon className="size-4 text-primary" />
				<h3 className="text-sm font-medium text-gray-900">{title}</h3>
			</div>
			{onEdit && (
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="size-7 p-0 text-primary hover:text-primary hover:bg-primary/10"
					onClick={onEdit}
					title={editLabel}
				>
					<PenLine className="size-3.5" />
				</Button>
			)}
			{action}
		</div>
	);
};