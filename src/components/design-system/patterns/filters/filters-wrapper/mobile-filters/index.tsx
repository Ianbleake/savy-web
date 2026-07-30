import { Filter, Sparkles } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { merge } from "@/utils/ui/mergeStyles";
import { FilterButton } from "../filter-button";

type MobileFiltersProps = {
	activeFilterCount: number;
	hasActiveFilters: boolean;
	children: React.ReactElement;
	clearFilters: () => void;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
};

export const MobileFilters = ({
	activeFilterCount,
	hasActiveFilters,
	children,
	clearFilters,
	isOpen,
	onOpenChange,
	title,
	description,
}: MobileFiltersProps): React.ReactElement => {
	return (
		<Sheet
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<SheetTrigger asChild>
				<FilterButton
					isOpen={isOpen}
					activeFilterCount={activeFilterCount}
					onClick={() => onOpenChange(!isOpen)}
				/>
			</SheetTrigger>

			<SheetContent side="right">
				<SheetHeader className="py-5 px-6">
					<div className="flex items-center gap-2.5">
						<Filter className="size-4 text-primary" />
						<SheetTitle className="text-base font-semibold">{title}</SheetTitle>
					</div>
					{description && (
						<SheetDescription className="text-sm text-muted-foreground leading-snug">
							{description}
						</SheetDescription>
					)}
				</SheetHeader>

				<Separator />

				<div className="flex flex-col gap-4 p-4 [&>div]:items-stretch [&_button]:w-full">
					{children}
				</div>

				<SheetFooter
					className={merge(
						"flex flex-row items-center gap-3 py-5 px-3",
						hasActiveFilters && "border-t",
					)}
				>
					{hasActiveFilters && (
						<Button
							variant="outline"
							onClick={() => {
								clearFilters();
								onOpenChange(false);
							}}
							className="text-sm text-muted-foreground w-full"
						>
							<Sparkles />
							Limpiar filtros
						</Button>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
