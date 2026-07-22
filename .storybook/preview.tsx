import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: {
			test: "todo",
		},
	},
	decorators: [
		(Story) => (
			<div className="font-sans antialiased">
				<Story />
			</div>
		),
	],
};

export default preview;
