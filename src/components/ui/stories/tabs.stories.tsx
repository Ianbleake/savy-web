import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const meta = {
	title: "Design System/Tabs",
	component: Tabs,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tabs
			defaultValue="overview"
			className="w-[400px]"
		>
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="transactions">Transactions</TabsTrigger>
				<TabsTrigger value="budgets">Budgets</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<Card>
					<CardHeader>
						<CardTitle>Overview</CardTitle>
						<CardDescription>Your financial summary at a glance.</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">$12,450.00</p>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="transactions">
				<Card>
					<CardHeader>
						<CardTitle>Transactions</CardTitle>
						<CardDescription>Recent account activity.</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Transaction list goes here.</p>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="budgets">
				<Card>
					<CardHeader>
						<CardTitle>Budgets</CardTitle>
						<CardDescription>Monthly budget tracking.</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Budget progress goes here.</p>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	),
};
