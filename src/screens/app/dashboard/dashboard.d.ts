type DashboardCardCommonProps = {
	currency: string;
	locale: string;
};

type DashboardSubCardProps = DashboardCardCommonProps;

type DashboardNetWorthCardProps = DashboardCardCommonProps & {
	netWorth: DashboardNetWorth;
};

type DashboardAccountsDistributionCardProps = DashboardCardCommonProps & {
	distribution: DashboardAccountDistribution[];
};

type DashboardRecentTransactionsCardProps = DashboardCardCommonProps & {
	transactions: DashboardRecentTransaction[];
};

type DashboardActiveBudgetsCardProps = DashboardCardCommonProps & {
	budgets: DashboardActiveBudget[];
};

type DashboardSavingsGoalsCardProps = DashboardCardCommonProps & {
	goals: DashboardSavingsGoal[];
};

type DashboardCreditOverviewCardProps = DashboardCardCommonProps & {
	creditOverview: DashboardCreditOverview;
};

type DashboardBanksCardProps = DashboardCardCommonProps & {
	banks: DashboardBank[];
};

type DashboardCardDescriptor = {
	id: string;
	colSpan: string;
};