import type React from "react";

export const HeroBackground = (): React.ReactElement => {
	return (
		<>
			<div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[68%] bg-primary/4  lg:block" />
			<div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] bg-primary/5	lg:block" />
			<div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-primary/4  lg:block" />
			<div className="pointer-events-none absolute -right-20 top-1/4 hidden size-[700px] rounded-full bg-primary/5 blur-3xl lg:block" />
			<div className="pointer-events-none absolute -bottom-40 right-[15%] hidden size-[500px] rounded-full bg-primary/4 blur-3xl lg:block" />
			<div className="pointer-events-none absolute right-[35%] top-0 hidden h-full w-[200px] bg-gradient-to-l from-primary/3 to-transparent lg:block" />
		</>
	);
};
