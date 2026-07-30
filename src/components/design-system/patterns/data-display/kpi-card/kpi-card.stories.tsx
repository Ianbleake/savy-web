import type { Meta, StoryObj } from "@storybook/react-vite";
import { Wallet } from "lucide-react";
import type React from "react";
import { KpiCard } from "@/components/design-system/patterns/data-display/kpi-card";

const GlassBackground = ({ children }: { children: React.ReactNode }) => (
	<div className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/15 p-8">
		<div className="pointer-events-none absolute -left-[10%] top-[10%] size-[400px] rounded-full bg-primary/10 blur-[100px]" />
		<div className="pointer-events-none absolute -right-[5%] bottom-[10%] size-[350px] rounded-full bg-primary/8 blur-[100px]" />
		{children}
	</div>
);

const meta = {
	title: "Design System/Dashboard/KpiCard",
	component: KpiCard,
	parameters: { layout: "fullscreen" },
	tags: ["autodocs"],
} satisfies Meta<typeof KpiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		className: "w-72",
		label: "Patrimonio neto",
		value: "$15,420.00",
	},
	render: (args) => (
		<GlassBackground>
			<KpiCard {...args} />
		</GlassBackground>
	),
};

export const WithDelta: Story = {
	args: {
		className: "w-72",
		label: "Patrimonio neto",
		value: "$15,420.00",
		delta: 5.2,
		currency: "USD",
	},
	render: (args) => (
		<GlassBackground>
			<KpiCard {...args} />
		</GlassBackground>
	),
};

export const WithNegativeDelta: Story = {
	args: {
		className: "w-72",
		label: "Patrimonio neto",
		value: "$15,420.00",
		delta: -3.1,
		currency: "USD",
	},
	render: (args) => (
		<GlassBackground>
			<KpiCard {...args} />
		</GlassBackground>
	),
};

export const WithIcon: Story = {
	args: {
		className: "w-72",
		label: "Patrimonio neto",
		value: "$15,420.00",
		icon: Wallet,
		delta: 2.4,
	},
	render: (args) => (
		<GlassBackground>
			<KpiCard {...args} />
		</GlassBackground>
	),
};
