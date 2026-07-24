import { ArrowUpDown, CreditCard, PieChart, Target, TrendingUp, Wallet } from "lucide-react";

export const FEATURES = [
	{
		icon: Wallet,
		title: "Cuentas múltiples",
		description: "Agrupá todas tus cuentas bancarias, tarjetas y efectivo en un solo lugar.",
	},
	{
		icon: ArrowUpDown,
		title: "Registro de movimientos",
		description: "Ingresá ingresos y gastos en segundos. Categorizalos automáticamente.",
	},
	{
		icon: PieChart,
		title: "Presupuestos inteligentes",
		description: "Definí límites por categoría y recibí alertas cuando te estés pasando.",
	},
	{
		icon: Target,
		title: "Metas de ahorro",
		description: "Creá objetivos de ahorro y seguí tu progreso con barras visuales.",
	},
	{
		icon: CreditCard,
		title: "Tarjetas de crédito",
		description: "Controlá fechas de corte, pagos mínimos e intereses de cada tarjeta.",
	},
	{
		icon: TrendingUp,
		title: "Analíticas claras",
		description: "Gráficos simples que te muestran a dónde va tu plata, mes a mes.",
	},
] as const;
