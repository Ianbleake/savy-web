import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { merge } from "@/utils/ui/mergeStyles";
import { scrollToSection } from "@/utils/ui/scrollToSection";

type FormNavigatorProps = {
	items: NavigatorItem[];
	title: string;
	subtitle: string;
	icon: import("react").ElementType;
};

export const FormNavigator = ({
	items,
	title,
	subtitle,
	icon: Icon,
}: FormNavigatorProps): React.ReactElement => {
	const [activeSection, setActiveSection] = useState<string>(items[0]?.sectionId ?? "");

	useEffect(() => {
		const BAND_RATIO = 0.3;
		let ticking = false;

		const updateActiveSection = () => {
			const bandTop = window.innerHeight * BAND_RATIO;
			let current = items[0]?.sectionId ?? "";

			for (const item of items) {
				const el = document.getElementById(item.sectionId);
				if (el && el.getBoundingClientRect().top <= bandTop) {
					current = item.sectionId;
				}
			}

			setActiveSection(current);
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(updateActiveSection);
				ticking = true;
			}
		};

		document.addEventListener("scroll", onScroll, {
			capture: true,
			passive: true,
		});
		updateActiveSection();

		return () => {
			document.removeEventListener("scroll", onScroll, { capture: true });
		};
	}, [items]);

	return (
		<Card className="sticky top-4">
			<div className="flex flex-row items-center gap-3 px-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/15">
					<Icon className="h-6 w-6 text-primary" />
				</div>

				<div className="flex flex-1 flex-row items-center justify-between gap-0.5">
					<div className="flex flex-col gap-1">
						<h2 className="text-sm font-medium capitalize text-gray-900">{title}</h2>

						<p className="text-xs font-medium text-gray-500">{subtitle}</p>
					</div>
				</div>
			</div>

			<Separator />

			<div className="flex flex-col gap-1 p-2">
				{items.map((item) => {
					const ItemIcon = item.icon;
					const isActive = activeSection === item.sectionId;

					return (
						<Button
							key={item.sectionId}
							variant="ghost"
							onClick={() => scrollToSection(item.sectionId)}
							className={merge(
								"group justify-start border transition-all",
								isActive
									? "border-primary/20 bg-primary/20!"
									: "border-transparent hover:border-primary/20 hover:bg-primary/20",
							)}
						>
							<ItemIcon
								className={merge(
									"h-4 w-4 transition-colors",
									isActive ? "text-primary" : "text-gray-500 group-hover:text-primary",
								)}
							/>

							<span
								className={merge(
									"text-sm font-medium transition-colors",
									isActive ? "text-primary" : "text-gray-600 group-hover:text-primary",
								)}
							>
								{item.label}
							</span>
						</Button>
					);
				})}
			</div>
		</Card>
	);
};