import type { Meta, StoryObj } from "@storybook/react-vite";
import { MiniGauge } from "@/components/design-system/patterns/data-display/mini-gauge";

const meta = {
	title: "Design System/Dashboard/MiniGauge",
	component: MiniGauge,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof MiniGauge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 8000,
		max: 10000,
		label: "Disponible",
		formatValue: (value: number) => `$${(value / 100).toFixed(2)}`,
	},
	render: (args) => <MiniGauge {...args} />,
};

export const Empty: Story = {
	args: {
		value: 0,
		max: 10000,
		label: "Disponible",
		formatValue: (value: number) => `$${(value / 100).toFixed(2)}`,
	},
	render: (args) => <MiniGauge {...args} />,
};

export const Full: Story = {
	args: {
		value: 10000,
		max: 10000,
		label: "Disponible",
		formatValue: (value: number) => `$${(value / 100).toFixed(2)}`,
	},
	render: (args) => <MiniGauge {...args} />,
};
