import { PiggyBank } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { ROUTES } from "@/app/router/routes";

export const Brand = (): React.ReactElement => {
	return (
		<Link
			to={ROUTES.LANDING.ROOT}
			className="text-xl font-bold text-primary flex flex-row gap-2 items-center"
		>
			<div className="h-10 w-10 rounded-md bg-emerald-600 flex items-center justify-center">
				<PiggyBank className="size-6 text-white" />
			</div>
			Savy
		</Link>
	);
};
