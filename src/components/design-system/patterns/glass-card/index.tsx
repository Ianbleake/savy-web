import type React from "react";
import { Card } from "@/components/ui/card";
import { merge } from "@/utils/ui/mergeStyles";

const GLASS_LIGHT = [
	"bg-white/30",
	"backdrop-blur-2xl",
	"border border-white/25",
	"shadow-[0_8px_32px_rgba(0,0,0,0.04)]",
].join(" ");

const GLASS_DARK = [
	"bg-white/[0.08]",
	"backdrop-blur-2xl",
	"border border-white/[0.14]",
	"shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
	"ring-1 ring-inset ring-white/[0.08]",
].join(" ");

type GlassCardProps = React.ComponentProps<typeof Card> & {
	variant?: "light" | "dark";
};

export const GlassCard = ({
	variant = "light",
	className,
	children,
	...props
}: GlassCardProps): React.ReactElement => {
	const glass = variant === "dark" ? GLASS_DARK : GLASS_LIGHT;

	return (
		<Card
			data-glass={variant}
			className={merge(glass, className)}
			{...props}
		>
			{children}
		</Card>
	);
};
