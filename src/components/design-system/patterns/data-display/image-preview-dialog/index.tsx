import type React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { merge } from "@/utils/ui/mergeStyles";
import { PreviewContent } from "./Components/preview-content";

export const ImagePreviewDialog = ({
	src,
	alt = "image",
	className,
	previewClassName,
	title,
}: ImagePreviewDialogProps): React.ReactElement => {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<img
						src={src}
						alt={alt}
						referrerPolicy="no-referrer"
						loading="lazy"
						decoding="async"
						className={merge(
							"cursor-pointer rounded-md object-contain transition hover:opacity-80 h-35",
							previewClassName,
						)}
					/>
				}
			/>

			<DialogContent className={merge("sm:max-w-3xl p-0 gap-0 overflow-hidden", className)}>
				<PreviewContent
					title={title}
					src={src}
					alt={alt}
				/>
			</DialogContent>
		</Dialog>
	);
};