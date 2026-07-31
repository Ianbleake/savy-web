import type { LucideIcon } from "lucide-react";
import type React from "react";

import { merge } from "@/utils/ui/mergeStyles";

type Props = {
	icon: LucideIcon;
	title: string;
	description: string;
	isLast: boolean;
};

export const FeatureItem = ({
	icon: Icon,
	title,
	description,
	isLast,
}: Props): React.ReactElement => {
	return (
		<div className={merge("flex gap-4 py-6", !isLast && "border-b border-border/50")}>
			<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
				<Icon className="size-5" />
			</div>
			<div>
				<h3 className="font-semibold text-foreground">{title}</h3>
				<p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
			</div>
		</div>
	);
};
