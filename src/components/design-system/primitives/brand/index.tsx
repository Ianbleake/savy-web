import type React from "react";
import { Link } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { useAuthStorage } from "@/storage/authStorage";
import { merge } from "@/utils/ui/mergeStyles";

type BrandSize = "sm" | "md" | "lg";

const sizeStyles: Record<BrandSize, { svg: string; text: string }> = {
	sm: { svg: "size-7", text: "text-base" },
	md: { svg: "size-9", text: "text-xl" },
	lg: { svg: "size-12", text: "text-2xl" },
};

type DiamondIconProps = {
	className?: string;
};

const DiamondIcon = ({ className }: DiamondIconProps): React.ReactElement => (
	<svg
		viewBox="0 0 28 28"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		aria-hidden="true"
	>
		{/* Left crown facet — lighter */}
		<path
			d="M14 0L3 9h11V0z"
			fill="oklch(0.65 0.08 186)"
		/>
		{/* Right crown facet — darker */}
		<path
			d="M14 0l11 9H14V0z"
			fill="oklch(0.45 0.08 186)"
		/>
		{/* Left body facet — lightest */}
		<path
			d="M3 9l11 19V9H3z"
			fill="oklch(0.55 0.09 186)"
		/>
		{/* Right body facet — darkest */}
		<path
			d="M25 9L14 28V9h11z"
			fill="oklch(0.38 0.07 186)"
		/>
	</svg>
);

type Props = {
	variant?: "default" | "light";
	size?: BrandSize;
	className?: string;
};

export const Brand = ({
	variant = "default",
	size = "md",
	className,
}: Props): React.ReactElement => {
	const styles = sizeStyles[size];

	const isAuthenticated = useAuthStorage((state) => state.isAuthenticated);
	const homeRoute = isAuthenticated ? ROUTES.APP.ROOT : ROUTES.LANDING.ROOT;

	return (
		<Link
			to={homeRoute}
			className={merge(
				"font-bold flex flex-row gap-1.5 items-center tracking-tight",
				styles.text,
				variant === "light" ? "text-white" : "text-primary",
				className,
			)}
		>
			<DiamondIcon
				className={merge(styles.svg, variant === "light" ? "text-white" : "text-primary")}
			/>
			Savy
		</Link>
	);
};
