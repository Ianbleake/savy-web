import { create } from "zustand";

type SkeletonStore = {
	isTesting: boolean;
	setTesting: (value: boolean) => void;
};

export const useSkeletonStore = create<SkeletonStore>()((set) => ({
	isTesting: false,
	setTesting: (value: boolean): void => {
		set({ isTesting: value });
	},
}));
