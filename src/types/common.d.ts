type Option = {
	label: string;
	value: string;
	description?: string;
};

type AppTabItem<TData> = {
	label: string;
	value: string;
	icon?: import("lucide-react").LucideIcon;
	content: (data: TData) => import("react").ReactNode;
};

type AppTabsConfig<TData> = AppTabItem<TData>[];

type NavigatorItem = {
	sectionId: string;
	label: string;
	icon: import("react").ElementType;
};

type BreadcrumbItemConfig =
	| { label: string; href: string }
	| { label: string; href?: never };