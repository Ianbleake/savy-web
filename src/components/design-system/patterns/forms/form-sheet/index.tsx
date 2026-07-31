import type React from "react";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

type FormSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	/** Icon shown in the header next to the title */
	icon: React.ElementType;
	/** Sheet title text */
	title: string;
	/** Optional description shown below the title */
	description?: string;
	/** Maximum width of the sheet panel (default: "28rem") */
	maxWidth?: string;
	/** Sheet body — form fields, content, etc. */
	children: React.ReactNode;
	/** Footer actions — buttons, etc. If omitted, no footer is rendered */
	footer?: React.ReactNode;
};

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
