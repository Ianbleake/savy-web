type CardFaceProps = {
	imageUrl: string | undefined;
	hasImage: boolean;
	label: "Frente" | "Reverso";
	altText: string;
	isBack?: boolean;
	onExpand: () => void;
};