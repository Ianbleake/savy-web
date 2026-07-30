import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "@/components/design-system/patterns/data-display/progress-bar";

const meta = {
	title: "Design System/Dashboard/ProgressBar",
	component: ProgressBar,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Comida",
		current: 80000,
		total: 100000,
	},
	render: (args) => (
		<div className="w-80 space-y-4">
			<ProgressBar {...args} />
		</div>
	),
};

export const Warning: Story = {
	args: {
		label: "Comida",
		current: 78000,
		total: 100000,
	},
	render: (args) => (
		<div className="w-80 space-y-4">
			<ProgressBar {...args} />
		</div>
	),
};

export const Danger: Story = {
	args: {
		label: "Comida",
		current: 95000,
		total: 100000,
	},
	render: (args) => (
		<div className="w-80 space-y-4">
			<ProgressBar {...args} />
		</div>
	),
};

export const Zero: Story = {
	args: {
		label: "Comida",
		current: 0,
		total: 100000,
	},
	render: (args) => (
		<div className="w-80 space-y-4">
			<ProgressBar {...args} />
		</div>
	),
};
