import type React from "react";

import { ScrollReveal } from "@/components/design-system/patterns/animations/scroll-reveal";
import { FEATURES } from "@/content/landing/landingData";
import { FeatureItem } from "./feature-item";

export const Features = (): React.ReactElement => {
	return (
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
					{FEATURES.map((feature, featureIndex) => (
						<ScrollReveal
							key={feature.title}
							delay={featureIndex * 0.06}
						>
							<FeatureItem
								icon={feature.icon}
								title={feature.title}
								description={feature.description}
								isLast={featureIndex === FEATURES.length - 1}
							/>
						</ScrollReveal>
					))}
				</div>
			</div>
		</section>
	);
};
