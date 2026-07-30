import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { ClearFilters } from "../clear-filters";

type ExpandedFiltersProps = {
	isOpen: boolean;
	hasActiveFilters: boolean;
	direction: "left" | "right";
	variant: "inline" | "panel";
	clearFilters: () => void;
	children: React.ReactElement;
};

export const ExpandedFilters = ({
	isOpen,
	hasActiveFilters,
	direction,
	variant,
	clearFilters,
	children,
}: ExpandedFiltersProps): React.ReactElement => {
	if (variant === "panel") {
		return (
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="w-full overflow-hidden"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: "easeInOut" }}
					>
						<div className="flex flex-wrap items-center gap-2 pt-2">{children}</div>
					</motion.div>
				)}
			</AnimatePresence>
		);
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="flex items-center gap-2 overflow-hidden"
					initial={{ width: 0, opacity: 0, x: direction === "left" ? 10 : -10 }}
					animate={{ width: "auto", opacity: 1, x: 0 }}
					exit={{ width: 0, opacity: 0, x: direction === "left" ? 10 : -10 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				>
					{hasActiveFilters && direction === "left" && <ClearFilters clearFilters={clearFilters} />}
					{children}
					{hasActiveFilters && direction === "right" && (
						<ClearFilters clearFilters={clearFilters} />
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
