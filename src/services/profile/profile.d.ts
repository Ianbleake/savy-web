type Profile = {
	id: string;
	authId: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
	secondLastName: string | null;
	fullName: string | null;
	initials: string | null;
	avatarUrl: string | null;
	phone: string | null;
	currency: string;
	locale: string;
	timezone: string;
	onboardingCompleted: boolean;
	estimatedMonthlyIncome: number | null;
	createdAt: string;
	updatedAt: string;
};

type UpdateProfilePayload = {
	firstName?: string;
	lastName?: string;
	secondLastName?: string;
	avatarUrl?: string | null;
	phone?: string | null;
	currency?: string;
	locale?: string;
	timezone?: string;
};

