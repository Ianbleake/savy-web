type LightboxDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	side: "front" | "back";
	onSideChange: (side: "front" | "back") => void;
	frontUrl: string | undefined;
	backUrl: string | undefined;
	hasFront: boolean;
	hasBack: boolean;
	ownerName: string;
};