import { useQuery } from "@tanstack/react-query";
import { loanService } from "@/services/loans";

export const useQueryLoan = (id: string) => {
	return useQuery({
		queryKey: ["loans", id] as const,
		queryFn: () => loanService.getById(id),
		enabled: !!id,
	});
};
