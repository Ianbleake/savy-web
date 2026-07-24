import { motion, useReducedMotion } from "framer-motion";
import type React from "react";

type StaggerElement = "div" | "ul" | "section";

type StaggerContainerProps = {
	children: React.ReactNode;
	className?: string;
	stagger?: number;
	as?: StaggerElement;
};

export const StaggerContainer = ({
	children,
	className,
	stagger = 0.12,
	as = "div",
}: StaggerContainerProps): React.ReactElement => {
	const prefersReducedMotion = useReducedMotion();
	const Component = motion[as];

	return (
		<Component
			className={className}
			initial="hidden"
			animate="visible"
			variants={{
				visible: {
					transition: { staggerChildren: prefersReducedMotion ? 0 : stagger },
				},
			}}
		>
			{children}
		</Component>
	);
};
