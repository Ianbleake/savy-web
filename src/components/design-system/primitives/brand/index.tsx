import { PiggyBank } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { merge } from "@/utils/ui/mergeStyles";

type BrandSize = "sm" | "md" | "lg";

const sizeStyles: Record<BrandSize, { container: string; icon: string; text: string }> = {
	sm: { container: "size-8 rounded", icon: "size-4", text: "text-base" },
	md: { container: "size-10 rounded-md", icon: "size-6", text: "text-xl" },
	lg: { container: "size-12 rounded-lg", icon: "size-7", text: "text-2xl" },
};

type Props = {
	variant?: "default" | "light";
	size?: BrandSize;
};

export const Brand = ({ variant = "default", size = "md" }: Props): React.ReactElement => {
	const styles = sizeStyles[size];

	return (
		<Link
			to={ROUTES.LANDING.ROOT}
			className={merge(
				"font-bold flex flex-row gap-2 items-center",
				styles.text,
				variant === "light" ? "text-white" : "text-primary",
			)}
		>
			<div
				className={merge(
					"flex items-center justify-center",
					styles.container,
					variant === "light" ? "bg-white/15" : "bg-emerald-600",
				)}
			>
				<PiggyBank className={merge(styles.icon, "text-white")} />
			</div>
			Savy
		</Link>
	);
};
