import type React from "react";

export const LoginPage = (): React.ReactElement => {
	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">Sign in</h1>
				<p className="text-sm text-muted-foreground">
					Enter your credentials to access your account.
				</p>
			</div>
			<div className="flex flex-col gap-4">
				<input
					type="email"
					placeholder="Email"
					className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
				/>
				<input
					type="password"
					placeholder="Password"
					className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
				/>
				<button
					type="button"
					className="rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
				>
					Sign in
				</button>
			</div>
		</div>
	);
};