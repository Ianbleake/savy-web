import type { Meta, StoryObj } from "@storybook/react-vite";
import { WaffleChart } from "@/components/design-system/patterns/data-display/waffle-chart";

const meta = {
	title: "Design System/Dashboard/WaffleChart",
	component: WaffleChart,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof WaffleChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<WaffleChart
			percentage={65}
			label="Vacaciones"
		/>
	),
};

export const Full: Story = {
	render: () => (
		<WaffleChart
			percentage={100}
			label="Laptop"
		/>
	),
};

export const Zero: Story = {
	render: () => (
		<WaffleChart
			percentage={0}
			label="Fondo nuevo"
		/>
	),
};
