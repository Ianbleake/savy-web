import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categories";

export const useQueryCategory = (id: string) => {
	return useQuery({
		queryKey: ["categories", id] as const,
		queryFn: () => categoryService.getById(id),
		enabled: !!id,
	});
};
