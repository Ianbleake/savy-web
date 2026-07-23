import type React from "react";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const FormSheet = ({
	open,
	onOpenChange,
	icon: Icon,
	title,
	description,
	maxWidth = "28rem",
	children,
	footer,
}: FormSheetProps): React.ReactElement => {
	return (
		<Sheet
			open={open}
			onOpenChange={onOpenChange}
		>
			<SheetContent
				side="right"
				style={{ maxWidth }}
			>
				{/* Header */}
				<SheetHeader className="py-5 px-6">
					<div className="flex items-center gap-2.5">
						<Icon className="size-4 text-primary" />
						<SheetTitle className="text-base font-semibold text-gray-900">{title}</SheetTitle>
					</div>
					{description && (
						<SheetDescription className="text-sm text-muted-foreground leading-snug">
							{description}
						</SheetDescription>
					)}
				</SheetHeader>

				<Separator />

				{/* Body */}
				{children}

				{/* Footer */}
				{footer && (
					<>
						<Separator />
						<SheetFooter className="flex flex-row items-center justify-end gap-3 py-5 px-6">
							{footer}
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
};