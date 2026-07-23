import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Wrench } from "lucide-react";
import { type ReactElement, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { merge } from "@/utils/ui/mergeStyles";

const STORAGE_KEY = "devtools-position";

type Position = {
	x: number;
	y: number;
};

/**
 * Draggable floating action button for development tools.
 * Click toggles React Query Devtools panel.
 * Drag to reposition — persists position in localStorage.
 * Render conditionally: `{!import.meta.env.PROD && <DevTools />}`
 */
export const DevTools = (): ReactElement => {
	const [position, setPosition] = useState<Position>(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) return JSON.parse(saved);
		return { x: window.innerWidth - 80, y: window.innerHeight - 80 };
	});

	const [queryToolsOpen, setQueryToolsOpen] = useState<boolean>(false);
	const dragging = useRef<boolean>(false);
	const hasMoved = useRef<boolean>(false);
	const startPosition = useRef<Position>({ x: 0, y: 0 });
	const offset = useRef<Position>({ x: 0, y: 0 });

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
	}, [position]);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			if (!dragging.current) return;
			const deltaX = Math.abs(event.clientX - startPosition.current.x);
			const deltaY = Math.abs(event.clientY - startPosition.current.y);
			if (deltaX > 4 || deltaY > 4) hasMoved.current = true;
			setPosition({
				x: event.clientX - offset.current.x,
				y: event.clientY - offset.current.y,
			});
		};

		const handleMouseUp = () => {
			dragging.current = false;
			requestAnimationFrame(() => {
				hasMoved.current = false;
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	const handleToggleQueryTools = () => {
		const openButton = document.querySelector(".tsqd-open-btn") as HTMLButtonElement | null;
		const closeButton = document.querySelector(".tsqd-minimize-btn") as HTMLButtonElement | null;

		if (queryToolsOpen) {
			closeButton?.click();
		} else {
			openButton?.click();
		}
		setQueryToolsOpen((prev) => !prev);
	};

	return (
		<>
			<ReactQueryDevtools initialIsOpen={false} />
			<div
				className="fixed z-[9999]"
				style={{ left: position.x, top: position.y }}
			>
				<Button
					size="icon"
					variant="secondary"
					className={merge(
						"size-10 rounded-full shadow-lg cursor-grab active:cursor-grabbing opacity-60 transition-all hover:opacity-100",
						queryToolsOpen && "bg-primary text-primary-foreground opacity-100 hover:bg-primary/90",
					)}
					onMouseDown={(event) => {
						dragging.current = true;
						hasMoved.current = false;
						startPosition.current = { x: event.clientX, y: event.clientY };
						offset.current = {
							x: event.clientX - position.x,
							y: event.clientY - position.y,
						};
					}}
					onClick={(event) => {
						if (hasMoved.current) {
							event.preventDefault();
							event.stopPropagation();
							return;
						}
						handleToggleQueryTools();
					}}
				>
					<Wrench className="size-4" />
				</Button>
			</div>
		</>
	);
};
