import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type React from "react";

import { merge } from "@/utils/ui/mergeStyles";

type Props = {
	icon: LucideIcon;
	title: string;
	description: string;
	index: number;
	isLast: boolean;
	reducedMotion: boolean;
};

export const FeatureItem = ({
	icon: Icon,
	title,
	description,
	index,
	isLast,
	reducedMotion,
}: Props): React.ReactElement => {
	return (
		<motion.div
			className={merge("flex gap-4 py-6", !isLast && "border-b border-border/50")}
			initial={reducedMotion ? false : { opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-40px" }}
			transition={{
				duration: reducedMotion ? 0 : 0.4,
				delay: reducedMotion ? 0 : index * 0.06,
				ease: "easeOut",
			}}
		>
			<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
				<Icon className="size-5" />
			</div>
			<div>
				<h3 className="font-semibold text-foreground">{title}</h3>
				<p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
			</div>
		</motion.div>
	);
};
