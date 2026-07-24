import { motion, useReducedMotion } from "framer-motion";
import type React from "react";

type Direction = "up" | "down" | "left" | "right";

type ScrollRevealProps = {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	direction?: Direction;
	distance?: number;
};

const getInitial = (direction: Direction, distance: number) => {
	const axis = direction === "up" || direction === "down" ? "y" : "x";
	const sign = direction === "down" || direction === "right" ? -1 : 1;

	return { opacity: 0, [axis]: distance * sign };
};

export const ScrollReveal = ({
	children,
	className,
	delay = 0,
	direction = "up",
	distance = 20,
}: ScrollRevealProps): React.ReactElement => {
	const prefersReducedMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={prefersReducedMotion ? false : getInitial(direction, distance)}
			whileInView={{ opacity: 1, x: 0, y: 0 }}
			viewport={{ once: true, margin: "-40px" }}
			transition={{
				duration: prefersReducedMotion ? 0 : 0.4,
				delay: prefersReducedMotion ? 0 : delay,
				ease: "easeOut",
			}}
		>
			{children}
		</motion.div>
	);
};
