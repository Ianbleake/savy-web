type CardFaceProps = {
	imageUrl: string | undefined;
	hasImage: boolean;
	label: "Front" | "Back";
	altText: string;
	isBack?: boolean;
	onExpand: () => void;
};