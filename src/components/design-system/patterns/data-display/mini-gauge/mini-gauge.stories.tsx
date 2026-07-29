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
	render: () => (
		<MiniGauge
			value={8000}
			max={10000}
			label="Disponible"
			formatValue={(value) => `$${(value / 100).toFixed(2)}`}
		/>
	),
};

export const Empty: Story = {
	render: () => (
		<MiniGauge
			value={0}
			max={10000}
			label="Disponible"
			formatValue={(value) => `$${(value / 100).toFixed(2)}`}
		/>
	),
};

export const Full: Story = {
	render: () => (
		<MiniGauge
			value={10000}
			max={10000}
			label="Disponible"
			formatValue={(value) => `$${(value / 100).toFixed(2)}`}
		/>
	),
};
