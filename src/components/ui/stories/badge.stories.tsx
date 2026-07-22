import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";

const meta = {
	title: "Design System/Badge",
	component: Badge,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Income",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Expense",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Overdue",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Pending",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex gap-2">
			<Badge>Income</Badge>
			<Badge variant="secondary">Expense</Badge>
			<Badge variant="destructive">Overdue</Badge>
			<Badge variant="outline">Pending</Badge>
		</div>
	),
};
