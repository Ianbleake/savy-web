import type { LucideIcon } from "lucide-react";
import {
	ArrowUpDown,
	CreditCard,
	LayoutDashboard,
	PieChart,
	Settings,
	Target,
	TrendingUp,
	Wallet,
} from "lucide-react";
import { ROUTES } from "@/app/router/routes";

type MenuItem = {
	label: string;
	href: string;
	icon: LucideIcon;
};

type MenuGroup = {
	groupLabel: string;
	children: MenuItem[];
};

export type { MenuGroup, MenuItem };

export const menuItems: MenuGroup[] = [
	{
		groupLabel: "Principal",
		children: [{ label: "Dashboard", href: ROUTES.APP.ROOT, icon: LayoutDashboard }],
	},
	{
		groupLabel: "Finanzas",
		children: [
			{ label: "Cuentas", href: ROUTES.APP.ACCOUNTS, icon: Wallet },
			{ label: "Movimientos", href: ROUTES.AUX.ROOT, icon: ArrowUpDown },
			{ label: "Presupuestos", href: ROUTES.AUX.ROOT, icon: PieChart },
			{ label: "Metas", href: ROUTES.AUX.ROOT, icon: Target },
			{ label: "Tarjetas", href: ROUTES.AUX.ROOT, icon: CreditCard },
		],
	},
	{
		groupLabel: "Análisis",
		children: [{ label: "Estadísticas", href: ROUTES.AUX.ROOT, icon: TrendingUp }],
	},
	{
		groupLabel: "Sistema",
		children: [{ label: "Configuración", href: ROUTES.APP.SETTINGS, icon: Settings }],
	},
];
