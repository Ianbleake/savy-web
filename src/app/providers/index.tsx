import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ThemeProvider } from "next-themes";
import type React from "react";

import { DevTools } from "@/components/design-system/patterns/layouts/dev-tools";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { persister } from "@/services/persister";
import { queryClient } from "@/services/query-client";

type ProvidersProps = {
	children: React.ReactNode;
};

function App({ children }: ProvidersProps): React.ReactElement {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<PersistQueryClientProvider
				client={queryClient}
				persistOptions={{ persister, maxAge: 30 * 60 * 1000 }}
			>
				<TooltipProvider delayDuration={100}>
					{children}
					<Toaster
						richColors
						closeButton
						position="bottom-right"
					/>
				</TooltipProvider>
				{!import.meta.env.PROD && <DevTools />}
			</PersistQueryClientProvider>
		</ThemeProvider>
	);
}

export { App };
