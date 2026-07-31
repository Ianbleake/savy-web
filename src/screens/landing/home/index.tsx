import type React from "react";

import { Features } from "./components/features";
import { Hero } from "./components/hero";

export const Home = (): React.ReactElement => {
	return (
		<div>
			<Hero />
			<Features />
		</div>
	);
};
