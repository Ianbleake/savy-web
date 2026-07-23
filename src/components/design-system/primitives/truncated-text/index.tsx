import type React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { merge } from "@/utils/ui/mergeStyles";

type TruncatedTextProps = {
	text: string;
	className?: string;
	tooltipClassName?: string;
};

export const TruncatedText = ({
	text,
	className,
	tooltipClassName,
}: TruncatedTextProps): React.ReactElement => {
	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<span className={merge("block truncate min-w-0 w-full cursor-default", className)}>
						{text}
					</span>
				}
			/>
			<TooltipContent className={tooltipClassName}>
				<span>{text}</span>
			</TooltipContent>
		</Tooltip>
	);
};