import type React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { merge } from "@/utils/ui/mergeStyles";

type AppTabsProps<TData> = {
	config: AppTabsConfig<TData>;
	data: TData;
	defaultValue?: string;
	className?: string;
	tabListClassname?: string;
	variant?: "default" | "line";
};

export const AppTabs = <TData,>({
	config,
	data,
	defaultValue,
	className,
	tabListClassname,
	variant = "default",
}: AppTabsProps<TData>): React.ReactElement => {
	return (
		<Tabs
			defaultValue={defaultValue ?? config[0]?.value}
			className={className}
		>
			<TabsList
				className={merge("", tabListClassname)}
				variant={variant}
			>
				{config.map((tab) => {
					const Icon = tab.icon;

					return (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className={merge(
								"",
								variant === "line" &&
									"text-sm text-gray-400 data-[state=active]:text-primary data-[state=active]:shadow-none pb-5 after:bg-primary!",
							)}
						>
							{Icon && <Icon />}

							<span>{tab.label}</span>
						</TabsTrigger>
					);
				})}
			</TabsList>

			{config.map((tab) => (
				<TabsContent
					key={tab.value}
					value={tab.value}
				>
					{tab.content(data)}
				</TabsContent>
			))}
		</Tabs>
	);
};