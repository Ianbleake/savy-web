type IncomeSourceFrequency = "WEEKLY" | "BIWEEKLY" | "MONTHLY";

type IncomeSource = {
	id: string;
	profileId: string;
	name: string;
	amount: number;
	frequency: IncomeSourceFrequency;
	paydays: number[];
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type CreateIncomeSourcePayload = {
	name: string;
	amount: number;
	frequency: IncomeSourceFrequency;
	paydays: number[];
};

type UpdateIncomeSourcePayload = Partial<CreateIncomeSourcePayload>;

type BulkCreateResponse = {
	creationState: "success" | "partial" | "failed";
	total: number;
	successful: IncomeSource[];
	failed: { input: CreateIncomeSourcePayload; errors: string[] }[];
};

type IncomeSourceService = {
	getAll: () => Promise<IncomeSource[]>;
	create: (payload: CreateIncomeSourcePayload) => Promise<IncomeSource>;
	bulkCreate: (payload: { sources: CreateIncomeSourcePayload[] }) => Promise<BulkCreateResponse>;
	update: (id: string, payload: UpdateIncomeSourcePayload) => Promise<IncomeSource>;
	remove: (id: string) => Promise<void>;
};
