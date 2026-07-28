import { useQuery } from "@tanstack/react-query";
import { cardStatementService } from "@/services/card-statements";

export const useQueryCardStatement = (id: string) => {
	return useQuery({
		queryKey: ["card-statements", id] as const,
		queryFn: () => cardStatementService.getById(id),
		enabled: !!id,
	});
};
