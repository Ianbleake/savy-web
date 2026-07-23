import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const meta = {
	title: "Design System/Card",
	component: Card,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Checking Account</CardTitle>
				<CardDescription>Main bank account</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-3xl font-bold">$4,231.89</p>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline">Details</Button>
				<Button>Add Transaction</Button>
			</CardFooter>
		</Card>
	),
};

export const Simple: Story = {
	render: () => (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Total Balance</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-4xl font-bold text-primary">$12,450.00</p>
			</CardContent>
		</Card>
	),
};
