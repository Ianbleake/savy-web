import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { MemoryRouter } from "react-router";
import { QuickActionsBar } from "@/components/design-system/patterns/data-display/quick-actions-bar";

const withRouter = (Story: () => React.ReactElement): React.ReactElement => (
	<MemoryRouter>
		<Story />
	</MemoryRouter>
);

const meta = {
	title: "Design System/Dashboard/QuickActionsBar",
	component: QuickActionsBar,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [withRouter],
} satisfies Meta<typeof QuickActionsBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="w-full max-w-2xl">
			<QuickActionsBar />
		</div>
	),
};
