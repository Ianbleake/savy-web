import { useQuery } from "@tanstack/react-query";
import { SAVINGS_GOALS_QUERY_KEY, savingsGoalService } from "@/services/savings-goals";

export const useQuerySavingsGoals = () => {
	return useQuery({
		queryKey: SAVINGS_GOALS_QUERY_KEY,
		queryFn: () => savingsGoalService.getAll(),
	});
};
