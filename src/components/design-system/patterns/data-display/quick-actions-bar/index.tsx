import { ArrowLeftRight, PiggyBank, Target, TrendingUp, Wallet } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";
import { merge } from "@/utils/ui/mergeStyles";

type QuickAction = {
	label: string;
	icon: React.ElementType;
	path: string;
};

const ACTIONS: QuickAction[] = [
	{ label: "Transacción", icon: ArrowLeftRight, path: ROUTES.APP.TRANSACTIONS_NEW },
	{ label: "Cuenta", icon: Wallet, path: ROUTES.APP.ACCOUNTS_NEW },
	{ label: "Presupuesto", icon: PiggyBank, path: ROUTES.APP.BUDGETS_NEW },
	{ label: "Meta", icon: Target, path: ROUTES.APP.GOALS_NEW },
	{ label: "Ingreso", icon: TrendingUp, path: ROUTES.APP.TRANSACTIONS_NEW },
];

type QuickActionsBarProps = {
	className?: string;
};

export const QuickActionsBar = ({ className }: QuickActionsBarProps): React.ReactElement => {
	const navigate = useNavigate();

	const handleClick = (path: string): void => {
		navigate(path);
	};

	return (
		<div className={merge("flex w-full gap-2 overflow-x-auto md:flex-nowrap", className)}>
			{ACTIONS.map((action) => (
				<Button
					key={action.label}
					variant="ghost"
					size="sm"
					className="shrink-0"
					onClick={() => handleClick(action.path)}
				>
					<action.icon className="size-4" />
					{action.label}
				</Button>
			))}
		</div>
	);
};
