import { useQuery } from "@tanstack/react-query";
import { BUDGETS_QUERY_KEY, budgetService } from "@/services/budgets";

export const useQueryBudgets = () => {
	return useQuery({
		queryKey: BUDGETS_QUERY_KEY,
		queryFn: () => budgetService.getAll(),
	});
};
