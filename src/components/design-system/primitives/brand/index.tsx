import { PiggyBank } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { merge } from "@/utils/ui/mergeStyles";

type Props = {
	variant?: "default" | "light";
};

export const Brand = ({ variant = "default" }: Props): React.ReactElement => {
	return (
		<Link
			to={ROUTES.LANDING.ROOT}
			className={merge(
				"text-xl font-bold flex flex-row gap-2 items-center",
				variant === "light" ? "text-white" : "text-primary",
			)}
		>
			<div
				className={merge(
					"h-10 w-10 rounded-md flex items-center justify-center",
					variant === "light" ? "bg-white/15" : "bg-emerald-600",
				)}
			>
				<PiggyBank className="size-6 text-white" />
			</div>
			Savy
		</Link>
	);
};
