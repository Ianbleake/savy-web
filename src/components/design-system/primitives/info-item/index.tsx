import type { LucideIcon } from "lucide-react";
import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

type InfoItemProps = {
	icon?: LucideIcon;
	title: string;
	description?: string;
	children?: React.ReactNode;
	action?: React.ReactNode;
	className?: string;
};

export const InfoItem = ({
	icon: Icon,
	title,
	description,
	children,
	action,
	className,
}: InfoItemProps): React.ReactElement => {
	return (
		<div
			data-slot="info-item"
			className={merge(
				"flex items-center gap-3 rounded-lg border border-border/40 bg-white/20 px-3 py-2.5 backdrop-blur-sm",
				className,
			)}
		>
			{Icon && (
				<div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<Icon className="size-5" />
				</div>
			)}

			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<span className="truncate text-sm font-medium text-foreground">{title}</span>
				{description && <span className="text-xs text-muted-foreground">{description}</span>}
				{children}
			</div>

			{action && <div className="flex shrink-0 items-center">{action}</div>}
		</div>
	);
};
