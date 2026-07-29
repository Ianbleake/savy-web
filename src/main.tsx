import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "@/styles/globals.css";
import { App } from "@/app/providers";
import { router } from "@/app/router";
import { PageFallback } from "@/app/router/page-fallback";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Root element #root not found");
}
createRoot(rootElement).render(
	<StrictMode>
		<App>
			<Suspense fallback={<PageFallback />}>
				<RouterProvider router={router} />
			</Suspense>
		</App>
	</StrictMode>,
);
