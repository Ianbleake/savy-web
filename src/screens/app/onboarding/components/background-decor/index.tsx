import type React from "react";

export const BackgroundDecor = (): React.ReactElement => {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0"
		>
			{/* Base tinted wash */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/4 to-primary/15" />

			{/* Large distributed blobs — visible, saturated, organic */}
			<div className="absolute -left-[15%] -top-[10%] size-[700px] rounded-full bg-primary/10 blur-[140px]" />
			<div className="absolute -right-[10%] top-[15%] size-[600px] rounded-full bg-primary/12 blur-[120px]" />
			<div className="absolute -bottom-[15%] -left-[5%] size-[650px] rounded-full bg-primary/18 blur-[130px]" />
			<div className="absolute -bottom-[5%] -right-[10%] size-[550px] rounded-full bg-primary/12 blur-[110px]" />
			{/* Central accent — warmer tone for depth variation */}
			<div className="absolute left-[40%] top-[30%] size-[400px] rounded-full bg-primary/10 blur-[90px]" />

			{/* Subtle grid texture */}
			<div
				className="absolute inset-0 opacity-[0.04]"
				style={{
					backgroundImage:
						"linear-gradient(to right, var(--color-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)",
					backgroundSize: "40px 40px",
				}}
			/>
		</div>
	);
};
