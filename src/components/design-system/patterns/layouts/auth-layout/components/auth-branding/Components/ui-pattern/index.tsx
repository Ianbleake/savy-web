import { ArrowDown, ArrowUp } from "lucide-react";
import type React from "react";

const card = "rounded-lg border border-white/20 bg-white/[0.12] p-3 shadow-lg shadow-black/5";

export const UIPattern = (): React.ReactElement => {
	return (
		<div className="absolute inset-0 bg-[oklch(0.30_0.06_186)]">
			<div className="absolute -inset-x-3 -inset-y-20 flex items-center justify-center">
				<div className="grid w-185 -rotate-3 grid-cols-3 gap-3">
					{/* Balance */}
					<div className={card}>
						<p className="text-[10px] text-white/50">Balance total</p>
						<p className="mt-0.5 text-sm font-bold text-white">$47,250</p>
						<div className="mt-0.5 flex items-center gap-1 text-[10px] text-[oklch(0.70_0.08_186)]">
							<ArrowUp className="size-2.5" />
							<span>+12.4%</span>
						</div>
					</div>

					{/* Income */}
					<div className={card}>
						<p className="text-[10px] text-white/50">Ingresos</p>
						<div className="mt-0.5 flex items-center gap-1">
							<p className="text-sm font-semibold text-white">$32,000</p>
							<ArrowUp className="size-2.5 text-[oklch(0.70_0.08_186)]" />
						</div>
					</div>

					{/* Expenses */}
					<div className={card}>
						<p className="text-[10px] text-white/50">Gastos</p>
						<div className="mt-0.5 flex items-center gap-1">
							<p className="text-sm font-semibold text-white">$18,400</p>
							<ArrowDown className="size-2.5 text-red-400" />
						</div>
					</div>

					{/* Budget bar */}
					<div className={`${card} col-span-2`}>
						<p className="text-[10px] text-white/50">Presupuesto mensual</p>
						<div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
							<div className="h-full w-[65%] rounded-full bg-primary/60" />
						</div>
						<p className="mt-1 text-[10px] text-white/50">$12,000 / $18,400</p>
					</div>

					{/* Savings goal */}
					<div className={card}>
						<p className="text-[10px] text-white/50">Ahorro</p>
						<p className="mt-0.5 text-lg font-bold text-[oklch(0.70_0.08_186)]">74%</p>
						<div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
							<div className="h-full w-[74%] rounded-full bg-primary/60" />
						</div>
					</div>

					{/* Category */}
					<div className={card}>
						<p className="text-[10px] text-white/50">Alimentación</p>
						<p className="mt-0.5 text-sm font-semibold text-white">$4,200</p>
						<p className="mt-0.5 text-[10px] text-white/50">32%</p>
					</div>

					{/* Transaction mini */}
					<div className={card}>
						<div className="flex items-center gap-2">
							<div className="size-5 rounded-full bg-white/10" />
							<p className="text-[11px] text-white">-$2,340</p>
						</div>
					</div>

					{/* Credit card */}
					<div className={card}>
						<p className="text-[10px] text-white/50">Tarjeta</p>
						<p className="mt-0.5 text-sm font-semibold text-white">****4892</p>
						<p className="mt-0.5 text-[10px] text-white/50">$8,200</p>
					</div>

					{/* Transfer */}
					<div className={card}>
						<div className="flex items-center gap-2">
							<div className="size-5 rounded-full bg-white/10" />
							<p className="text-[11px] text-[oklch(0.70_0.08_186)]">+$15,000</p>
						</div>
					</div>

					{/* Second budget bar */}
					<div className={`${card} col-span-2`}>
						<p className="text-[10px] text-white/50">Transporte</p>
						<div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
							<div className="h-full w-[45%] rounded-full bg-primary/60" />
						</div>
						<p className="mt-1 text-[10px] text-white/50">$3,600 / $8,000</p>
					</div>

					{/* Savings 2 */}
					<div className={card}>
						<p className="text-[10px] text-white/50">Vacaciones</p>
						<p className="mt-0.5 text-lg font-bold text-[oklch(0.70_0.08_186)]">48%</p>
						<div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
							<div className="h-full w-[48%] rounded-full bg-primary/60" />
						</div>
					</div>

					{/* Repeated pattern — second block for coverage */}
					<div className={card}>
						<p className="text-[10px] text-white/50">Balance</p>
						<p className="mt-0.5 text-sm font-bold text-white">$47,250</p>
					</div>

					<div className={card}>
						<p className="text-[10px] text-white/50">Ingresos</p>
						<p className="mt-0.5 text-sm font-semibold text-white">$32,000</p>
					</div>

					<div className={card}>
						<p className="text-[10px] text-white/50">Gastos</p>
						<p className="mt-0.5 text-sm font-semibold text-white">$18,400</p>
					</div>

					{/* Entertainment budget */}
					<div className={`${card} col-span-2`}>
						<p className="text-[10px] text-white/50">Entretenimiento</p>
						<div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
							<div className="h-full w-[82%] rounded-full bg-primary/60" />
						</div>
						<p className="mt-1 text-[10px] text-white/50">$4,100 / $5,000</p>
					</div>

					{/* Emergency fund */}
					<div className={card}>
						<p className="text-[10px] text-white/50">Emergencia</p>
						<p className="mt-0.5 text-lg font-bold text-[oklch(0.70_0.08_186)]">91%</p>
						<div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
							<div className="h-full w-[91%] rounded-full bg-primary/60" />
						</div>
					</div>

					{/* More transactions */}
					<div className={card}>
						<div className="flex items-center gap-2">
							<div className="size-5 rounded-full bg-white/10" />
							<p className="text-[11px] text-white">-$890</p>
						</div>
					</div>

					<div className={card}>
						<p className="text-[10px] text-white/50">Servicios</p>
						<p className="mt-0.5 text-sm font-semibold text-white">$2,100</p>
						<p className="mt-0.5 text-[10px] text-white/50">15%</p>
					</div>

					<div className={card}>
						<div className="flex items-center gap-2">
							<div className="size-5 rounded-full bg-white/10" />
							<p className="text-[11px] text-[oklch(0.70_0.08_186)]">+$5,400</p>
						</div>
					</div>

					{/* More transactions */}
					<div className={card}>
						<div className="flex items-center gap-2">
							<div className="size-5 rounded-full bg-white/10" />
							<p className="text-[11px] text-white">-$890</p>
						</div>
					</div>

					<div className={card}>
						<p className="text-[10px] text-white/50">Servicios</p>
						<p className="mt-0.5 text-sm font-semibold text-white">$2,100</p>
						<p className="mt-0.5 text-[10px] text-white/50">15%</p>
					</div>

					<div className={card}>
						<div className="flex items-center gap-2">
							<div className="size-5 rounded-full bg-white/10" />
							<p className="text-[11px] text-[oklch(0.70_0.08_186)]">+$5,400</p>
						</div>
					</div>

					{/* Entertainment budget */}
					<div className={`${card} col-span-2`}>
						<p className="text-[10px] text-white/50">Entretenimiento</p>
						<div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
							<div className="h-full w-[82%] rounded-full bg-primary/60" />
						</div>
						<p className="mt-1 text-[10px] text-white/50">$4,100 / $5,000</p>
					</div>

					{/* Emergency fund */}
					<div className={card}>
						<p className="text-[10px] text-white/50">Emergencia</p>
						<p className="mt-0.5 text-lg font-bold text-[oklch(0.70_0.08_186)]">91%</p>
						<div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
							<div className="h-full w-[91%] rounded-full bg-primary/60" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
