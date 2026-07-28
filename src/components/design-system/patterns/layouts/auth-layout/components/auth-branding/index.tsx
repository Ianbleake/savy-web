import type React from "react";
import { Brand } from "@/components/design-system/primitives/brand";
import { UIPattern } from "./Components/ui-pattern";

export const AuthBranding = (): React.ReactElement => {
	return (
		<aside className="relative hidden w-1/2 overflow-hidden lg:block">
			{/* Layer 1: Decorative pattern grid */}
			<div className="absolute inset-0">
				<UIPattern />
			</div>

			{/* Layer 2: Glass overlay — lighter to let the teal shine through */}
			<div className="absolute inset-0 bg-[oklch(0.35_0.08_186/0.30)]" />
			<div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.40_0.08_186/0.15)] via-transparent to-[oklch(0.25_0.06_186/0.30)]" />

			{/* Layer 2b: Gradient vignettes — softer for brighter feel */}
			<div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[oklch(0.30_0.07_186/0.45)] to-transparent" />
			<div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[oklch(0.22_0.06_186/0.65)] to-transparent" />

			{/* Layer 3: Foreground content */}
			<div className="relative z-10 flex h-full flex-col justify-between p-8 pb-12">
				<Brand variant="light" />
				<div>
					<h2 className="text-3xl font-bold tracking-tight text-white">
						Tus finanzas,
						<br />
						en un solo lugar.
					</h2>
					<p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
						Registra tus ingresos, gastos y presupuestos. Savy te ayuda a entender hacia dónde va tu
						dinero.
					</p>
				</div>
			</div>
		</aside>
	);
};
