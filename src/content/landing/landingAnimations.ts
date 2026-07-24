export const getHeroVariants = (prefersReducedMotion: boolean | null) => {
	if (prefersReducedMotion) return undefined;

	return {
		hidden: { opacity: 0, y: 32 },
		visible: { opacity: 1, y: 0 },
	};
};

export const getHeroTransition = (prefersReducedMotion: boolean | null) => {
	if (prefersReducedMotion) return { duration: 0 };

	return { duration: 0.5, ease: "easeOut" as const };
};
