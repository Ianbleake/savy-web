import { motion, useReducedMotion } from "framer-motion";
import type React from "react";

type SlideUpProps = {
	children: React.ReactNode;
	className?: string;
};

const variants = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0 },
};

export const SlideUp = ({ children, className }: SlideUpProps): React.ReactElement => {
	const prefersReducedMotion = useReducedMotion();

	return (
		<motion.div
			variants={prefersReducedMotion ? undefined : variants}
			initial={prefersReducedMotion ? false : "hidden"}
			animate="visible"
			transition={
				prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" as const }
			}
			className={className}
		>
			{children}
		</motion.div>
	);
};
