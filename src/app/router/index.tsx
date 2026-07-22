import { BrowserRouter, Routes, Route } from "react-router";

function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div className="flex min-h-svh items-center justify-center">
							<h1 className="text-4xl font-bold text-primary">Savy</h1>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export { AppRouter };
