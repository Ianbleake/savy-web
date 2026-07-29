import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { MemoryRouter } from "react-router";
import { Dashboard } from "@/screens/app/dashboard";
import { useProfileStorage } from "@/storage/profile/profileStorage";

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
		{
			id: "t2",
			type: "EXPENSE",
			amount: 125000,
			description: "Groceries",
			date: "2026-07-28",
			accountName: "Tarjeta de crédito",
			categoryName: "Comida",
		},
		{
			id: "t3",
			type: "TRANSFER",
			amount: 3000000,
			description: "Ahorro",
			date: "2026-07-27",
			accountName: "Cuenta ahorro",
			categoryName: null,
		},
		{
			id: "t4",
			type: "PAYMENT",
			amount: 890000,
			description: "Pago tarjeta",
			date: "2026-07-26",
			accountName: "Tarjeta de crédito",
			categoryName: "Pagos",
		},
		{
			id: "t5",
			type: "EXPENSE",
			amount: 45000,
			description: "Café",
			date: "2026-07-25",
			accountName: "Cuenta débito",
			categoryName: "Café",
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
		{
			id: "bg2",
			categoryName: "Transporte",
			spent: 78000,
			budget: 100000,
			percentage: 78,
			remaining: 22000,
		},
		{
			id: "bg3",
			categoryName: "Entretenimiento",
			spent: 95000,
			budget: 100000,
			percentage: 95,
			remaining: 5000,
		},
		{
			id: "bg4",
			categoryName: "Servicios",
			spent: 30000,
			budget: 100000,
			percentage: 30,
			remaining: 70000,
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
		{
			id: "sg2",
			name: "Laptop",
			currentAmount: 2500000,
			targetAmount: 2500000,
			percentage: 100,
			deadline: null,
			isCompleted: true,
		},
		{
			id: "sg3",
			name: "Fondo de emergencia",
			currentAmount: 3000000,
			targetAmount: 6000000,
			percentage: 50,
			deadline: "2027-06-30",
			isCompleted: false,
		},
		{
			id: "sg4",
			name: "Fondo nuevo",
			currentAmount: 0,
			targetAmount: 4000000,
			percentage: 0,
			deadline: null,
			isCompleted: false,
		},
	],
	creditOverview: {
		creditCards: [
			{
				id: "cc1",
				creditLimit: 20000000,
				available: 12000000,
				nextPaymentDue: "2026-08-10",
				minPayment: 800000,
			},
			{
				id: "cc2",
				creditLimit: 10000000,
				available: 8000000,
				nextPaymentDue: null,
				minPayment: null,
			},
		],
		loans: [
			{
				id: "ln1",
				principal: 50000000,
				remaining: 9800000,
				monthlyPayment: 1200000,
				nextPaymentDue: "2026-08-05",
			},
			{
				id: "ln2",
				principal: 20000000,
				remaining: 4000000,
				monthlyPayment: 600000,
				nextPaymentDue: null,
			},
		],
	},
	banks: [
		{
			id: "b1",
			name: "BBVA",
			color: "#0266AE",
			logo: null,
			accountCount: 3,
		},
		{
			id: "b2",
			name: "Santander",
			color: "#EC0000",
			logo: null,
			accountCount: 2,
		},
		{
			id: "b3",
			name: "Nubank",
			color: "#820AD1",
			logo: null,
			accountCount: 2,
		},
	],
	generatedAt: "2026-07-29T12:00:00Z",
};

const EMPTY_SUMMARY: DashboardSummary = {
	netWorth: { total: 0, assets: 0, liabilities: 0, currency: "MXN", monthDelta: null },
	accountsDistribution: [],
	recentTransactions: [],
	activeBudgets: [],
	savingsGoals: [],
	creditOverview: { creditCards: [], loans: [] },
	banks: [],
	generatedAt: "2026-07-29T12:00:00Z",
};

function seedProfile(): void {
	useProfileStorage.setState({ profile: MOCK_PROFILE });
}

function makeClientWith(data: DashboardSummary | null, isError: boolean): QueryClient {
	const client = new QueryClient({
		defaultOptions: {
			queries: { retry: false, staleTime: Infinity, gcTime: Infinity },
			mutations: { retry: false },
		},
	});
	if (isError) {
		client.setQueryDefaults(["dashboard", "summary"], {
			queryFn: () => Promise.reject(new Error("Network error")),
		});
		return client;
	}
	if (data) {
		client.setQueryData(["dashboard", "summary"], data);
	}
	return client;
}

const withProviders =
	(client: QueryClient): ((Story: () => React.ReactElement) => React.ReactElement) =>
	(Story) => {
		seedProfile();
		return (
			<QueryClientProvider client={client}>
				<MemoryRouter>
					<Story />
				</MemoryRouter>
			</QueryClientProvider>
		);
	};

const meta = {
	title: "Screens/Dashboard",
	component: Dashboard,
	parameters: { layout: "fullscreen" },
	tags: ["autodocs"],
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
	decorators: [
		(Story: () => React.ReactElement): React.ReactElement => {
			seedProfile();
			const client = new QueryClient({
				defaultOptions: {
					queries: { retry: false, staleTime: Infinity, gcTime: Infinity },
				},
			});
			// Force a never-resolving query so isLoading stays true
			client.setQueryDefaults(["dashboard", "summary"], {
				queryFn: () => new Promise<DashboardSummary>(() => undefined),
			});
			return withProviders(client)(Story);
		},
	],
	render: () => <Dashboard />,
};

export const Success: Story = {
	decorators: [
		(Story: () => React.ReactElement): React.ReactElement =>
			withProviders(makeClientWith(MOCK_SUMMARY, false))(Story),
	],
	render: () => <Dashboard />,
};

export const Empty: Story = {
	decorators: [
		(Story: () => React.ReactElement): React.ReactElement =>
			withProviders(makeClientWith(EMPTY_SUMMARY, false))(Story),
	],
	render: () => <Dashboard />,
};

export const ErrorState: Story = {
	decorators: [
		(Story: () => React.ReactElement): React.ReactElement =>
			withProviders(makeClientWith(null, true))(Story),
	],
	render: () => <Dashboard />,
};
