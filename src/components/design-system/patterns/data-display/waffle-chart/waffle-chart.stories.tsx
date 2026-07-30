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
	args: {
		percentage: 65,
		label: "Vacaciones",
	},
	render: (args) => <WaffleChart {...args} />,
};

export const Full: Story = {
	args: {
		percentage: 100,
		label: "Laptop",
	},
	render: (args) => <WaffleChart {...args} />,
};

export const Zero: Story = {
	args: {
		percentage: 0,
		label: "Fondo nuevo",
	},
	render: (args) => <WaffleChart {...args} />,
};
