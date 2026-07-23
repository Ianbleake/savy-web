const SECTION_EXPAND_DELAY_MS = 50;

export const scrollToSection = (sectionId: string): void => {
	const element = document.getElementById(sectionId);
	if (!element) return;

	window.dispatchEvent(new CustomEvent("open-section", { detail: { sectionId } }));

	setTimeout(() => {
		element.scrollIntoView({ behavior: "smooth", block: "start" });
	}, SECTION_EXPAND_DELAY_MS);
};