import { useQuery } from "@tanstack/react-query";
import { savingsGoalService } from "@/services/savings-goals";

export const useQuerySavingsGoal = (id: string) => {
	return useQuery({
		queryKey: ["savings-goals", id] as const,
		queryFn: () => savingsGoalService.getById(id),
		enabled: !!id,
	});
};
