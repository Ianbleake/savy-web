import type React from "react";

export const Password = (): React.ReactElement => {
	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">Olvidaste tu contraseña?</h1>
				<p className="text-sm text-muted-foreground">Ingresa tu correo para recuperarla.</p>
			</div>

			<form></form>
		</div>
	);
};
