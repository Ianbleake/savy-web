import type React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { merge } from "@/utils/ui/mergeStyles";

const LightboxDialog = ({
	open,
	onOpenChange,
	side,
	onSideChange,
	frontUrl,
	backUrl,
	hasFront,
	hasBack,
	ownerName,
}: LightboxDialogProps): React.ReactElement => {
	const imageUrl = side === "front" ? frontUrl : backUrl;
	const canToggle = hasFront && hasBack;

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent
				className="p-0 bg-white overflow-hidden"
				style={{ maxWidth: "56rem" }}
			>
				<div className="flex flex-col">
					<div className="flex items-center justify-between px-5 py-3 pr-12 border-b border-gray-100">
						<h3 className="text-sm font-semibold text-gray-900">
							Credencial — {side === "front" ? "Frente" : "Reverso"}
						</h3>
						{canToggle && (
							<div className="flex items-center rounded-lg border border-gray-200 p-0.5">
								<Button
									variant="ghost"
									size="sm"
									className={merge(
										"text-xs h-7 px-3 rounded-md",
										side === "front" ? "bg-primary/10 text-primary font-medium" : "text-gray-500",
									)}
									onClick={() => onSideChange("front")}
									disabled={!hasFront}
								>
								Frente
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className={merge(
									"text-xs h-7 px-3 rounded-md",
									side === "back" ? "bg-primary/10 text-primary font-medium" : "text-gray-500",
								)}
								onClick={() => onSideChange("back")}
								disabled={!hasBack}
							>
								Reverso
								</Button>
							</div>
						)}
					</div>

					{imageUrl && (
						<div className="flex items-center justify-center bg-gray-50 p-6">
							<img
								src={imageUrl}
								alt={`Credencial ${side === "front" ? "frente" : "reverso"} — ${ownerName}`}
								referrerPolicy="no-referrer"
								loading="lazy"
								decoding="async"
								className="rounded-lg object-contain max-h-[70vh] max-w-full shadow-lg"
							/>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export { LightboxDialog };