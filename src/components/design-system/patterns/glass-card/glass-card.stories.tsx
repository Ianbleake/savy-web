import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlassCard } from "@/components/design-system/patterns/glass-card";

const meta = {
	title: "Design System/GlassCard",
	component: GlassCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	render: () => (
		<div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 p-8">
			<GlassCard
				variant="light"
				className="w-80 p-6"
			>
				<h3 className="text-lg font-semibold text-foreground">Light variant</h3>
				<p className="mt-2 text-sm text-muted-foreground">
					Frosted glass surface for light backgrounds. Uses backdrop-blur-2xl with translucent white
					fill and an inset ring for the glass edge highlight.
				</p>
			</GlassCard>
		</div>
	),
};

export const Dark: Story = {
	render: () => (
		<div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/80 to-primary/40 p-8">
			<GlassCard
				variant="dark"
				className="w-80 p-6"
			>
				<h3 className="text-lg font-semibold text-white">Dark variant</h3>
				<p className="mt-2 text-sm text-white/70">
					Frosted glass surface for dark or branded backgrounds. Uses a subtle white fill with
					strong backdrop blur and muted ring highlight.
				</p>
			</GlassCard>
		</div>
	),
};

export const OnboardingPreview: Story = {
	render: () => (
		<div className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/15 p-8">
			<div className="pointer-events-none absolute -left-[10%] top-[10%] size-[400px] rounded-full bg-primary/10 blur-[100px]" />
			<div className="pointer-events-none absolute -right-[5%] bottom-[10%] size-[350px] rounded-full bg-primary/8 blur-[100px]" />
			<GlassCard
				variant="light"
				className="relative z-10 w-96 p-8"
			>
				<h2 className="text-2xl font-bold text-foreground">Bienvenido a Savy</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					Configuremos tu cuenta en 3 pasos simples.
				</p>
				<div className="mt-6 flex flex-col gap-3">
					<div className="h-10 rounded-md border border-input bg-white/40" />
					<div className="h-10 rounded-md border border-input bg-white/40" />
					<div className="mt-1 flex h-10 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
						Continuar
					</div>
				</div>
			</GlassCard>
		</div>
	),
};
