type BankWithStats = {
	id: string;
	name: string;
	color: string | null;
	logo: string | null;
	isActive: boolean;
	accountCount: number;
	accountTypes: string[];
	createdAt: string;
};
