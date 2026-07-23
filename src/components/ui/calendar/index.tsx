import { DayPicker } from "react-day-picker";

import { merge } from "@/utils/ui/mergeStyles";

import type * as React from "react";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={merge("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row gap-4",
				month: "flex flex-col gap-4",
				month_caption: "flex justify-center pt-1 relative items-center w-full",
				caption_label: "text-sm font-medium",
				nav: "flex items-center justify-between absolute inset-x-1",
				button_previous:
					"size-7 p-0 flex items-center justify-center opacity-70 hover:opacity-100",
				button_next:
					"size-7 p-0 flex items-center justify-center opacity-70 hover:opacity-100",
				month_grid: "w-full border-collapse space-y-1",
				weekdays: "flex",
				weekday:
					"text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
				week: "flex w-full mt-2",
				day: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
				day_button:
					"size-8 rounded-md p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
				range_start: "rounded-l-md",
				range_end: "rounded-r-md",
				range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
				selected:
					"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
				today: "bg-accent text-accent-foreground",
				outside:
					"day-outside text-muted-foreground aria-selected:text-muted-foreground",
				disabled: "text-muted-foreground opacity-50",
				hidden: "invisible",
				...classNames,
			}}
			{...props}
		/>
	);
}

export { Calendar };