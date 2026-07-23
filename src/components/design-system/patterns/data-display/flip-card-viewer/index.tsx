import type React from "react";
import { useState } from "react";
import { CardFace } from "./Components/card-face";
import { EmptyState } from "./Components/empty-state";
import { LightboxDialog } from "./Components/lightbox-dialog";

export const FlipCardViewer = ({
	frontUrl,
	backUrl,
	ownerName = "Person",
}: FlipCardViewerProps): React.ReactElement => {
	const [isFlipped, setIsFlipped] = useState<boolean>(false);
	const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
	const [lightboxSide, setLightboxSide] = useState<"front" | "back">("front");

	const hasFront = !!frontUrl;
	const hasBack = !!backUrl;
	const hasAny = hasFront || hasBack;
	const canFlip = hasFront && hasBack;

	if (!hasAny) return <EmptyState />;

	return (
		<>
			<div className="flex flex-col items-center gap-3">
				<button
					type="button"
					className="relative w-full max-w-xs aspect-[16/10] cursor-pointer appearance-none border-none bg-transparent p-0"
					style={{ perspective: "1200px" }}
					onClick={() => {
						if (canFlip) setIsFlipped((previous) => !previous);
					}}
					aria-label={`ID card of ${ownerName}.${canFlip ? " Click to flip." : ""}`}
				>
					<div
						className="relative w-full h-full transition-transform duration-600 ease-in-out"
						style={{
							transformStyle: "preserve-3d",
							transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
						}}
					>
						<CardFace
							imageUrl={frontUrl}
							hasImage={hasFront}
							label="Front"
							altText={`ID card front — ${ownerName}`}
							onExpand={() => {
								setLightboxSide("front");
								setLightboxOpen(true);
							}}
						/>
						<CardFace
							imageUrl={backUrl}
							hasImage={hasBack}
							label="Back"
							altText={`ID card back — ${ownerName}`}
							isBack
							onExpand={() => {
								setLightboxSide("back");
								setLightboxOpen(true);
							}}
						/>
					</div>
				</button>
			</div>

			<LightboxDialog
				open={lightboxOpen}
				onOpenChange={setLightboxOpen}
				side={lightboxSide}
				onSideChange={setLightboxSide}
				frontUrl={frontUrl}
				backUrl={backUrl}
				hasFront={hasFront}
				hasBack={hasBack}
				ownerName={ownerName}
			/>
		</>
	);
};