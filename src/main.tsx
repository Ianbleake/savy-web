import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "@/styles/globals.css";
import { App } from "@/app/providers";
import { router } from "@/app/router";
import { PageFallback } from "@/app/router/page-fallback";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App>
			<Suspense fallback={<PageFallback />}>
				<RouterProvider router={router} />
			</Suspense>
		</App>
	</StrictMode>,
);