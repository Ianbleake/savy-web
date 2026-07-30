type HeadlessRenderArgs = {
	trigger: React.ReactElement | null;
	clear: React.ReactElement | null;
	panel: (content: React.ReactElement) => React.ReactElement;
};

type FiltersWrapperBaseProps = {
	activeFilterCount: number;
	hasActiveFilters: boolean;
	clearFilters: () => void;
	direction?: "left" | "right";
	mobileTitle?: string;
	mobileDescription?: string;
};

type FiltersWrapperStandardProps = FiltersWrapperBaseProps & {
	variant?: "inline" | "panel";
	children: React.ReactElement;
};

type FiltersWrapperHeadlessProps = FiltersWrapperBaseProps & {
	variant: "headless";
	children: (args: HeadlessRenderArgs) => React.ReactElement;
};

type FiltersWrapperProps = FiltersWrapperStandardProps | FiltersWrapperHeadlessProps;