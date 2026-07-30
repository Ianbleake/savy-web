import { ChevronRight } from "lucide-react";
import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

type Props = {
	bank: BankWithStats;
	onClick: () => void;
};

const PRIMARY_FALLBACK = "oklch(0.511 0.096 186.391)";

export const BankRow = ({ bank, onClick }: Props): React.ReactElement => {
	const accountLabel = bank.accountCount === 1 ? "cuenta" : "cuentas";
	const typesLabel = bank.accountTypes.length > 0 ? bank.accountTypes.join(", ") : "Sin cuentas";

	return (
		<button
			type="button"
			onClick={onClick}
			className={merge(
				"flex w-full cursor-pointer items-center gap-3 border-b border-border/30 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-white/20",
				!bank.isActive && "opacity-60",
			)}
		>
			<span
				className="size-3 shrink-0 rounded-full"
				style={{ backgroundColor: bank.color ?? PRIMARY_FALLBACK }}
			/>

			<div className="flex flex-1 flex-col gap-0.5">
				<div className="flex items-center gap-2">
					<span className="text-sm font-semibold text-foreground">{bank.name}</span>
					{!bank.isActive && (
						<span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
							Inactivo
						</span>
					)}
				</div>
				<span className="text-xs text-muted-foreground">{typesLabel}</span>
			</div>

			<span className="text-sm tabular-nums text-muted-foreground">
				{bank.accountCount} {accountLabel}
			</span>

			<ChevronRight className="size-4 shrink-0 text-muted-foreground" />
		</button>
	);
};
