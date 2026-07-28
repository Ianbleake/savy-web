import { useQuery } from "@tanstack/react-query";
import { budgetService } from "@/services/budgets";

export const useQueryBudget = (id: string) => {
	return useQuery({
		queryKey: ["budgets", id] as const,
		queryFn: () => budgetService.getById(id),
		enabled: !!id,
	});
};
