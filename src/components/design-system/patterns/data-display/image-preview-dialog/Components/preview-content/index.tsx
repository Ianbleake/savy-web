import { FileX } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { merge } from "@/utils/ui/mergeStyles";

export const PreviewContent = ({
	title,
	src,
	alt,
}: PreviewContentProps): React.ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasError, setHasError] = useState<boolean>(false);

	return (
		<>
			{title && (
				<div className="flex items-center px-5 py-3">
					<DialogTitle className="text-sm font-medium">{title}</DialogTitle>
				</div>
			)}

			{title && <Separator />}

			<div className="flex items-center justify-center p-6 bg-muted/30">
				{isLoading && <div className="w-full h-64 animate-pulse bg-muted rounded-lg" />}
				{hasError && (
					<div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
						<FileX className="size-8" />
						<span className="text-xs">No se pudo cargar el archivo</span>
					</div>
				)}
				<img
					src={src}
					alt={alt}
					referrerPolicy="no-referrer"
					decoding="async"
					onLoad={() => setIsLoading(false)}
					onError={() => {
						setIsLoading(false);
						setHasError(true);
					}}
					className={merge(
						"max-h-[70vh] w-auto object-contain rounded-md transition-opacity duration-200",
						isLoading && "opacity-0 absolute",
						hasError && "hidden",
					)}
				/>
			</div>
		</>
	);
};