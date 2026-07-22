import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "@/components/ui/progress";

const meta = {
	title: "Design System/Progress",
	component: Progress,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 60,
		className: "w-[300px]",
	},
};

export const BudgetProgress: Story = {
	args: {
		value: 64,
	},
	render: () => (
		<div className="w-[300px] space-y-4">
			<div>
				<div className="flex justify-between text-sm mb-1">
					<span>Groceries</span>
					<span>$320 / $500</span>
				</div>
				<Progress value={64} />
			</div>
			<div>
				<div className="flex justify-between text-sm mb-1">
					<span>Entertainment</span>
					<span>$180 / $200</span>
				</div>
				<Progress value={90} />
			</div>
			<div>
				<div className="flex justify-between text-sm mb-1">
					<span>Transport</span>
					<span>$50 / $150</span>
				</div>
				<Progress value={33} />
			</div>
		</div>
	),
};
