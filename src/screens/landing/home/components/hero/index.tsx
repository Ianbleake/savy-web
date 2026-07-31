import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Button } from "@/components/ui/button";
import { getHeroTransition, getHeroVariants } from "@/content/landing/landingAnimations";
import { DashboardMockup } from "./components/dashboard-mockup";
import { HeroBackground } from "./components/hero-background";

export const Hero = (): React.ReactElement => {
	const prefersReducedMotion = useReducedMotion();
	const heroVariants = getHeroVariants(prefersReducedMotion);
	const heroTransition = getHeroTransition(prefersReducedMotion);

	const navigate = useNavigate();

	return (
		<section className="relative overflow-hidden py-20 lg:py-32">
			<HeroBackground />

			<div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
				{/* Text column */}
				<StaggerContainer className="flex flex-col gap-6">
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
							variant={"ghost"}
							size={"lg"}
							onClick={() => navigate(ROUTES.AUTH.LOGIN)}
						>
							Iniciar sesión
						</Button>
						<Button
							size="lg"
							onClick={() => navigate(ROUTES.AUTH.REGISTER)}
						>
							Empezar gratis
							<ArrowRight className="size-4" />
						</Button>
						<Button
							size={"lg"}
							type="button"
							variant={"ghost"}
							className="hidden sm:block"
							onClick={() => {
								document.getElementById("funcionalidades")?.scrollIntoView({ behavior: "smooth" });
							}}
						>
							Ver funcionalidades
						</Button>
					</motion.div>
				</StaggerContainer>

				{/* Visual column */}
				<ScaleFadeIn delay={0.3}>
					<DashboardMockup />
				</ScaleFadeIn>
			</div>
		</section>
	);
};
