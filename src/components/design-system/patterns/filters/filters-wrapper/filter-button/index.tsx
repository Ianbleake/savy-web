import { Filter } from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { merge } from "@/utils/ui/mergeStyles";

type FilterButtonProps = {
	isOpen: boolean;
	activeFilterCount: number;
	onClick: () => void;
};

export const FilterButton = ({
	isOpen,
	activeFilterCount,
	onClick,
}: FilterButtonProps): React.ReactElement => {
	return (
		<Button
			variant="ghost"
			size="icon"
			className={merge(
				"relative size-8 shrink-0 text-muted-foreground hover:text-foreground",
				isOpen && "bg-muted text-foreground",
			)}
			onClick={onClick}
			title={isOpen ? "Ocultar filtros" : "Mostrar filtros"}
			aria-label={
				activeFilterCount > 0
					? `${isOpen ? "Ocultar filtros" : "Mostrar filtros"} (${activeFilterCount} activos)`
					: isOpen
						? "Ocultar filtros"
						: "Mostrar filtros"
			}
			aria-expanded={isOpen}
		>
			<Filter
				className="size-4"
				aria-hidden="true"
			/>
			{activeFilterCount > 0 && (
				<Badge
					variant="secondary"
					className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full p-0 text-[0.55rem] font-medium tabular-nums"
					aria-hidden="true"
				>
					{activeFilterCount}
				</Badge>
			)}
		</Button>
	);
};
