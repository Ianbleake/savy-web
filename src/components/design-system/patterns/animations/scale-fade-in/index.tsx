import { motion, useReducedMotion } from "framer-motion";
import type React from "react";

type ScaleFadeInProps = {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	scale?: number;
};

export const ScaleFadeIn = ({
	children,
	className,
	delay = 0,
	scale = 0.95,
}: ScaleFadeInProps): React.ReactElement => {
	const prefersReducedMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={prefersReducedMotion ? false : { opacity: 0, scale }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: prefersReducedMotion ? 0 : 0.6,
				delay: prefersReducedMotion ? 0 : delay,
				ease: "easeOut",
			}}
		>
			{children}
		</motion.div>
	);
};
