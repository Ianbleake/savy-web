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
			textValue={option.label}
			description={option.description}
		>
			{option.label}
		</SelectItem>
	);
};
