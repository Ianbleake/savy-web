import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Design System/Tokens",
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta;

export default meta;
type Story = StoryObj;

function ColorSwatch({ name, variable }: { name: string; variable: string }) {
	return (
		<div className="flex items-center gap-3">
			<div
				className="h-10 w-10 rounded-md border border-border"
				style={{ backgroundColor: `var(${variable})` }}
			/>
			<div>
				<p className="text-sm font-medium">{name}</p>
				<p className="text-xs text-muted-foreground">{variable}</p>
			</div>
		</div>
	);
}

export const Colors: Story = {
	render: () => (
		<div className="p-8 space-y-8">
			<div>
				<h2 className="text-2xl font-bold mb-4">Color Tokens</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					<ColorSwatch name="Background" variable="--background" />
					<ColorSwatch name="Foreground" variable="--foreground" />
					<ColorSwatch name="Primary" variable="--primary" />
					<ColorSwatch name="Primary Foreground" variable="--primary-foreground" />
					<ColorSwatch name="Secondary" variable="--secondary" />
					<ColorSwatch name="Secondary Foreground" variable="--secondary-foreground" />
					<ColorSwatch name="Muted" variable="--muted" />
					<ColorSwatch name="Muted Foreground" variable="--muted-foreground" />
					<ColorSwatch name="Accent" variable="--accent" />
					<ColorSwatch name="Accent Foreground" variable="--accent-foreground" />
					<ColorSwatch name="Destructive" variable="--destructive" />
					<ColorSwatch name="Border" variable="--border" />
					<ColorSwatch name="Input" variable="--input" />
					<ColorSwatch name="Ring" variable="--ring" />
					<ColorSwatch name="Card" variable="--card" />
					<ColorSwatch name="Card Foreground" variable="--card-foreground" />
					<ColorSwatch name="Popover" variable="--popover" />
					<ColorSwatch name="Popover Foreground" variable="--popover-foreground" />
				</div>
			</div>

			<div>
				<h3 className="text-xl font-bold mb-4">Chart Colors</h3>
				<div className="grid grid-cols-5 gap-4">
					<ColorSwatch name="Chart 1" variable="--chart-1" />
					<ColorSwatch name="Chart 2" variable="--chart-2" />
					<ColorSwatch name="Chart 3" variable="--chart-3" />
					<ColorSwatch name="Chart 4" variable="--chart-4" />
					<ColorSwatch name="Chart 5" variable="--chart-5" />
				</div>
			</div>

			<div>
				<h3 className="text-xl font-bold mb-4">Sidebar Colors</h3>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					<ColorSwatch name="Sidebar" variable="--sidebar" />
					<ColorSwatch name="Sidebar Foreground" variable="--sidebar-foreground" />
					<ColorSwatch name="Sidebar Primary" variable="--sidebar-primary" />
					<ColorSwatch name="Sidebar Accent" variable="--sidebar-accent" />
					<ColorSwatch name="Sidebar Border" variable="--sidebar-border" />
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-bold mb-4">Typography</h2>
				<div className="space-y-3">
					<p className="text-4xl font-bold">Heading 1 — Inter Variable</p>
					<p className="text-3xl font-bold">Heading 2 — Inter Variable</p>
					<p className="text-2xl font-semibold">Heading 3 — Inter Variable</p>
					<p className="text-xl font-semibold">Heading 4 — Inter Variable</p>
					<p className="text-lg">Body Large — Inter Variable</p>
					<p className="text-base">Body — Inter Variable</p>
					<p className="text-sm">Small — Inter Variable</p>
					<p className="text-xs">Extra Small — Inter Variable</p>
					<p className="text-sm text-muted-foreground">Muted text — for secondary info</p>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-bold mb-4">Radius</h2>
				<div className="flex gap-4 items-end">
					<div className="space-y-1 text-center">
						<div className="h-16 w-16 bg-primary rounded-sm" />
						<p className="text-xs">sm</p>
					</div>
					<div className="space-y-1 text-center">
						<div className="h-16 w-16 bg-primary rounded-md" />
						<p className="text-xs">md</p>
					</div>
					<div className="space-y-1 text-center">
						<div className="h-16 w-16 bg-primary rounded-lg" />
						<p className="text-xs">lg</p>
					</div>
					<div className="space-y-1 text-center">
						<div className="h-16 w-16 bg-primary rounded-xl" />
						<p className="text-xs">xl</p>
					</div>
					<div className="space-y-1 text-center">
						<div className="h-16 w-16 bg-primary rounded-full" />
						<p className="text-xs">full</p>
					</div>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-bold mb-4">Spacing</h2>
				<div className="space-y-2">
					{[1, 2, 3, 4, 6, 8, 12, 16, 20, 24].map((space) => (
						<div key={space} className="flex items-center gap-3">
							<span className="text-xs w-8 text-right">{space}</span>
							<div className="bg-primary h-4" style={{ width: `${space * 4}px` }} />
						</div>
					))}
				</div>
			</div>
		</div>
	),
};
