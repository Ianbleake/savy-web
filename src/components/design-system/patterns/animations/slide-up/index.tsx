import { motion } from "framer-motion";
import type React from "react";

type SlideUpProps = {
	children: React.ReactNode;
	className?: string;
};

const variants = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0 },
};

const transition = { duration: 0.35, ease: "easeOut" as const };

export const SlideUp = ({ children, className }: SlideUpProps): React.ReactElement => {
	return (
		<motion.div
			variants={variants}
			initial="hidden"
			animate="visible"
			transition={transition}
			className={className}
		>
			{children}
		</motion.div>
	);
};