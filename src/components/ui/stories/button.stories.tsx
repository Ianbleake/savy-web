import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader2, Mail, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const meta = {
	title: "Design System/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Button",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Destructive",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Outline",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Ghost",
	},
};

export const Link: Story = {
	args: {
		variant: "link",
		children: "Link",
	},
};

export const WithIcon: Story = {
	render: () => (
		<div className="flex gap-4">
			<Button>
				<Mail />
				Login with Email
			</Button>
			<Button variant="secondary">
				<Plus />
				Add Account
			</Button>
		</div>
	),
};

export const Loading: Story = {
	render: () => (
		<Button disabled>
			<Loader2 className="animate-spin" />
			Loading...
		</Button>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Button size="sm">Small</Button>
			<Button size="default">Default</Button>
			<Button size="lg">Large</Button>
			<Button size="icon">
				<Plus />
			</Button>
		</div>
	),
};
