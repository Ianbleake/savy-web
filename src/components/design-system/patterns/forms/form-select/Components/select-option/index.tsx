import type React from "react";
import { SelectItem } from "@/components/ui/select";

type SelectOptionProps = {
	option: Option;
};

export const SelectOption = ({ option }: SelectOptionProps): React.ReactElement => {
	return (
		<SelectItem
			key={option.value as string}
			value={option.value as string}
		>
			{option.description ? (
				<div className="flex flex-col">
					<p className="text-sm font-medium text-gray-900">{option.label}</p>

					<p className="text-xs font-medium text-gray-500">{option.description}</p>
				</div>
			) : (
				option.label
			)}
		</SelectItem>
	);
};