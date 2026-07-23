import { Info } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { merge } from "@/utils/ui/mergeStyles";

type InfoCardProps = {
	children: React.ReactElement;
	size?: "xs" | "sm" | "md" | "lg";
	position?: "top" | "right" | "left" | "bottom";
};

export const InfoCard = ({
	children,
	size = "md",
	position = "top",
}: InfoCardProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const sizeStyles = {
		xs: "h-3.5 w-3.5",
		sm: "h-5 w-5",
		md: "h-8 w-8",
		lg: "h-10 w-10",
	};

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger
				className="cursor-pointer"
				onClick={() => setOpen((prev) => !prev)}
			>
				<Info className={merge("text-primary", sizeStyles[size])} />
			</PopoverTrigger>

			<PopoverContent
				side={position}
				className="text-left"
				sideOffset={8}
			>
				{children}
			</PopoverContent>
		</Popover>
	);
};