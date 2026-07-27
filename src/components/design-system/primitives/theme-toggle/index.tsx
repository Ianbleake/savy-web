import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type React from "react";
import { Button } from "@/components/ui/button";
import { merge } from "@/utils/ui/mergeStyles";

type ThemeToggleProps = {
	className?: string;
};

export const ThemeToggle = ({ className }: ThemeToggleProps): React.ReactElement => {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			aria-label="Cambiar tema"
			className={merge("size-8", className)}
		>
			<Sun className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
		</Button>
	);
};
