import { Edit3, RefreshCw } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { AppBreadcrumbs } from "@/components/design-system/patterns/navigation/app-breadcrumbs";
import { Button } from "@/components/ui/button";
import { PERIOD_OPTIONS } from "@/content/banks/bankContent";
import { useQueryBankSummary } from "@/hooks/banks/useQueryBankSummary";
import { useProfileStorage } from "@/storage/profile/profileStorage";
import { merge } from "@/utils/ui/mergeStyles";
import { AccountsGrid } from "./components/accounts-grid";
import { BalanceChart } from "./components/balance-chart";
import { BankHero } from "./components/bank-hero";
import { DetailSkeleton } from "./components/detail-skeleton";
import { IncomeExpensesChart } from "./components/income-expenses-chart";
import { LoansSection } from "./components/loans-section";
import { TopCategories } from "./components/top-categories";

const DEFAULT_CURRENCY = "MXN";
const DEFAULT_LOCALE = "es-MX";

export const BankDetail = (): React.ReactElement => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const profile = useProfileStorage((state) => state.profile);
	const currency = profile?.currency ?? DEFAULT_CURRENCY;
	const locale = profile?.locale ?? DEFAULT_LOCALE;
	const [period, setPeriod] = useState<string>("month");

	const query = useQueryBankSummary(id ?? "", period as PeriodType);

	const isLoading = query.isLoading;
	const isError = query.isError;
	const data = query.data;

	if (isLoading) {
		return <DetailSkeleton />;
	}

	if (isError || !data) {
		return (
			<div className="flex flex-1 flex-col gap-6 p-6">
				<AppBreadcrumbs
					backRoute={ROUTES.APP.BANKS}
					config={[{ label: "Bancos", href: ROUTES.APP.BANKS }, { label: "Detalle" }]}
				/>
				<Empty
					icon={RefreshCw}
					title="No pudimos cargar la información del banco"
					description="Revisa tu conexión e inténtalo de nuevo."
					action={{
						label: "Reintentar",
						icon: RefreshCw,
						onClick: () => {
							void query.refetch();
						},
					}}
				/>
			</div>
		);
	}

	const editRoute = ROUTES.APP.BANKS_EDIT.replace(":id", id ?? "");

	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			<div className="flex items-center justify-between">
				<AppBreadcrumbs
					backRoute={ROUTES.APP.BANKS}
					config={[{ label: "Bancos", href: ROUTES.APP.BANKS }, { label: data.bank.name }]}
				/>
				<Button
					variant="outline"
					onClick={() => navigate(editRoute)}
				>
					<Edit3 className="size-4" />
					Editar
				</Button>
			</div>

			<ScaleFadeIn>
				<BankHero
					bankName={data.bank.name}
					bankColor={data.bank.color}
					isActive={data.bank.isActive}
					netWorth={data.netWorth}
					liquidity={data.liquidity}
					debt={data.debt}
					currency={data.currency || currency}
					locale={locale}
				/>
			</ScaleFadeIn>

			<div className="flex flex-col gap-4">
				<div className="flex flex-nowrap items-center justify-end gap-1.5 overflow-x-auto">
					{PERIOD_OPTIONS.map((option) => {
						const isSelected = period === option.value;
						return (
							<Button
								key={option.value}
								type="button"
								variant={isSelected ? "default" : "outline"}
								size="sm"
								className={merge(
									"h-9 px-4 text-sm whitespace-nowrap",
									isSelected && "bg-primary text-primary-foreground",
								)}
								onClick={() => setPeriod(option.value)}
							>
								{option.shortLabel}
							</Button>
						);
					})}
				</div>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<ScaleFadeIn>
						<BalanceChart
							assets={data.balanceBreakdown.assets}
							liabilities={data.balanceBreakdown.liabilities}
							netWorth={data.netWorth}
							currency={data.currency || currency}
							locale={locale}
						/>
					</ScaleFadeIn>
					<ScaleFadeIn>
						<IncomeExpensesChart
							income={data.incomeVsExpenses.income}
							expenses={data.incomeVsExpenses.expenses}
							periodLabel={data.incomeVsExpenses.periodLabel}
							currency={data.currency || currency}
							locale={locale}
						/>
					</ScaleFadeIn>
				</div>
			</div>

			<ScaleFadeIn>
				<TopCategories
					categories={data.topCategories}
					totalExpenses={data.incomeVsExpenses.expenses}
					currency={data.currency || currency}
					locale={locale}
				/>
			</ScaleFadeIn>

			<AccountsGrid
				accounts={data.accounts}
				creditCards={data.creditCards}
				bankName={data.bank.name}
				bankColor={data.bank.color}
			/>

			{data.loans.length > 0 && (
				<ScaleFadeIn>
					<LoansSection
						loans={data.loans}
						accounts={data.accounts}
						currency={data.currency || currency}
						locale={locale}
					/>
				</ScaleFadeIn>
			)}
		</div>
	);
};
