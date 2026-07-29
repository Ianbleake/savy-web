type DashboardCardCommonProps = {
	currency: string;
	locale: string;
};

type DashboardSubCardProps = DashboardCardCommonProps;

type DashboardNetWorthCardProps = DashboardCardCommonProps & {
	netWorth: import("@/services/dashboard/dashboard").DashboardNetWorth;
};

type DashboardAccountsDistributionCardProps = DashboardCardCommonProps & {
	distribution: import("@/services/dashboard/dashboard").DashboardAccountDistribution[];
};

type DashboardRecentTransactionsCardProps = DashboardCardCommonProps & {
	transactions: import("@/services/dashboard/dashboard").DashboardRecentTransaction[];
};

type DashboardActiveBudgetsCardProps = DashboardCardCommonProps & {
	budgets: import("@/services/dashboard/dashboard").DashboardActiveBudget[];
};

type DashboardSavingsGoalsCardProps = DashboardCardCommonProps & {
	goals: import("@/services/dashboard/dashboard").DashboardSavingsGoal[];
};

type DashboardCreditOverviewCardProps = DashboardCardCommonProps & {
	creditOverview: import("@/services/dashboard/dashboard").DashboardCreditOverview;
};

type DashboardBanksCardProps = DashboardCardCommonProps & {
	banks: import("@/services/dashboard/dashboard").DashboardBank[];
};

type DashboardCardDescriptor = {
	id: string;
	colSpan: string;
};