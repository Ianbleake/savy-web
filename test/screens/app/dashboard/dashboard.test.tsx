import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useQueryDashboardSummary } from "@/hooks/dashboard/useQueryDashboardSummary";
import { Dashboard } from "@/screens/app/dashboard";
import { useProfileStorage } from "@/storage/profile/profileStorage";

vi.mock("@/hooks/dashboard/useQueryDashboardSummary", () => ({
	useQueryDashboardSummary: vi.fn(),
}));

vi.mock("@/storage/profile/profileStorage", () => ({
	useProfileStorage: vi.fn(),
}));

const MOCK_PROFILE: Profile = {
	id: "p1",
	authId: "a1",
	email: "ian@savy.app",
	firstName: "Ian",
	lastName: "Bleake",
	secondLastName: null,
	fullName: "Ian Bleake",
	initials: "IB",
	avatarUrl: null,
	phone: null,
	currency: "MXN",
	locale: "es-MX",
	timezone: "America/Mexico_City",
	onboardingCompleted: true,
	estimatedMonthlyIncome: 4500000,
	createdAt: "2026-01-01T00:00:00Z",
	updatedAt: "2026-07-29T00:00:00Z",
};

const MOCK_SUMMARY: DashboardSummary = {
	netWorth: {
		total: 154200000,
		assets: 168000000,
		liabilities: 13800000,
		currency: "MXN",
		monthDelta: 5.2,
	},
	accountsDistribution: [
		{ type: "DEBIT", count: 3, totalBalance: 85000000, percentage: 50 },
		{ type: "CREDIT", count: 2, totalBalance: 32000000, percentage: 19 },
		{ type: "LOAN", count: 2, totalBalance: 13800000, percentage: 8 },
		{ type: "CASH", count: 1, totalBalance: 9000000, percentage: 5 },
	],
	recentTransactions: [
		{
			id: "t1",
			type: "INCOME",
			amount: 5000000,
			description: "Salario",
			date: "2026-07-29",
			accountName: "Cuenta débito",
			categoryName: "Ingresos",
		},
	],
	activeBudgets: [
		{
			id: "bg1",
			categoryName: "Comida",
			spent: 80000,
			budget: 100000,
			percentage: 80,
			remaining: 20000,
		},
	],
	savingsGoals: [
		{
			id: "sg1",
			name: "Vacaciones",
			currentAmount: 6500000,
			targetAmount: 10000000,
			percentage: 65,
			deadline: "2026-12-31",
			isCompleted: false,
		},
	],
	creditOverview: { creditCards: [], loans: [] },
	banks: [],
	generatedAt: "2026-07-29T12:00:00Z",
};

function renderDashboard(): { client: QueryClient } {
	const client = new QueryClient({
		defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
	});
	render(
		<QueryClientProvider client={client}>
			<MemoryRouter>
				<Dashboard />
			</MemoryRouter>
		</QueryClientProvider>,
	);
	return { client };
}

beforeEach(() => {
	vi.clearAllMocks();
	const mockState = { profile: MOCK_PROFILE } as ProfileStorage;
	vi.mocked(useProfileStorage).mockImplementation(
		(selector: (state: ProfileStorage) => unknown) => selector(mockState) as unknown,
	);
});

describe("Dashboard", () => {
	it("renders the greeting with the profile's first name", () => {
		vi.mocked(useQueryDashboardSummary).mockReturnValue({
			data: MOCK_SUMMARY,
			isLoading: false,
			isError: false,
			isPending: false,
			isSuccess: true,
			isFetching: false,
			isPlaceholderData: false,
			refetch: vi.fn(),
		} as unknown as ReturnType<typeof useQueryDashboardSummary>);

		renderDashboard();

		expect(screen.getByRole("heading", { level: 1, name: /Hola, Ian/i })).toBeInTheDocument();
	});

	it("renders five quick action buttons", () => {
		vi.mocked(useQueryDashboardSummary).mockReturnValue({
			data: MOCK_SUMMARY,
			isLoading: false,
			isError: false,
			isPending: false,
			isSuccess: true,
			isFetching: false,
			isPlaceholderData: false,
			refetch: vi.fn(),
		} as unknown as ReturnType<typeof useQueryDashboardSummary>);

		renderDashboard();

		const labels = ["Transacción", "Cuenta", "Presupuesto", "Meta", "Ingreso"];
		for (const label of labels) {
			expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
		}
	});

	it("shows skeletons while loading", () => {
		vi.mocked(useQueryDashboardSummary).mockReturnValue({
			data: undefined,
			isLoading: true,
			isError: false,
			isPending: true,
			isSuccess: false,
			isFetching: true,
			isPlaceholderData: false,
			refetch: vi.fn(),
		} as unknown as ReturnType<typeof useQueryDashboardSummary>);

		const { container } = render(
			<QueryClientProvider client={new QueryClient()}>
				<MemoryRouter>
					<Dashboard />
				</MemoryRouter>
			</QueryClientProvider>,
		);

		const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
		expect(skeletons.length).toBeGreaterThan(0);
	});

	it("shows the retry button in error state", async () => {
		const refetch = vi.fn();
		vi.mocked(useQueryDashboardSummary).mockReturnValue({
			data: undefined,
			isLoading: false,
			isError: true,
			isPending: false,
			isSuccess: false,
			isFetching: false,
			isPlaceholderData: false,
			refetch,
		} as unknown as ReturnType<typeof useQueryDashboardSummary>);

		renderDashboard();

		const retryButton = screen.getByRole("button", { name: /Reintentar/i });
		expect(retryButton).toBeInTheDocument();

		await userEvent.click(retryButton);
		expect(refetch).toHaveBeenCalled();
	});
});
