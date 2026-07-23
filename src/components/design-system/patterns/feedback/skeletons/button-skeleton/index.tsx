import type React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { merge } from "@/utils/ui/mergeStyles";

type Props = {
	size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
	className?: string;
	fullWidth?: boolean;
};

export const ButtonSkeleton = ({
	size = "default",
	className,
	fullWidth = false,
}: Props): React.ReactElement => {
	return (
		<Skeleton
			className={merge(
				buttonVariants({
					size,
				}),
				"min-w-40 pointer-events-none animate-pulse border-transparent bg-muted text-transparent hover:bg-muted",
				fullWidth && "w-full",
				size === "icon" && "size-9",
				className,
			)}
		/>
	);
};