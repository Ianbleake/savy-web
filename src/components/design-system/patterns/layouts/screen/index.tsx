import type { LucideIcon } from "lucide-react";
import type React from "react";
import { ScreenHeader } from "./components/screen-header";

type ScreenProps = {
	title: string;
	titleElement?: React.ReactElement;
	description?: string | React.ReactElement;
	actions?: React.ReactElement;
	headerActions?: React.ReactElement;
	children?: React.ReactNode;
	icon: LucideIcon;
	backRoute?: string;
	breadCrumbConfig?: BreadcrumbItemConfig[];
};

export const Screen = ({
	title,
	titleElement,
	description,
	actions,
	headerActions,
	children,
	icon,
	backRoute,
	breadCrumbConfig,
}: ScreenProps): React.ReactElement => {
	return (
		<div className="flex flex-col flex-1 gap-4 p-4 sm:p-8">
			<ScreenHeader
				title={title}
				titleElement={titleElement}
				description={description}
				headerActions={headerActions}
				icon={icon}
				backRoute={backRoute}
				breadCrumbConfig={breadCrumbConfig}
			/>
			{actions}
			{children}
		</div>
	);
};