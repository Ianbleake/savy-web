import { Plus } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { BankCard } from "@/components/design-system/patterns/data-display/bank-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";

type Props = {
	accounts: Account[];
	creditCards: CreditCard[];
	bankName: string;
	bankColor: string | null;
};

export const AccountsGrid = ({
	accounts,
	creditCards,
	bankName,
	bankColor,
}: Props): React.ReactElement => {
	const navigate = useNavigate();

	// Exclude LOAN accounts — they are shown in the LoansSection
	const nonLoanAccounts = accounts.filter((account) => account.type !== "LOAN");

	if (nonLoanAccounts.length === 0) {
		return (
			<GlassCard className="p-6">
				<Empty
					icon={Plus}
					title="Sin cuentas"
					description="Este banco no tiene cuentas registradas."
					action={{
						label: "Agregar cuenta",
						onClick: () => navigate(ROUTES.APP.ACCOUNTS_NEW),
					}}
				/>
			</GlassCard>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-sm font-semibold text-foreground">Cuentas ({nonLoanAccounts.length})</h3>
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{nonLoanAccounts.map((account) => {
					const matchingCard = creditCards.find((card) => card.accountId === account.id);
					return (
						<BankCard
							key={account.id}
							account={account}
							bankName={bankName}
							bankColor={bankColor}
							creditCard={matchingCard}
							onClick={() => navigate(`/app/accounts/${account.id}`)}
						/>
					);
				})}
				<button
					type="button"
					onClick={() => navigate(ROUTES.APP.ACCOUNTS_NEW)}
					className="flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/50 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
				>
					<Plus className="size-6" />
					<span className="text-sm">Agregar cuenta</span>
				</button>
			</div>
		</div>
	);
};
