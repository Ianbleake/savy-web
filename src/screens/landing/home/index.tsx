import type React from "react";

import { Features } from "./Components/features";
import { Hero } from "./Components/hero";

export const Home = (): React.ReactElement => {
	return (
		<div>
			<Hero />
			<Features />
		</div>
	);
};
