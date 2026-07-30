import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftRight } from "lucide-react";
import type React from "react";
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";

const GlassBackground = ({ children }: { children: React.ReactNode }) => (
	<div className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/15 p-8">
		<div className="pointer-events-none absolute -left-[10%] top-[10%] size-[400px] rounded-full bg-primary/10 blur-[100px]" />
		<div className="pointer-events-none absolute -right-[5%] bottom-[10%] size-[350px] rounded-full bg-primary/8 blur-[100px]" />
		{children}
	</div>
);

const meta = {
	title: "Design System/Dashboard/SummaryCard",
	component: SummaryCard,
	parameters: { layout: "fullscreen" },
	tags: ["autodocs"],
} satisfies Meta<typeof SummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		className: "w-96",
		title: "Últimos movimientos",
		icon: ArrowLeftRight,
		actionLabel: "Ver todo",
		onAction: () => console.log("Ver todo"),
		children: <p className="text-sm text-muted-foreground">Contenido de ejemplo</p>,
	},
	render: (args) => (
		<GlassBackground>
			<SummaryCard {...args} />
		</GlassBackground>
	),
};

export const NoAction: Story = {
	args: {
		className: "w-96",
		title: "Resumen",
		children: <p className="text-sm text-muted-foreground">Sin acción</p>,
	},
	render: (args) => (
		<GlassBackground>
			<SummaryCard {...args} />
		</GlassBackground>
	),
};

export const WithChildren: Story = {
	args: {
		className: "w-96",
		title: "Últimos movimientos",
		icon: ArrowLeftRight,
		children: (
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-sm">
					<span>Salario</span>
					<span className="text-primary">+$500.00</span>
				</div>
				<div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-sm">
					<span>Groceries</span>
					<span className="text-destructive">-$125.00</span>
				</div>
			</div>
		),
	},
	render: (args) => (
		<GlassBackground>
			<SummaryCard {...args} />
		</GlassBackground>
	),
};
