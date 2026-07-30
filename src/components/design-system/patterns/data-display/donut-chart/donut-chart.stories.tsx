import type { Meta, StoryObj } from "@storybook/react-vite";
import { PieChart as PieChartIcon } from "lucide-react";
import { DonutChart } from "@/components/design-system/patterns/data-display/donut-chart";

const meta = {
	title: "Design System/Dashboard/DonutChart",
	component: DonutChart,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const SLICES = [
	{ label: "Débito", value: 45 },
	{ label: "Crédito", value: 30 },
	{ label: "Préstamo", value: 15 },
	{ label: "Efectivo", value: 10 },
];

export const Default: Story = {
	args: {
		data: SLICES,
		centerLabel: "Cuentas",
		centerValue: "100%",
	},
	render: (args) => (
		<div className="w-80">
			<DonutChart {...args} />
		</div>
	),
};

export const Empty: Story = {
	args: {
		data: [],
		emptyIcon: PieChartIcon,
	},
	render: (args) => (
		<div className="w-80">
			<DonutChart {...args} />
		</div>
	),
};
