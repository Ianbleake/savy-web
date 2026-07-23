import { motion, useReducedMotion } from "framer-motion";
import {
	ArrowRight,
	ArrowUpDown,
	CreditCard,
	PieChart,
	Target,
	TrendingUp,
	Wallet,
} from "lucide-react";
import type React from "react";
import { Link } from "react-router";

import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";

import { DashboardMockup } from "./Components/dashboard-mockup";
import { FeatureItem } from "./Components/feature-item";

const FEATURES = [
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

export const Home = (): React.ReactElement => {
	const prefersReducedMotion = useReducedMotion();

	const heroVariants = prefersReducedMotion
		? undefined
		: {
				hidden: { opacity: 0, y: 32 },
				visible: { opacity: 1, y: 0 },
			};

	const heroTransition = prefersReducedMotion
		? { duration: 0 }
		: { duration: 0.5, ease: "easeOut" as const };

	return (
		<>
			{/* ── Hero ── */}
			<section className="relative overflow-hidden py-20 lg:py-32">
				{/* Hero background glow */}
				<div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/8 to-transparent" />
				<div className="pointer-events-none absolute -right-32 top-1/2 size-[500px] -translate-y-1/2 rounded-full bg-primary/6 blur-3xl" />

				<div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
					{/* Text column */}
					<motion.div
						className="flex flex-col gap-6"
						initial="hidden"
						animate="visible"
						variants={{
							visible: {
								transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
							},
						}}
					>
						<motion.p
							variants={heroVariants}
							transition={heroTransition}
							className="flex items-center gap-2 text-sm font-medium text-primary"
						>
							<span className="inline-block h-px w-6 bg-primary" />
							Tu dinero, en orden
						</motion.p>

						<motion.h1
							variants={heroVariants}
							transition={{ ...heroTransition, delay: prefersReducedMotion ? 0 : 0.05 }}
							className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-tight text-foreground"
						>
							Tomá el control de tus finanzas personales
						</motion.h1>

						<motion.p
							variants={heroVariants}
							transition={{ ...heroTransition, delay: prefersReducedMotion ? 0 : 0.1 }}
							className="max-w-lg text-lg leading-relaxed text-muted-foreground"
						>
							Registrá ingresos, gastos y presupuestos en un solo lugar. Savy te ayuda a entender a
							dónde va tu plata — y a hacer que rinda más.
						</motion.p>

						<motion.div
							variants={heroVariants}
							transition={{ ...heroTransition, delay: prefersReducedMotion ? 0 : 0.15 }}
							className="flex flex-wrap items-center gap-4 pt-2"
						>
							<Button
								size="lg"
								asChild
							>
								<Link to={ROUTES.AUTH.REGISTER}>
									Empezar gratis
									<ArrowRight className="size-4" />
								</Link>
							</Button>
							<button
								type="button"
								className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
								onClick={() => {
									document
										.getElementById("funcionalidades")
										?.scrollIntoView({ behavior: "smooth" });
								}}
							>
								Ver funcionalidades
							</button>
						</motion.div>
					</motion.div>

					{/* Visual column */}
					<motion.div
						initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: prefersReducedMotion ? 0 : 0.6,
							delay: prefersReducedMotion ? 0 : 0.3,
							ease: "easeOut",
						}}
					>
						<DashboardMockup />
					</motion.div>
				</div>
			</section>

			{/* ── Features ── */}
			<section
				id="funcionalidades"
				className="border-t border-border/50 py-20 lg:py-32"
			>
				<div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
					{/* Sticky title block */}
					<div className="lg:sticky lg:top-28 lg:self-start">
						<p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
							<span className="inline-block h-px w-5 bg-primary" />
							Funcionalidades
						</p>
						<h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
							Todo lo que necesitás
						</h2>
						<p className="mt-3 text-muted-foreground">
							Herramientas para gestionar tus finanzas y tomar mejores decisiones.
						</p>
					</div>

					{/* Feature list */}
					<div className="flex flex-col">
						{FEATURES.map((feature, index) => (
							<FeatureItem
								key={feature.title}
								icon={feature.icon}
								title={feature.title}
								description={feature.description}
								index={index}
								isLast={index === FEATURES.length - 1}
								reducedMotion={prefersReducedMotion ?? false}
							/>
						))}
					</div>
				</div>
			</section>
		</>
	);
};
