import type React from "react";
import { FormNavigator } from "./components/form-navigator";

type FormScreenProps = {
	formElement: import("react").ReactElement;
	submitElement: import("react").ReactElement;
	navItems: NavigatorItem[];
	navigatorTitle: string;
	navigatorSubtitle: string;
	navigatorIcon: import("react").ElementType;
};

export const FormScreen = ({
	formElement,
	submitElement,
	navItems,
	navigatorTitle,
	navigatorSubtitle,
	navigatorIcon,
}: FormScreenProps): React.ReactElement => {
	return (
		<div className="flex flex-col sm:flex-row justify-between flex-1 gap-10 w-full relative">
			<div className="flex-1">{formElement}</div>

			<div className="sticky top-25 self-start hidden sm:block">
				<div className="flex flex-col gap-6 w-sm">
					<FormNavigator
						items={navItems}
						title={navigatorTitle}
						subtitle={navigatorSubtitle}
						icon={navigatorIcon}
					/>
					{submitElement}
				</div>
			</div>
		</div>
	);
};