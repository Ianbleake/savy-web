import { Expand, IdCard } from "lucide-react";
import type React from "react";

const CardFace = ({
	imageUrl,
	hasImage,
	label,
	altText,
	isBack = false,
	onExpand,
}: CardFaceProps): React.ReactElement => (
	<div
		className="absolute inset-0 rounded-xl overflow-hidden border-2 border-gray-200 bg-white shadow-md"
		style={{
			backfaceVisibility: "hidden",
			...(isBack ? { transform: "rotateY(180deg)" } : {}),
		}}
	>
		{hasImage && imageUrl ? (
			<img
				src={imageUrl}
				alt={altText}
				referrerPolicy="no-referrer"
				loading="lazy"
				decoding="async"
				className="w-full h-full object-cover"
			/>
		) : (
			<div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 gap-2">
				<IdCard className="size-6 text-gray-300" />
				<p className="text-xs text-gray-400">{label} not available</p>
			</div>
		)}

		<div className="absolute bottom-2 left-2 rounded px-1.5 py-0.5 bg-black/50 text-[0.4rem] font-bold text-white uppercase tracking-widest backdrop-blur-sm">
			{label}
		</div>

		{hasImage && (
			<button
				type="button"
				className="absolute bottom-2 right-2 rounded bg-black/50 p-1 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
				onClick={(event) => {
					event.stopPropagation();
					onExpand();
				}}
				aria-label="View expanded"
			>
				<Expand className="size-3" />
			</button>
		)}
	</div>
);

export { CardFace };